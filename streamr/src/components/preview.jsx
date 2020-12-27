import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import '../css/video.css';
class VideoPlayerPreview extends React.Component {
    constructor(props) {
        super();
        this.toVideo = this.toVideo.bind(this);
    }

    toVideo() {
        this.props.history.push("/video");
    }
    
    render() {
        return(
            <div className="preview-box">
                <div>
                    <div className="videoTitle">
                            Evangelion
                        </div>
                        <div className="">
                            <video className="video-container-preview"  autoPlay preload="metadata">
                                <source src="http://localhost:5000/video/stream#t=145" type="video/mp4"></source>
                                <track src="http://localhost:5000/video/stream" kind="subtitles" srcLang="en"></track>
                            </video>
                        </div>
                </div>

                <div className="video-play-button">
                    <button onClick={this.toVideo}>Play video</button>
                </div>
            </div>
        )
    }
}

export default withRouter(VideoPlayerPreview);
