import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Home from "./components/Home";
import { connect } from "react-redux";
import Dashboard from "./components/Dashboard";
import TripView from "./components/TripView";
import DayView from "./components/DayView";

function App(props) {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Trip Tracker</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {props.name ? <div>Signed in as: <a href="#login">{props.name}</a></div> : <div>Please log in to continue</div>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            <Switch>
                <Route exact path="/">
                    {props.id ? <Dashboard /> : <Home />}
                </Route>

                <Route exact route="/trip/:tripId/" component={TripView} />
            </Switch>
        </Router>
    );
}

const mapStateToProps = function(state) {
    return {
        name: state.user.user.name,
        id: state.user.user.id
    }
};

export default connect(mapStateToProps)(App);
