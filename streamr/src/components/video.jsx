import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../css/video.css';
export default class Video extends React.Component {
    
    render() {
        return(
            <Container>
                <Row>
                <Col xs={12}>
                    <div className="video-background">
                    <video className="video-container" controls autoPlay>
                        <source src="http://localhost:5000/video/stream" type="video/mp4"></source>
                    </video>
                    </div>
                </Col>
                </Row>
            </Container>
        )
    }
}
