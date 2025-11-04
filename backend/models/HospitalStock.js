import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    location: String,
    bloodGroup: String,
    units: Number,
});

export default mongoose.model("Hospital", hospitalSchema);
