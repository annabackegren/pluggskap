import { Router } from "express";
const router = Router();
import { getProvinces, getProvince } from "../controllers/provinceController.ts";

router.get("/", getProvinces);
router.get("/:id", getProvince);

export default router;
