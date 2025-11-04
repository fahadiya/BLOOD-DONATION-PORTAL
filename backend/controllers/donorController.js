import Donor from "../models/Donor.js";  // adjust the path if needed

// @desc   Add a new blood donor
// @route  POST /api/donors
// @access Public
export const addDonor = async (req, res) => {
    try {
        console.log("🩸 Received donor data:", req.body);

        const newDonor = new Donor(req.body);
        const savedDonor = await newDonor.save();

        console.log("✅ Saved to database:", savedDonor);

        res.status(201).json({
            success: true,
            message: "Donor registered successfully",
            donor: savedDonor,
        });
    } catch (error) {
        console.error("❌ Error adding donor:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc   Get all donors
// @route  GET /api/donors

// ✅ Fetch donors (filtered or all)
export const getDonors = async (req, res) => {
    try {
        const { bloodGroup, city } = req.query;

        const filter = {};
        if (bloodGroup) filter.bloodGroup = bloodGroup;
        if (city) filter.city = { $regex: new RegExp(city.trim(), "i") }; // ✅ trim removes spaces

        const donors = await Donor.find(filter);;
        res.status(200).json(donors);
    } catch (error) {
        console.error("❌ Error fetching donors:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getStock = async (req, res) => {
    try {
        const stock = await Donor.aggregate([
            { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(stock);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stock" });
    }
};

