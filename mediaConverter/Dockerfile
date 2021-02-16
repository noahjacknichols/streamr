# FROM python:3.8
FROM ubuntu:18.04
ENV VIRTUAL_ENV=/env
RUN apt-get update
RUN apt-get -y install python3
RUN apt-get -y install ffmpeg
RUN apt-get -y install python3-pip

WORKDIR /converter
COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY / .
CMD [ "python3", "app.py"]