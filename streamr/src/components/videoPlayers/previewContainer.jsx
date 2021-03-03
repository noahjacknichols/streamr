import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../../css/video.css";
import { videoService } from "../../services/video.service";
import Preview from "./preview";
import cookie from "react-cookies";

class PreviewContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            videos: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.getVids();
    }
    getVidSettings = (id) => {
        const videoJsOptions = {
            autoplay: false,
            // controls: true,
            preload: "auto",
            fluid: true,
            width: "100%",
            height: "100%",
            muted: true,
            sources: [
                {
                    src: `https://streamr-destination-bucket.s3.amazonaws.com/${id}.m3u8`,
                    type: "application/x-mpegURL",
                },
            ],
            loadingSpinner: false,
        };
        return videoJsOptions;
    };
    getVids = async () => {
        let ck = cookie.load("token");
        let find = {
            state: { $in: ["UPLOADED", "COMPLETED"] },
        };
        let sort = {
            createdAt: -1
        }
        let vids = await videoService.getVideos(ck, find, sort);
        this.setState({ videos: vids }, () => {
            this.setState({ loading: false });
        });
        console.log("vids:", vids);
    };

    render() {
        let allVids = this.state.loading ? (
            <div></div>
        ) : (
            this.state.videos.map((vid) => {
                return (
                    <Preview
                        video={vid}
                        {...this.getVidSettings(this.state.videos[0]._id)}
                    />
                );
            })
        );
        return allVids;
    }
}

export default PreviewContainer;
