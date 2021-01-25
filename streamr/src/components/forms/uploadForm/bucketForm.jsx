import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import cookie from 'react-cookies';
import { videoService } from '../../../services/video.service';
class BucketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            token: '',
            fileName: '',
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

    onChangeHandler = (evt) => {
        const value = evt.target.value;
        this.setState({ [evt.target.name]: value});
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
            let x = this.state.selectedFile;
            formData.append('file', this.state.selectedFile);
            
            try{
                const res = await videoService.uploadVideo(this.state.token, formData);
            } catch (e) {
                console.log('error occurred:', e.message);
            }
            
        }
    }
    render(){
        console.log(this.state.token);
        return(
            <div>
                <input name="fileName" type="text" onChange={this.onChangeHandler}></input>
                <input name="file" type="file" onChange={this.onUploadButtonClicked}></input>
                <button type="button" onClick={this.postVideo}>Upload</button>
            </div>

        );
    }
}

export default BucketForm;