import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios';

export default class AddTripMemberModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();

        axios.post("/api/trips/addmember", {
            email: btoa(this.state.email),
            tripId: this.props.tripId
        })
        .then(function(res) {
            console.log("added stuff")
            this.props.handleClose();
        }.bind(this))
    }

    render() {
        return (
            <Modal show={this.props.show}>
                <h1>Add Trip Member</h1>
                <Form>
                    <Form.Group controlId="formAddExpenseTitle">
                        <Form.Label>Type in the email of the new trip member?</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange} />
                    </Form.Group>

                    <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </Modal>
        )
    }
}
