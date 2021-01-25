import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import '../../css/video.css';
class VideoPlayerPreview extends React.Component {
    playerRef = React.createRef();
    constructor(props) {
        super();
    }

    toVideo = () => {
        this.props.history.push("/video");
    }
    
    vidPlay = () => {
        let vid = this.playerRef.current;
        vid.volume = 0.5;
        if(vid.paused) {
            vid.play();
        }
    }

    vidPause = () => {
        let vid = this.playerRef.current;
        if(!vid.paused) {
            vid.pause();
        }
    }

    gotoVid = () => {
        this.props.history.push('/video/' + this.props.videoId);
    }
    
    render() {
        
        const url=`http://localhost:5000/video/${this.props.videoId}/stream#t=145`
        return(
            <div className="preview-box">
                <div>
                    <div className="videoTitle">
                            Evangelion 
                        </div>
                        <div className="">
                            <video className="video-container-preview" ref={this.playerRef}
                                onMouseEnter={this.vidPlay} onMouseLeave={this.vidPause}  preload="metadata" onClick={this.gotoVid}>
                                <source src={url} type="video/mp4"></source>
                                <track src="http://localhost:5000/video/stream" kind="subtitles" srcLang="en"></track>
                            </video>
                        </div>
                </div>

                <div className="video-play-button shadow">
                    <div onClick={this.toVideo} className="play-section">
                        <i className="video-play-icon fas fa-play "> </i>
                        <div className="video-play-text">Play</div>
                    </div>
                    <i onClick={this.toVideo}className="setting-icon fas fa-cog "></i>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(VideoPlayerPreview);
