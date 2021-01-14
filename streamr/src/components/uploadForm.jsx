import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import { videoService } from '../services/video.service';
class uploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
    }
    onUploadButtonClicked = (evt) => {
        this.setState({
            selectedFile: evt.target.files[0] 
        })
    }
    postVideo = () => {
        if(this.state.selectedFile !== null){
            const data = new FormData();
            data.append('file', this.state.selectedFile);
            videoService.uploadVideo(this.state.selectedFile)
        }
    }
    render(){
        console.log(this.state.selectedFile);
        return(
            <div>
                <input name="file" type="file" onChange={this.onUploadButtonClicked}></input>
                <button type="button" onClick={this.postVideo()}>Upload</button>
            </div>

        );
    }
}

export default uploadForm;