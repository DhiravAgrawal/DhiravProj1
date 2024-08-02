
import  Location from '../models/location.model.js';
import Road  from'../models/road.model.js';
import TrafficUpdate from '../models/trafficUpdate.model.js';

addLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

addRoad = async (req, res) => {
  try {
    const road = new Road(req.body);
    await road.save();
    res.status(201).json(road);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

updateTrafficCondition = async (req, res) => {
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


const dijkstra = (locations, roads, startId, endId) => {
  //Dijkstra's algorithm
};

getShortestPath = async (req, res) => {
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

getTrafficCondition = async (req, res) => {
  try {
    const road = await Road.findById(req.params.id);
    res.status(200).json(road.traffic_condition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

generateTrafficReport = async (req, res) => {
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


export { addLocation, addRoad, getTrafficCondition, generateTrafficReport, getShortestPath, updateTrafficCondition};