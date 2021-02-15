# How to save $$$ on AWS mediaConvert :^)
import ffmpeg
from dotenv import load_dotenv
import os
import sys
import boto3
import ffmpeg_streaming
import datetime
from ffmpeg_streaming import Formats, S3, CloudManager
import schedule
import time

load_dotenv()
BUCKET_IN = os.getenv("BUCKET_NAME")
BUCKET_OUT = os.getenv("BUCKET_OUT_NAME")
ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
SECRET_KEY = os.getenv("AWS_SECRET_KEY")
locked = False



def get_s3(region=None):
    return boto3.resource('s3', region_name=region, aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY) if region \
         else boto3.resource('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)

s3 = get_s3('us-east-1')

def list_my_buckets():
    return {b.name: b for b in s3.buckets.all()}

def create_bucket(bucket_name, region):
    try:
        bucket = s3.create_bucket(Bucket=bucket_name)
        return bucket
    except:
        return False

def get_files_in_bucket(bucket):
    return [bucket_obj for bucket_obj in bucket.objects.all()]

def monitor(ffmpeg, duration, time_, time_left, process):
    """
    Handling proccess.

    Examples:
    1. Logging or printing ffmpeg command
    logging.info(ffmpeg) or print(ffmpeg)

    2. Handling Process object
    if "something happened":
        process.terminate()

    3. Email someone to inform about the time of finishing process
    if time_left > 3600 and not already_send:  # if it takes more than one hour and you have not emailed them already
        ready_time = time_left + time.time()
        Email.send(
            email='someone@somedomain.com',
            subject='Your video will be ready by %s' % datetime.timedelta(seconds=ready_time),
            message='Your video takes more than %s hour(s) ...' % round(time_left / 3600)
        )
       already_send = True

    4. Create a socket connection and show a progress bar(or other parameters) to your users
    Socket.broadcast(
        address=127.0.0.1
        port=5050
        data={
            percentage = per,
            time_left = datetime.timedelta(seconds=int(time_left))
        }
    )

    :param ffmpeg: ffmpeg command line
    :param duration: duration of the video
    :param time_: current time of transcoded video
    :param time_left: seconds left to finish the video process
    :param process: subprocess object
    :return: None
    """
    per = round(time_ / duration * 100)
    sys.stdout.write(
        "\rTranscoding...(%s%%) %s left [%s%s]" %
        (per, datetime.timedelta(seconds=int(time_left)), '#' * per, '-' * (100 - per))
    )
    sys.stdout.flush()

def resize_video(video_path, height):
    if(os.path.isfile(video_path)):
        try:

            input_vid = ffmpeg.input(video_path)
            print(video_path)
            video_name = video_path.split('/').pop().split('.')[0]
            audio = input_vid.audio
            vid = (
                input_vid
                .filter('scale', -2, height)
                .output(audio, './temp/out/' + video_name, f="hls", start_number=0, hls_time=5)
                .overwrite_output()
                .run()
                )
            return True
        except Exception as e:
            print(e)
            return False

def download_file(bucket, video):
    bucket.download_file(video.key, './temp/in/' + video.key)
    return './temp/in/' + video.key

def delete_local_file(filename):
    if os.path.exists(filename):
        os.remove(filename)

def upload_file_to_s3(filename, bucket, upload_name=None):
    if os.path.exists(filename):
        if upload_name is None:
            upload_name = filename
        try:
            res = s3.upload_file(filename, bucket, upload_name)
            return res
        except Exception as e:
            print(e)
        
def get_ffmpeg_s3():
    ffmpeg_s3 = S3(aws_access_key_id=os.getenv("AWS_ACCESS_KEY"), aws_secret_access_key=os.getenv("AWS_SECRET_KEY"), region_name='us-east-1')
    save_to_s3 = CloudManager().add(ffmpeg_s3, bucket_name=BUCKET_OUT)
    return save_to_s3

def create_HLS(filename):
    try:

        video = ffmpeg_streaming.input(filename)
        hls = video.hls(Formats.h264())
        hls.auto_generate_representations()
        ffmpeg_s3 = get_ffmpeg_s3()
        hls.output(clouds=ffmpeg_s3)
    except Exception as e:
        print(e)
    return

def get_next_video():
    try:
        bucket = list_my_buckets()
        if(bucket[BUCKET_IN]):
            next_video = get_files_in_bucket(bucket[BUCKET_IN])[0]
            location = download_file(bucket[BUCKET_IN], next_video)
            return {"location": location, "key": next_video.key}
    except Exception as e:
        print(e)
    return None

def delete_s3_file( filename):
    try:
        bucket = list_my_buckets()
        obj = s3.Object(bucket[BUCKET_IN], filename)
        obj.delete()
        return True
    except Exception as e:
        print(e)
    return False

def conversionHandler():
    global locked
    if not locked:
        locked = True
        try:
            print('running converter')
            res = get_next_video()
            if(res):
                print('next video:', res['key'])
                create_HLS(res['location'])
                delete_local_file(res['location'])
                # delete_s3_file(res['key'])
        except Exception as e:
            print(e)
        locked = False


def main():
    print('converter starting up.')
    while True:
        conversionHandler()

main()