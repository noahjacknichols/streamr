import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import '../../css/video.css';
import { videoService } from '../../services/video.service';
import Preview from './preview';
import cookie from "react-cookies";

class PreviewContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        this.getVids();
    }
    getVids = async () => {
        let ck = cookie.load("token");
        let vids = await videoService.getVideos(ck);
        this.setState({ videos: vids});
        console.log(vids);
    }

    render() {

        console.log(this.state.videos);
        let allVids = this.state.videos.map((vid) => {
            return <Preview video={vid}/>
        })
        return(
            allVids
        );
    } 
}

export default PreviewContainer;