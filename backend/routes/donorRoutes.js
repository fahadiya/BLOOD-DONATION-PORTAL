import express from "express";
import {
    addDonor,
    getDonors,
    getAvailableDonors,
    getUnavailableDonors,
    getStock,
    updateAvailability, // ✅ import the new function
} from "../controllers/donorController.js";

const router = express.Router();

// Add a new donor
router.post("/", addDonor);

// Get donors (all / filtered)
router.get("/", getDonors);

// Get only available donors
router.get("/available", getAvailableDonors);

// Get only unavailable donors
router.get("/not-available", getUnavailableDonors);

// Blood stock summary
router.get("/stock", getStock);

// ✅ Update donor availability
router.put("/:id/availability", updateAvailability);

export default router;
