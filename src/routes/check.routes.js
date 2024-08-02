import { Router } from "express";
import {road, location, trafficUpdates} from "../controllers/check.controller.js";
const router = Router();

router.route("/locations").get(location)
router.route("/roads").get(road)
router.route("/traffic-updates").get(trafficUpdates);
// router.route("/register").post(register)

export default router;