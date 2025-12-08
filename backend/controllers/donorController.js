// import Donor from "../models/Donor.js";
// import { sendRegistrationMail } from "../utils/mailer.js";

// // @desc   Add a new blood donor
// // @route  POST /api/donors
// // @access Public
// export const addDonor = async (req, res) => {
//     try {
//         console.log("🩸 Received donor data:", req.body);

//         const newDonor = new Donor(req.body);
//         const savedDonor = await newDonor.save();

//         console.log("✅ Saved to database:", savedDonor);

//         // Send confirmation email
//         if (savedDonor.email) {
//             await sendRegistrationMail(savedDonor.email, savedDonor.name);
//             console.log(`📧 Confirmation email sent to ${savedDonor.email}`);
//         }

//         res.status(201).json({
//             success: true,
//             message: "Donor registered successfully. Confirmation email sent!",
//             donor: savedDonor,
//         });
//     } catch (error) {
//         console.error("❌ Error adding donor:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // @desc   Get all donors (with filters: bloodGroup, city, availability)
// // @route  GET /api/donors
// // @access Public
// export const getDonors = async (req, res) => {
//     try {
//         const { bloodGroup, city, available } = req.query;

//         const filter = {};

//         if (bloodGroup) filter.bloodGroup = bloodGroup;
//         if (city) filter.city = { $regex: new RegExp(city.trim(), "i") };

//         // 🔥 Availability filter added
//         if (available === "true") filter.available = true;
//         if (available === "false") filter.available = false;

//         const donors = await Donor.find(filter);
//         res.status(200).json(donors);
//     } catch (error) {
//         console.error("❌ Error fetching donors:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // @desc   Get AVAILABLE donors only
// // @route  GET /api/donors/available
// export const getAvailableDonors = async (req, res) => {
//     try {
//         const donors = await Donor.find({ available: true });
//         res.json(donors);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching available donors" });
//     }
// };

// // @desc   Get NOT AVAILABLE donors only
// // @route  GET /api/donors/not-available
// export const getUnavailableDonors = async (req, res) => {
//     try {
//         const donors = await Donor.find({ available: false });
//         res.json(donors);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching unavailable donors" });
//     }
// };

// // @desc   Get blood stock summary
// // @route  GET /api/donors/stock
// export const getStock = async (req, res) => {
//     try {
//         const stock = await Donor.aggregate([
//             { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
//             { $sort: { _id: 1 } }
//         ]);
//         res.json(stock);
//     } catch (error) {
//         console.error("❌ Error fetching stock:", error);
//         res.status(500).json({ message: "Error fetching stock" });
//     }
// };
import Donor from "../models/Donor.js";
import { sendRegistrationMail } from "../utils/mailer.js";

// -------------------------------------
// @desc   Add a new donor
// @route  POST /api/donors
// -------------------------------------
export const addDonor = async (req, res) => {
    try {
        console.log("🩸 Received donor data:", req.body);

        const newDonor = new Donor(req.body);
        const savedDonor = await newDonor.save();

        console.log("✅ Saved to database:", savedDonor);

        // Send confirmation email
        if (savedDonor.email) {
            await sendRegistrationMail(savedDonor.email, savedDonor.name);
            console.log(`📧 Confirmation email sent to ${savedDonor.email}`);
        }

        res.status(201).json({
            success: true,
            message: "Donor registered successfully. Confirmation email sent!",
            donor: savedDonor,
        });
    } catch (error) {
        console.error("❌ Error adding donor:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------------------------
// @desc   Get all donors (filters support)
// @route  GET /api/donors
// -------------------------------------
export const getDonors = async (req, res) => {
    try {
        const { bloodGroup, city, available } = req.query;
        const filter = {};

        if (bloodGroup) filter.bloodGroup = bloodGroup;
        if (city) filter.city = { $regex: new RegExp(city.trim(), "i") };

        // 🔥 Availability filter
        if (available === "true") filter.available = true;
        if (available === "false") filter.available = false;

        const donors = await Donor.find(filter);
        res.status(200).json(donors);
    } catch (error) {
        console.error("❌ Error fetching donors:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// -------------------------------------
// @desc   Get only AVAILABLE donors
// @route  GET /api/donors/available
// -------------------------------------
export const getAvailableDonors = async (req, res) => {
    try {
        const donors = await Donor.find({ available: true });
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching available donors" });
    }
};

// -------------------------------------
// @desc   Get only NOT AVAILABLE donors
// @route  GET /api/donors/not-available
// -------------------------------------
export const getUnavailableDonors = async (req, res) => {
    try {
        const donors = await Donor.find({ available: false });
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching unavailable donors" });
    }
};

// -------------------------------------
// @desc   Blood stock summary
// @route  GET /api/donors/stock
// -------------------------------------
export const getStock = async (req, res) => {
    try {
        const stock = await Donor.aggregate([
            { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(stock);
    } catch (error) {
        console.error("❌ Error fetching stock:", error);
        res.status(500).json({ message: "Error fetching stock" });
    }
};

// -------------------------------------
// @desc   Update donor availability (Admin)
// @route  PUT /api/donors/:id/availability
// -------------------------------------
export const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { available } = req.body;

        // ✅ Validate input
        if (typeof available !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "`available` must be a boolean"
            });
        }

        // Update donor in DB
        const updatedDonor = await Donor.findByIdAndUpdate(
            id,
            { available },
            { new: true } // return the updated document
        );

        if (!updatedDonor) {
            return res.status(404).json({
                success: false,
                message: "Donor not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            donor: updatedDonor,
        });

    } catch (error) {
        console.error("❌ Error updating availability:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

