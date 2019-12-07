import React, { useState } from 'react'
import { Container, Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'
import Login from './Login';
import Register from './Register';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginShow: false,
            registerShow: false
        }

        this.handleLoginClose = this.handleLoginClose.bind(this);
        this.handleLoginShow = this.handleLoginShow.bind(this);
        this.handleRegisterClose = this.handleRegisterClose.bind(this);
        this.handleRegisterShow = this.handleRegisterShow.bind(this);
    }

    handleLoginClose() {
        this.setState({loginShow: false})
    }

    handleLoginShow() {
        this.setState({loginShow: true})
    }

    handleRegisterClose() {
        this.setState({registerShow: false})
    }

    handleRegisterShow() {
        this.setState({registerShow: true})
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="p-5">
                            <Jumbotron className="text-center">
                                <h1 className="pb-3">Trip Tracker</h1>
                                <h3 className="pb-3 my-text-opacity">Please login</h3>
                                <Button onClick={this.handleLoginShow} className="m-3 my-button">Login</Button>
                                <Button onClick={this.handleRegisterShow} className="m-3 my-reg-button">Register</Button>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>

                <Login show={this.state.loginShow} handleClose={this.handleLoginClose}></Login>
                <Register show={this.state.registerShow} handleClose={this.handleRegisterClose}></Register>
            </div>
        )
    }
}
