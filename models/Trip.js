const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expense = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const tripDay = new Schema({
    dayNum: {
        type: Number,
        required: true
    },
    amountLeft: {
        type: Number,
        required: true
    },
    expenses: [expense]
});

const TripSchema = new Schema({
    tripName: {
        type: String,
        required: true
    },
    tripLength: {
        type: Number,
        required: true
    },
    dailyBudget: {
        type: Number,
        required: true
    },
    totalLeft: {
        type: Number,
        required: true
    },
    days: [tripDay],
    tripOwner: {
        type: String,
        required: true
    },
    tripMembers: {
        type: Array
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Trip = mongoose.model("trips", TripSchema);