import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import cookie from 'react-cookies';
import { videoService } from '../../../services/video.service';
import BucketForm from './bucketForm';
import UrlForm from './urlForm';
class uploadForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            uploadType: 'BUCKET' // [BUCKET, LOCAL, LINK]
        }
        this.getLayout = this.getLayout.bind(this);
    }
    componentDidMount() {
        let ck = cookie.load('token');
        if(!ck){
            this.props.history.push('/login');
        }else{
            this.setState({token: ck});
        }
    }

    getLayout = () => {
        if(this.state.uploadType === 'BUCKET'){
            return <BucketForm/>
        }else if(this.state.uploadType === 'LOCAL'){
            return <BucketForm local={true}/>
        }else {
            return <UrlForm/>
        }
    }
    toggleUploadType = (evt) => {
        const value = evt.target.name;
        this.setState({ uploadType: value});
    }

    render(){
        return(
            <div>
                <div>
                    <button name="LOCAL" onClick={this.toggleUploadType}>local</button>
                    <button name="BUCKET" onClick={this.toggleUploadType}>cloud</button>
                    <button name="LINK" onClick={this.toggleUploadType}>URL</button>
                </div>
                {this.getLayout()}
            </div>
        )
    }
}

export default uploadForm;