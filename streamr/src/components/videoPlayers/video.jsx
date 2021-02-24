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
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
      this.on('click', function(evt){
          evt.preventDefault();
            console.log("click", evt.clientX, evt.clientY)
            //handle click on screen
            handleClick(this);
      })
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }


  render() {
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node }  className="video-js video-container"></video>
        </div>
      </div>
    )
  }
}
