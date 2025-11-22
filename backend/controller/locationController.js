import Location from "../models/Location.js";

export const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createLocation = async (req, res) => {
    try {
        const location = new Location(req.body);
        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};