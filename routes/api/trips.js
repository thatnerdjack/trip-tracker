const express = require("express");
const router = express.Router();

//Load model
const Trip = require("../../models/Trip");
const User = require("../../models/User");

router.get("/", (req, res) => {
    Trip.find({}, (err, trips) => {
        if(err) {
            res.status(500).send(err);
        }

        res.send(trips);
    })
});

router.get("/:id", (req, res) => {
    Trip.findById(req.params.id).then(trip => {
        if(!trip) {
            res.status(404).send("trip not found");
        }

        res.status(200).send(trip);
    })
});

router.get("/user/:id", (req, res) => {
    Trip.find({tripMembers: {"$in" : [req.params.id]}}, (err, trips) => {
        if(err) {
            res.status(500).send(err);
        }

        res.send(trips);
    })
});

router.get("/:tripId/day/:dayId", (req, res) => {
    Trip.findById(req.params.tripId).then(trip => {
        if(!trip) {
            res.status(404).send("trip not found");
        }

        var day = trip.days.id(req.params.dayId);
        res.status(200).send(day);
    })
});

router.put("/", (req, res) => {
    //TODO: implement form validation?

    const newTrip = new Trip({
        tripName: req.body.tripName,
        tripLength: req.body.tripLength,
        dailyBudget: req.body.dailyBudget,
        totalLeft: req.body.dailyBudget * req.body.tripLength,
        tripOwner: req.body.tripOwner,
        tripMembers: [
            req.body.tripOwner
        ]
    });

    for(var i = 0; i < newTrip.tripLength; i++) {
        newTrip.days.push({
            dayNum: i + 1,
            amountLeft: newTrip.dailyBudget
        });
    }

    newTrip.save().then(newTrip => res.json(newTrip)).catch(err => console.log(err));
});

router.post("/expense", (req, res) => {
    const tripId = req.body.tripId;
    const dayId = req.body.dayId;
    const amount = req.body.amount;
    const expenseTitle = req.body.expenseTitle;

    Trip.findById(tripId).then(trip => {
        if(!trip) {
            res.status(404).send("trip not found");
            return;
        }

        trip.days.id(dayId).expenses.push({
            title: expenseTitle,
            amount: amount
        });

        trip.days.id(dayId).amountLeft -= amount;
        trip.totalLeft -= amount;

        trip.save().then(trip => {
            res.json(trip);
        }).catch(err => {
            console.log(err);
        });
    });
});

router.post("/addmember", (req, res) => {
    const emailRAW = req.body.email;
    const buff = Buffer.from(emailRAW, 'base64');
    const email = buff.toString('ascii');
    const tripId = req.body.tripId;

    Trip.findById(tripId).then(trip => {
        if(!trip) {
            res.status(404).send("trip not found");
            return;
        }

        User.findOne({email: email}).then(user => {
            console.log("ENTER USER FIND")
            if(!user) {
                console.log("USER NOT FOUND")
                return res.status(404).send("user not found");
            } else {
                console.log("USER FOUND")
                trip.tripMembers.push(user._id);
                trip.save().then(res.status(200).send("added"));
            }
        })
    })
})

router.delete("/:id", (req, res) => {
    Trip.deleteOne({
        id: req.params.id
    }).then((res) => {
        res.status(200).send({});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({});
    });
})

router.delete("/", (req, res) => {
    Trip.deleteMany({}).then((res) => {
        res.status(200).send({});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({});
    });
})

module.exports = router;