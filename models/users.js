const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minLength: 4,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  first_name: {
    type: String,
    trim: true,
    required: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  mobile_number: {
    type: String,
    trim: true,
  },
  profile_photo: {
    type: String,
    trim: true,
  },
  // Optional
  driverID: {
    type: String,
    trim: true,
    default: "",
  },
  driving_license_number: {
    type: String,
    trim: true,
    default: "",
  },
  driving_license_photos: {
    type: String,
    trim: true,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  vehicle_number: {
    type: String,
    trim: true,
    default: "",
  },
  vehicle_type: {
    type: String,
    trim: true,
    default: "",
  },
  vehicle_model: {
    type: String,
    trim: true,
    default: "",
  },
  vehicle_color: {
    type: String,
    trim: true,
    default: "",
  },
  vehicle_photos: {
    type: String,
    trim: true,
    default: "",
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "htr");

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, username, password) => {
  let user;
  if (email.length > 0) {
    user = await User.findOne({ email: email });
  } else if (username.length > 0) {
    user = await User.findOne({ username: username });
  }
  if (user == undefined) {
    throw new TassieCustomError("Invalid Email or Username!");
    // throw new Error('Invalid Email or Username!')
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    // throw new Error('Invalid Password!')
    throw new TassieCustomError("Invalid Password!");
  }
  return user;
};

//Hashing the plain text before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // console.log('just before saving')

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
