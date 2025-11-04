import express from "express";
import { addDonor, getDonors, getStock } from "../controllers/donorController.js";
import Donor from "../models/Donor.js";
// ✅ Make sure this import exists

const router = express.Router();

// ✅ POST → Add new donor
router.post("/", addDonor);
router.get("/", getDonors);
router.get("/stock", getStock);

// ✅ GET → Fetch donors (optionally filter by blood group + city)
export default router;
