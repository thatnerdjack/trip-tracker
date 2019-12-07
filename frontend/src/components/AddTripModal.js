import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios';

export default class AddTripModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tripName: "",
            tripLength: 0,
            dailyBudget: 0
        }

        this.handleEmailChange = this.handleTripNameChange.bind(this);
        this.handleTripNameChange = this.handleTripNameChange.bind(this);
        this.handleTripLengthChange = this.handleTripLengthChange.bind(this);
        this.handleTripDailyBudgetChange = this.handleTripDailyBudgetChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTripNameChange(event) {
        this.setState({
            tripName: event.target.value
        })
    }

    handleTripLengthChange(event) {
        this.setState({
            tripLength: event.target.value
        })
    }

    handleTripDailyBudgetChange(event) {
        this.setState({
            dailyBudget: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();

        axios.put("/api/trips/", {
            tripName: this.state.tripName,
            tripLength: this.state.tripLength,
            dailyBudget: this.state.dailyBudget,
            tripOwner: this.props.userId
        })
        .then(function(res) {
            console.log("added stuff")
            this.props.handleClose();
        }.bind(this))
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <h1>Add Trip</h1>
                <Form>
                    <Form.Group controlId="formAddTripTitle">
                        <Form.Label>Type in the name of the new trip!</Form.Label>
                        <Form.Control type="text" placeholder="Enter Trip Name" onChange={this.handleTripNameChange} />
                    </Form.Group>

                    <Form.Group controlId="formAddTripLength">
                        <Form.Label>How long is your trip?</Form.Label>
                        <Form.Control type="text" placeholder="Enter Trip Length (integers only)" onChange={this.handleTripLengthChange} />
                    </Form.Group>

                    <Form.Group controlId="formAddTripDailyBudget">
                        <Form.Label>How much are you budgeting per day?</Form.Label>
                        <Form.Control type="text" placeholder="Enter daily budget (no dollar sign)" onChange={this.handleTripDailyBudgetChange} />
                    </Form.Group>

                    <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </Modal>
        )
    }
}
