// const location = (req,res)=>{
//     // const roadData = {req.body.road};
//     console.log("reached");
//     res.render("pages/addLocation.ejs");
// }
// const road = async (req,res)=>{
//     res.render("pages/addRoad.ejs");
// }
// const trafficUpdates = (req,res)=>{
//     res.render("pages/addTrafficCondition.ejs");
// }


// controllers/locationController.js
const Location = require('../models/location.model.js');

addLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/roadController.js
const Road = require('../models/road.model.js');
const TrafficUpdate = require('../models/trafficUpdate.model.js');

addRoad = async (req, res) => {
  try {
    const road = new Road(req.body);
    await road.save();
    res.status(201).json(road);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTrafficCondition = async (req, res) => {
  try {
    const { road_id, timestamp, traffic_condition } = req.body;
    const trafficUpdate = new TrafficUpdate({
      road: road_id,
      timestamp,
      traffic_condition,
    });
    await trafficUpdate.save();
    const road = await Road.findById(road_id);
    road.traffic_condition = traffic_condition;
    await road.save();
    res.status(201).json(trafficUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/pathController.js
const Location = require('../models/location.model.js');
const Road = require('../models/road.model.js');

const dijkstra = (locations, roads, startId, endId) => {
  // Implement Dijkstra's algorithm
  // Calculate the shortest path considering the traffic conditions
};

exports.getShortestPath = async (req, res) => {
  try {
    const { start_location_id, end_location_id } = req.query;
    const locations = await Location.find();
    const roads = await Road.find();
    const { path, total_distance, estimated_time } = dijkstra(locations, roads, start_location_id, end_location_id);
    res.status(200).json({ path, total_distance, estimated_time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/reportController.js
const Road = require('../models/Road');
const TrafficUpdate = require('../models/TrafficUpdate');
const csvWriter = require('csv-writer');

exports.getTrafficCondition = async (req, res) => {
  try {
    const road = await Road.findById(req.params.id);
    res.status(200).json(road.traffic_condition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateTrafficReport = async (req, res) => {
  try {
    const roads = await Road.find().populate('start_location end_location');
    const csv = csvWriter.createObjectCsvStringifier({
      header: [
        { id: 'start_location', title: 'Start Location' },
        { id: 'end_location', title: 'End Location' },
        { id: 'distance', title: 'Distance' },
        { id: 'traffic_condition', title: 'Traffic Condition' },
      ],
    });
    const records = roads.map((road) => ({
      start_location: road.start_location.name,
      end_location: road.end_location.name,
      distance: road.distance,
      traffic_condition: road.traffic_condition,
    }));
    const csvString = csv.stringifyRecords(records);
    res.setHeader('Content-disposition', 'attachment; filename=traffic_report.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csvString);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { road, location, trafficUpdates};