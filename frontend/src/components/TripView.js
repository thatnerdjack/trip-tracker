import React, { Component } from 'react'
import axios from 'axios';
import { Card, ListGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddExpenseModal from './AddExpenseModal';
import AddTripMemberModal from './AddTripMemberModal';

export default class TripView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: null,
            fetched: false,
            addExpenseShow: false,
            addTripMemberShow: false
        }

        this.handleAddExpenseClose = this.handleAddExpenseClose.bind(this);
        this.handleAddExpenseShow = this.handleAddExpenseShow.bind(this);
        this.handleAddTripMemberClose = this.handleAddTripMemberClose.bind(this);
        this.handleAddTripMemberShow = this.handleAddTripMemberShow.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get("http://localhost:5000/api/trips/" + this.props.location.pathname.replace("/trip/", ""))
        .then((res) => {
            this.setState({
                trip: res.data,
                fetched: true,
                day: null
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    handleAddExpenseClose() {
        this.setState({addExpenseShow: false});
        this.UNSAFE_componentWillMount()
    }

    handleAddExpenseShow(id) {
        this.setState({
            addExpenseShow: true,
            day: id
        });
    }

    handleAddTripMemberClose() {
        this.setState({addTripMemberShow: false});
    }

    handleAddTripMemberShow() {
        this.setState({
            addTripMemberShow: true
        });
    }

    render() {
        if(!this.state.fetched) {
            return(
                <p>fetching...</p>
            );
        } else {
            return(
                <div>
                    <Card>
                        <Card.Header>
                            {this.state.trip.tripName}
                            <Button disabled variant="danger" className="float-right ml-3">Delete Trip</Button>
                            <Button disabled className="float-right" onClick={this.handleAddTripMemberShow}>Add a Friend</Button>
                        </Card.Header>
                        {this.state.trip.days ? <ListGroup>
                            {this.state.trip.days.map((item, i) => {
                                return (
                                    <ListGroup.Item key={item._id}>
                                        Day Number {item.dayNum} – ${item.amountLeft} left
                                        <Button disabled className="float-right ml-3">View Details</Button>
                                        <Button onClick={() => {
                                            this.handleAddExpenseShow(item._id);
                                        }} className="float-right">Add Expense</Button>
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup> : <p>ERROR</p>}
                    </Card>

                    <AddExpenseModal
                        show={this.state.addExpenseShow}
                        tripId={this.state.trip._id}
                        dayId={this.state.day}
                        handleClose={this.handleAddExpenseClose}
                    />

                    <AddTripMemberModal
                        show={this.state.addTripMemberShow}
                        tripId={this.state.trip}
                        handleClose={this.handleAddTripMemberClose}
                    />
                </div>
            );
        }
    }
}
