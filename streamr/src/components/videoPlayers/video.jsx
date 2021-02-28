import React from 'react';
import videojs from 'video.js'

export default class Video extends React.Component {
  componentDidMount() {
    const handleClick = (vid) => {
        if(vid.paused()){
            vid.play()
        }else{
            vid.pause()
        }
    }
    const handleFullScreen = (vid) => {
      if (!vid.player_.isFullscreen()) {
        vid.player_.requestFullscreen();
      } else {
        vid.player_.exitFullscreen();
      }
    }
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      this.focus();
      this.play();
      // this.textTracks()[0].mode = "showing";
      this.on('click', function(evt){
          evt.preventDefault();
            console.log("click", evt.clientX, evt.clientY)
            //handle click on screen
            handleClick(this);
      })
      this.on('keydown', function(evt){
        console.log(this)
        console.log('click', evt.which)
        if([37, 38, 39, 40, 32, 77, 70].includes(evt.which)){
          evt.preventDefault();
          if(evt.which === 37) this.currentTime(this.currentTime() - 5);
          if(evt.which === 38) this.volume(this.volume() + 0.05)
          if(evt.which === 39) this.currentTime(this.currentTime() + 5);
          if(evt.which === 40) this.volume(this.volume() - 0.05)
          if(evt.which === 32) handleClick(this)
          if(evt.which === 77) this.volume(this.volume() === 0 ? 1:0)
          if(evt.which === 70) handleFullScreen(this)
        }
      })
    });
}

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  componentDidUpdate() {
    if(this.player) {
      this.player.focus();
    }
  }


  render() {
    
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node }  className="video-js video-container">
            <track src="https://streamr-destination-bucket.s3.amazonaws.com/603868ecf0355d326c8967db_1080_vtt.m3u8" kind="text" srclang="en" label="English"></track>
          </video>
        </div>
      </div>
    )
  }
}
