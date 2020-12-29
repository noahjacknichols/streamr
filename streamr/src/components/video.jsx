import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../css/video.css';
export default class Video extends React.Component {
    
    render() {
        const url=`http://localhost:5000/video/${this.props.videoId}/stream`
        return(
            <Container>
                <Row>
                <Col xs={12}>
                    <div className="video-background">
                    <video className="video-container" controls autoPlay>
                        <source src={url} type="video/mp4"></source>
                    </video>
                    </div>
                </Col>
                </Row>
            </Container>
        )
    }
}
