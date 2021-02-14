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

def resize_video(video, settings):
    if('.mkv' in video.key):
        print()
        

def main():
    s3 = get_s3('us-east-1')
    allBuckets = list_my_buckets(s3)
    for bucketName in allBuckets.keys():
        print('bucketName:', get_files_in_bucket(allBuckets[bucketName]))

main()