import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardColumns, Card, Button } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    UNSAFE_componentWillMount() {
        console.log("we're getting shit", this.props.userID)
        axios.get("http://localhost:5000/api/trips/user/" + this.props.userID)
        .then((res) => {
            this.setState({
                cards: res.data
            })
            console.log(this.state)
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center pt-2">Your Trips</h2>

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