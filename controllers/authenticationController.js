const User = require("../models/users.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    let user = new User();
    var uuid = uuidv4() + "_" + req.body.username;

    user.uuid = uuid;
    user.username = req.body.username; // is this optional?
    user.email = req.body.email;
    user.password = req.body.password;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.age = req.body.age;
    user.gender = req.body.gender;
    user.mobile_number = req.body.mobile_number;
    user.profile_photo = req.body.profile_photo;

    const token = await user.generateAuthToken();

    const newUser = await User.create(user);
    res.status(200).json({
      status: true,
      message: "User created successfully",
      errors: [],
      data: {
        uuid: uuid,
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: false,
      message: "Something went wrong",
      errors: [err],
      data: {},
    });
  }
};

const registerAsDriver = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({
        status: false,
        message: "User not found",
        errors: [],
        data: {},
      });
    }

    const driverID = uuidv4() + "_" + req.body.username;

    user.driverID = driverID;
    user.driving_license_number = req.body.driving_license_number;
    user.driving_license_photos = req.body.driving_license_photos;
    user.state = req.body.state;
    user.city = req.body.city;
    user.vehicle_number = req.body.vehicle_number;
    user.vehicle_type = req.body.vehicle_type;
    user.vehicle_model = req.body.vehicle_model;
    user.vehicle_color = req.body.vehicle_color;
    user.vehicle_photos = req.body.vehicle_photos;

    await user.save();

    res.status(200).json({
      status: true,
      message: "Registered as driver successfully",
      errors: [],
      data: {
        driverID: driverID,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      status: false,
      message: "Something went wrong",
      errors: [err],
      data: {},
    });
  }
};

const login = async (req, res) => {
  let user = new User();
  try {
    if (req.body.email) {
      user = await User.findByCredentials(
        req.body.email,
        "",
        req.body.password
      );
    } else if (req.body.username) {
      user = await User.findByCredentials(
        "",
        req.body.username,
        req.body.password
      );
    } else {
      throw new Error("Incomplete parameters");
    }

    const token = await user.generateAuthToken();

    res.status(200).json(user);
  } catch (err) {
    res.status(200).json({
      status: false,
      message: "error unliking it",
      errors: [err],
      data: {},
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.json({ message: "All Users Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  register,
  registerAsDriver,
  getUsers,
  deleteUsers,
};
