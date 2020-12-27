import React, { createRef, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import '../css/video.css';
class VideoPlayerPreview extends React.Component {
    playerRef = React.createRef();
    constructor(props) {
        super();
        this.toVideo = this.toVideo.bind(this);
        this.vidPlay = this.vidPlay.bind(this);
        this.vidPause = this.vidPause.bind(this);
    }

    toVideo() {
        this.props.history.push("/video");
    }
    
    vidPlay() {
        let vid = this.playerRef.current;
        console.log("play");
        if(vid.paused) {
            vid.play();
        }else {
            // vid.pause();
        }
        // this.playerRef.current.play();
    }

    vidPause() {
        let vid = this.playerRef.current;
        console.log("pause");
        if(!vid.paused) {
            vid.pause();
        }
    }
    
    render() {
        return(
            <div className="preview-box">
                <div>
                    <div className="videoTitle">
                            Evangelion
                        </div>
                        <div className="">
                            <video className="video-container-preview" ref={this.playerRef}
                                onMouseEnter={this.vidPlay} onMouseLeave={this.vidPause}  preload="metadata">
                                <source src="http://localhost:5000/video/stream#t=145" type="video/mp4"></source>
                                <track src="http://localhost:5000/video/stream" kind="subtitles" srcLang="en"></track>
                            </video>
                        </div>
                </div>

                <div className="video-play-button shadow">
                    
                    <i onClick={this.toVideo}className="video-play-icon fas fa-play "></i>
                </div>
            </div>
        )
    }
}

export default withRouter(VideoPlayerPreview);
