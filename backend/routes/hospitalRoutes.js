import express from "express";
import { getHospitals, addHospital, deleteHospital } from "../controllers/hospitalController.js";

const router = express.Router();

router.get("/", getHospitals);
router.post("/", addHospital);
router.delete("/:id", deleteHospital);

export default router;
