# How to save $$$ on AWS mediaConvert :^)
from dotenv import load_dotenv
import os
import boto3
import ffmpeg_streaming
from ffmpeg_streaming import Formats, S3, CloudManager
import time
from pymongo import MongoClient
import time
from os import walk
from multiprocessing.pool import ThreadPool
from ffmpeg_streaming import Formats, Bitrate, Representation, Size

load_dotenv()
BUCKET_IN = os.getenv("BUCKET_NAME")
BUCKET_OUT = os.getenv("BUCKET_OUT_NAME")
ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
SECRET_KEY = os.getenv("AWS_SECRET_KEY")
CLOUDFRONT_URL = os.getenv("S3_URL")
locked = False
client = MongoClient(os.getenv("DB_STRING"))
db = client.streamr



def get_s3(region=None):
    return boto3.resource('s3', region_name=region, aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY) if region \
         else boto3.resource('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)

s3 = get_s3('us-east-1')

def list_my_buckets():
    return {b.name: b for b in s3.buckets.all()}
all_buckets = list_my_buckets()
def create_bucket(bucket_name, region):
    try:
        bucket = s3.create_bucket(Bucket=bucket_name)
        return bucket
    except:
        return False

def get_files_in_bucket(bucket):
    return [bucket_obj for bucket_obj in bucket.objects.all()]

def upload_files_in_directory(mypath):
    bucket = list_my_buckets()
    f = []
    for (dirpath, dirnames, filenames) in walk(mypath):
        f.extend(filenames)
        break

    # upload_handler(f)
    for file in f:
        upload_file_to_s3('/temp/out/' + file, file, bucket[BUCKET_OUT])
        delete_local_file('/temp/out/' + file)

def upload_handler(files):
    pool = ThreadPool(processes=10)
    pool.map(upload, files)
    # index = 0
    # queue = 0
    # while index < len(files):
    #     if(queue < 10):
    #         queue += 1
    #         index += 1
    #         queue -= upload(files[index])

def upload(file):
    upload_file_to_s3('/temp/out/' + file, file, all_buckets[BUCKET_OUT])
    delete_local_file('/temp/out/' + file)
    return 1


def download_file(bucket, video):
    try:
        print('bucket:', bucket, 'video:', video)
        print('./temp/in/' + video)
        x = bucket.download_file(video, './temp/in/' + video)
        print('finished download')
        return './temp/in/' + video
    except Exception as e:
        print('download error:', e)
        return None


def delete_local_file(filename):
    print('local file:', filename)
    filepath = os.path.abspath(os.getcwd()) + filename
    if os.path.exists(filepath):
        os.remove(filepath)

def upload_file_to_s3(filepath, filename, bucket):
    print(bucket, filepath, filename)
    s3Client = boto3.client('s3', region_name='us-east-1', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    filepath = os.path.abspath(os.getcwd()) + filepath
    if os.path.exists(filepath):
        try:
            # print('updated filepath:', filepath)
            bucket.upload_file(Filename=filepath, Key=filename)
        except Exception as e:
            print(e)
        
def get_ffmpeg_s3():
    ffmpeg_s3 = S3(aws_access_key_id=os.getenv("AWS_ACCESS_KEY"), aws_secret_access_key=os.getenv("AWS_SECRET_KEY"), region_name='us-east-1')
    save_to_s3 = CloudManager().add(ffmpeg_s3, bucket_name=BUCKET_OUT)
    return save_to_s3

def create_HLS(filepath, filename):
    try:
        print('hls filename:', filepath)
        print('hls filename2:', filename)
        video = ffmpeg_streaming.input(filepath)
        print('video hls:', video)
        hls = video.hls(Formats.h264())
        # hls.auto_generate_representations()
        ffmpeg_s3 = get_ffmpeg_s3()
        hls.output('./temp/out/' + filename + '.m3u8')
    except Exception as e:
        print(e)
    return

def delete_s3_file( filename):
    try:
        bucket = list_my_buckets()
        obj = s3.Object(bucket[BUCKET_IN], filename)
        obj.delete()
        return True
    except Exception as e:
        print(e)
    return False

def update_hls_manifest(filename):
    print('updating manifest')
    print('file:', filename)
    try:
        bucket = list_my_buckets()
        if(bucket[BUCKET_OUT]):
            filename = filename.split('.')[0] + '.m3u8'
            print('filename:', filename)
            # file_loc = download_file(bucket[BUCKET_OUT], filename)
            # if file_loc is None: return None
            # print('file_loc:', file_loc)
            file_loc = './temp/out/' + filename 
            lines = open(file_loc, 'r').readlines()
            for line in range(len(lines)):
                if('#' not in lines[line]):
                    new_line = CLOUDFRONT_URL + lines[line]
                    lines[line] = new_line
            print(lines)
            out = open(file_loc, 'w')
            # out = open('./temp/in/test.m3u8', 'w')
            out.writelines(lines)
            # bucket = list_my_buckets()
            # upload_file_to_s3('/temp/in/' + filename, filename, bucket[BUCKET_OUT])
            return True
    except Exception as e:
        return None
def conversionHandler():
    try:
        res = get_next_video()
        if(res is not None and res['location'] is not None):
            print('next video:', res['key'], res['location'])
            create_HLS(res['location'], str(res['key']))
            # time.sleep(60)
            if update_hls_manifest(str(res['key'])) is None: return update_video_status(res['key'], 'FAILED')
            upload_files_in_directory('./temp/out')
            update_video_status(res['key'], 'COMPLETED')
            delete_local_file('./temp/in' + str(res['key']))
            return True
        else:
            if(res is not None):
                print('download failed for video:', res['key'])
                update_video_status(res['key'], 'FAILED')
            else:
                print('no videos found..')
                return False 
    except Exception as e:
        print('conversion error occurred:', e)
    return False

def get_next_video():
    try:
        vid = db.videos.find_one({'state': 'UPLOADED', 'cloud_data': {'$exists': True}})
        print('vid is:', vid)
        if(vid) is not None:
            bucket = list_my_buckets()
            if(bucket[BUCKET_IN]):
                location = download_file(bucket[BUCKET_IN], str(vid['cloud_data']['Key']))
                return {"location": location, "key": vid['_id']}
    except Exception as e:
        print('error getting next video:', e)
    return None

def update_video_status(id, status):
    print('updating video:', id, 'status:', status)
    completed = db.videos.find_one_and_update({'_id':id}, {'$set': {'state': status}})
    print('completed video:', completed)
    return completed

def main():
    print('converter starting up.')
    
    while True:
        start_time = time.time()
        status = conversionHandler()
        print('conversion took:' , time.time() - start_time,'.moving to next video')
        if not status:
            print('converter failed. sleeping..')
            time.sleep(10)
main()
def test():
    bucket = list_my_buckets()
    file = 'test.txt'

    upload_file_to_s3('/temp/out/' + file, file, bucket[BUCKET_OUT])

