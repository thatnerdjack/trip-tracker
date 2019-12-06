import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { setUser } from '../actions/userActions';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }
    
    async handleSubmit(event) {
        event.preventDefault();

        axios.post("http://localhost:5000/api/users/login", {
            email: this.state.email,
            password: this.state.password
        })
        .then(function(res) {
            const firstPart = res.data.token.substring(7);
            const last2parts = firstPart.substring(firstPart.indexOf('.') + 1);
            const payload = last2parts.substring(0, last2parts.indexOf('.'));

            const decodedPayload = JSON.parse(atob(payload));
            console.log(decodedPayload);

            this.props.setUser(decodedPayload.id, decodedPayload.name, decodedPayload.email);

            sessionStorage.setItem("jwtToken", res.data.token.substring(7));

            this.props.handleClose();
        }.bind(this))
        .catch(function(err) {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.props.show}>
                    <h1>Login</h1>
                    <Form>
                        <Form.Group controlId="formLoginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}/>
                        </Form.Group>

                        <Form.Group controlId="formLoginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3" onClick={this.handleSubmit}>Login</Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = {
    setUser,
}

export default connect(null, mapDispatchToProps)(Login);
