const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true},
        name: { type: String, required: true },
        birthday: { type: Number, required: true },
        gender: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

const writingSchema = new Schema(
    {
        content: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "Users" }
    }
)

const Users = mongoose.model("Users", userSchema, "Users")
const Writings = mongoose.model("Writings", writingSchema, "Writings")

const mySchemas = {"Users": Users, "Writings": Writings}

module.exports = mySchemas