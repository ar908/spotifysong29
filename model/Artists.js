const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
});

const songSchema = new Schema({
    name: String,
    dateOfRelease: Date,
    cover: String,
    artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
});

const userSchema = new Schema({
    name: String,
    email: String,
    ratings: [
        {
            song: { type: Schema.Types.ObjectId, ref: "Song" },
            rating: Number,
        },
    ],
});

module.exports = mongoose.model("Artist", artistSchema);
module.exports = mongoose.model("song", songSchema);
module.exports = mongoose.model("User", userSchema);
