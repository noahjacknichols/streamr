import React, { createRef, useRef } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import '../css/video.css';
class VideoPlayerPreview extends React.Component {
    constructor(props) {
        super();
        this.toVideo = this.toVideo.bind(this);
        this.playPause = this.playPause.bind(this);
    }

    toVideo() {
        this.props.history.push("/video");
    }
    
    playPause() {
        console.log(this.refs);
        this.refs.vidRef.current.play();
    }
    
    render() {
        return(
            <div className="preview-box">
                <div>
                    <div className="videoTitle">
                            Evangelion
                        </div>
                        <div className="">
                            <video className="video-container-preview" muted preload="metadata">
                                <source src="http://localhost:5000/video/stream#t=145" type="video/mp4"></source>
                                <track src="http://localhost:5000/video/stream" kind="subtitles" srcLang="en"></track>
                            </video>
                        </div>
                </div>

                <div className="video-play-button">
                    
                    <i onClick={this.toVideo}className="fas fa-play video-play-icon"></i>
                </div>
            </div>
        )
    }
}

export default withRouter(VideoPlayerPreview);
