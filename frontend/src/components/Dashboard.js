import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardColumns, Card, Button } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddTripModal from "./AddTripModal"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            showAddTrip: false
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    UNSAFE_componentWillMount() {
        console.log("we're getting shit", this.props.userID)
        axios.get("/api/trips/user/" + this.props.userID)
        .then((res) => {
            this.setState({
                cards: res.data
            })
            console.log(this.state)
        }).catch((err) => {
            console.log(err);
        })
    }

    handleShow() {
        this.setState({
            showAddTrip: true
        })
    }

    handleClose() {
        this.setState({
            showAddTrip: false
        })
        this.UNSAFE_componentWillMount();
    }

    render() {
        return (
            <div>
                <h2 className="text-center pt-2">Your Trips</h2>
                <Button className="ml-3 mr-3" onClick={this.handleShow}>Add Trip</Button>
                <CardColumns className="p-5">
                    {this.state.cards.map((item, i) => {
                        return (
                            <Card key={item._id} bg="light" text="dark">
                                <Card.Header>{item.tripName}</Card.Header>
                                <Card.Text className="p-3">
                                    <p>Trip Length: {item.tripLength}</p>
                                    <p>Remaining Left: {item.totalLeft}</p>
                                </Card.Text>
                                <Link to={"/trip/" + item._id}>
                                    <Button className="m-3">Go into trip</Button>
                                </Link>
                            </Card>
                        );
                    })}
                </CardColumns>

                <AddTripModal show={this.state.showAddTrip} handleClose={this.handleClose} userId={this.props.userID} />
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userID: state.user.user.id
    }
}

export default connect(mapStateToProps)(Dashboard);