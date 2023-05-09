const User = require("../models/users.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  let user = req.body;
  const uuid = uuidv4() + "_" + req.body.username;

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

  try {
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Couldn't Register New User" });
  }
};

const registerAsDriver = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });

    // Should we aunthenticate the user here?

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const driverID = uuidv4() + "_" + username;

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

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  let user;
  try {
    if(req.body.email){  
      user = await User.findByCredentials(
        req.body.email,
        "",
        req.body.password
      );
    }else if(req.body.username){
      user = await User.findByCredentials(
        "",
        req.body.username,
        req.body.password
      );
    }else{
      throw new Error('Incomplete parameters');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ message: "You are logged in !" });

  } catch (err) {
    // errors block
  }
};
