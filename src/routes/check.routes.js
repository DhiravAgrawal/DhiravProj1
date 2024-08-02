import { Router } from "express";
import express from 'express';
import { addLocation, addRoad, getTrafficCondition, generateTrafficReport, getShortestPath, updateTrafficCondition} from "../controllers/check.controller.js"

const router = express.Router();
router.post('/locations', addLocation);
router.post('/roads', addRoad);
router.post('/traffic-updates', updateTrafficCondition);
router.get('/roads/:id/traffic-condition', getTrafficCondition);
router.get('/report/traffic', generateTrafficReport);

export default router;
