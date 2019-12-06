import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios';

export default class AddExpenseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            amount: 0
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleAmountChange(event) {
        this.setState({
            amount: event.target.value
        })
    }

    async handleSubmit(event) {
        console.log("entered")
        console.log(this.props.tripId,
            this.props.dayId,
            this.state.amount,
            this.state.title)
        event.preventDefault();

        axios.post("http://localhost:5000/api/trips/expense", {
            tripId: this.props.tripId,
            dayId: this.props.dayId,
            amount: this.state.amount,
            expenseTitle: this.state.title
        })
        .then(function(res) {
            console.log("YEEEET")
            this.props.handleClose();
        }.bind(this))
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <Modal show={this.props.show}>
                <h1>Add Expense</h1>
                <Form>
                    <Form.Group controlId="formAddExpenseTitle">
                        <Form.Label>What's the expense?</Form.Label>
                        <Form.Control type="text" placeholder="Enter text" onChange={this.handleTitleChange} />
                    </Form.Group>

                    <Form.Group controlId="formAddExpenseAmount">
                        <Form.Label>How much?</Form.Label>
                        <Form.Control type="text" placeholder="Enter amount (number only, no $)" onChange={this.handleAmountChange} />
                    </Form.Group>

                    <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </Modal>
        )
    }
}
