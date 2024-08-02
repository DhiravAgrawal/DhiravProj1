import { Router } from "express";
import {road, location, trafficUpdates} from "../controllers/check.controller.js";
const router = Router();

router.route("/locations").post(location);
router.route("/roads").post(road);
router.route("/traffic-updates").post(trafficUpdates);
// router.route("/register").post(register)

export default router;