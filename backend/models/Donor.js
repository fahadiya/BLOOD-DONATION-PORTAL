import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
});


const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
