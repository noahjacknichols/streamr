import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super();
        
    }

    render() {
        return (
            <Container fluid>
                <Row className="navRow">
                    <Col xs={12}>
                        <ul>
                            <a href="/" onClick={this.toHome}>
                                <li className="nav-item logo noselect">Streamr</li>
                            </a>
                            <a href="/">
                                <li className="nav-item right">Upload</li>
                            </a>

                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default(Navbar);