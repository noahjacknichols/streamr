import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../css/video.css';
export default class VideoPlayer extends React.Component {
    
    render() {
        return(
            <Container>
                <Row>
                <Col xs = {12}>
                    <div className="video-background">
                    <video className="video-container" controls>
                        <source src="http://localhost:5000/video/stream" type="video/mp4"></source>
                        <track src="http://localhost:5000/video/stream" kind="subtitles" srcLang="en"></track>
                    </video>
                    </div>
                </Col>
                </Row>
            </Container>
        )
    }
}
