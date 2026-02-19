import { Router } from "express";
const router = Router();
import { getProvinces } from "../controllers/provinceController.ts";

router.get("/", getProvinces);

export default router;
