import { Router } from "express";
import Controllers from "../controllers";

const router = Router();

const { company } = Controllers;
router.get("/api/company", company.list);
router.get("/api/company/:id", company.detail);

const { vehicle } = Controllers;
router.get("/api/vehicle", vehicle.list);
router.get("/api/vehicle/:id", vehicle.detail);
router.delete("/api/vehicle", vehicle.clear);

export default router;
