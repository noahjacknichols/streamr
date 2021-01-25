import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import cookie from 'react-cookies';
import { videoService } from '../../../services/video.service';
import BucketForm from './bucketForm';
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
            return <div></div>
        }else {

        }
    }

    render(){
        return(
            <div>
                {this.getLayout()}
            </div>
        )
    }
}

export default uploadForm;