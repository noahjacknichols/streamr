import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../../css/video.css";
import videojs from "video.js";
class VideoPlayerPreview extends React.Component {
    playerRef = React.createRef();
    constructor(props) {
        super();
    }

    toVideo = () => {
        this.props.history.push("/video");
    };

    componentDidMount() {
        const handleHover = (vid) => {
            vid.play();
        };
        const handleHoverOut = (vid) => {
            vid.pause();
        };
        const gotoVid = () => {
            this.props.history.push("/video/" + this.props.video._id);
        };
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            this.fill(true);
            this.width =
                // this.textTracks()[0].mode = "showing";
                this.on("mouseover", function (evt) {
                    evt.preventDefault();
                    handleHover(this);
                });
            this.on("mouseout", function (evt) {
                evt.preventDefault();
                handleHoverOut(this);
            });
            this.on("click", function (evt) {
                evt.preventDefault();
                gotoVid();
            });
        });
    }

    render() {
        return (
            // <div className="preview-box">
            //     <div>
            //         <div className="videoTitle">
            //                 {this.props.video.video_title ? this.props.video.video_title : ""}
            //             </div>
            //             <div className="">
            //                 <video className="video-container-preview" ref={this.playerRef}
            //                     onMouseEnter={this.vidPlay} onMouseLeave={this.vidPause}  preload="metadata" onClick={this.gotoVid}>
            //                     <source src={url} type="video/mp4"></source>
            //                     <track src="http://localhost:5000/video/stream" kind="subtitles" srcLang="en"></track>
            //                 </video>
            //             </div>
            //     </div>

            //     <div className="video-play-button shadow">
            //         <div onClick={this.toVideo} className="play-section">
            //             <i className="video-play-icon fas fa-play "> </i>
            //             <div className="video-play-text">Play</div>
            //         </div>
            //         <i onClick={this.toVideo}className="setting-icon fas fa-cog "></i>

            //     </div>
            // </div>
            <div clasName="preview-box">
                <div data-vjs-player>
                    <div>
                        {this.props.video.video_title ? this.props.video_title : ""}
                    </div>
                    <video
                        ref={(node) => (this.videoNode = node)}
                        className=" video-container-preview"
                    >
                        {/* <track src="https://streamr-destination-bucket.s3.amazonaws.com/603868ecf0355d326c8967db_1080_vtt.m3u8" kind="text" srclang="en" label="English"></track> */}
                    </video>
                </div>
            </div>
        );
    }
}

export default withRouter(VideoPlayerPreview);
