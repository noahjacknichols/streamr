import React from 'react';
import videojs from 'video.js'
import './player.scss';
export default class VideoPlayer extends React.Component {
    componentDidMount() {
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            console.log('Video.js setup', this);
        })
    }
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
    render() {
        return (
            <div>
                <div data-vjs-player className='video-js vjs-default-skin'>
                    <video ref={node => this.videoNode = node } className='video-js vjs-default-skin'></video>
                </div>
            </div>
        )
    }
}