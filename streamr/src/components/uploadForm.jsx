import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import cookie from 'react-cookies';
import { videoService } from '../services/video.service';
class uploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            token: ''
        }
    }
    componentDidMount() {
        let ck = cookie.load('token');
        if(!ck){
            this.props.history.push('/login');
        }else{
            this.setState({token: ck});
        }
    }
    onUploadButtonClicked = (evt) => {
        console.log('file:',evt.target.files[0]);
        this.setState({
            selectedFile: evt.target.files[0] 
        })
    }
    postVideo = async (e) => {
        e.preventDefault();
        if(this.state.selectedFile !== null){
            const formData  = new FormData();
            // console.log('file123:',this.state.selectedFile);
            let x = this.state.selectedFile;
            formData.append('file', this.state.selectedFile);
            
            try{
                const res = await videoService.uploadVideo(this.state.token, formData);
            } catch (e) {
                console.log(e.message);
            }
            
        }
    }
    render(){
        console.log(this.state.token);
        return(
            <div>
                <input name="file" type="file" onChange={this.onUploadButtonClicked}></input>
                <button type="button" onClick={this.postVideo}>Upload</button>
            </div>

        );
    }
}

export default uploadForm;