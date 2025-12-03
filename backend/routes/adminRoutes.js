import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
    getAllDonors,
    getAllReceivers,
    deleteDonor,
    deleteReceiver,
    toggleDonorAvailability,
} from "../controllers/adminController.js";

dotenv.config(); // ✅ Load variables from .env

const router = express.Router();

// ✅ Admin credentials from .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SECRET_KEY = process.env.SECRET_KEY;

// ==================== LOGIN ROUTE ====================
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "2h" });
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// ==================== JWT MIDDLEWARE ====================
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.admin = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

// ==================== PROTECTED ADMIN ROUTES ====================
router.get("/donors", verifyToken, getAllDonors);
router.get("/receivers", verifyToken, getAllReceivers);
router.delete("/donor/:id", verifyToken, deleteDonor);
router.delete("/receiver/:id", verifyToken, deleteReceiver);
router.put("/donor/availability/:id", verifyToken, toggleDonorAvailability);

export default router;
