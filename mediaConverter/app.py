import ffmpeg
from dotenv import load_dotenv
import os
import sys
import boto3

load_dotenv()
BUCKET_IN = os.getenv("BUCKET_NAME")
BUCKET_OUT = os.getenv("BUCKET_OUT_NAME")

def get_s3(region=None):
    return boto3.resource('s3', region_name=region, aws_access_key_id=os.getenv("AWS_ACCESS_KEY"), aws_secret_access_key=os.getenv("AWS_SECRET_KEY")) if region else boto3.resource('s3')

def list_my_buckets(s3):
    return {b.name: b for b in s3.buckets.all()}

def create_bucket(bucket_name, region):
    s3 = get_s3(region)
    try:
        bucket = s3.create_bucket(Bucket=bucket_name)
    except:
        return False

def get_files_in_bucket(bucket):
    return [bucket_obj for bucket_obj in bucket.objects.all()]

def resize_video(video_path, width):
    if(os.path.isfile(video_path)):
        input_vid = ffmpeg.input(video_path)
        video_name = video_path.split('.')[0]
        print('vid:', video_name)
        vid = (
            input_vid
            .filter('scale', width, -2)
            .output('./temp/out/' + 'test', f="mp4", segment_time='30')
            .run()
            )
        return True

def download_file(bucket, video, settings):
        bucket.download_file(video.key, './temp/in/' + video.key)
        resize_video('./temp/in/' + video.key, '720')


def main():
    s3 = get_s3('us-east-1')
    allBuckets = list_my_buckets(s3)
    for bucketName in allBuckets.keys():
        print('bucketName:', get_files_in_bucket(allBuckets[bucketName]))
        for video in get_files_in_bucket(allBuckets[bucketName]):
            download_file(allBuckets[bucketName], video, {})

main()