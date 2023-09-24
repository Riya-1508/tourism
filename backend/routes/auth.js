const express = require('express');
const User = require('../models/User');
const Hotels = require('../models/Hotels');
const Guides = require('../models/Guides');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
let success = false;
router.post(
  "/createUser",
  [
    // body('username', 'Enter a valid name').isLength({ min: 3 }),
    // body('email', 'Enter a valid email').isEmail(),
    // body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // let user1 = await User.findOne({ phnNumber: req.body.phnNumber });
      // if (user) {
      //   return res.status(400).json({ error: "Sorry a user with this phone number already exists" })
      // }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const secPass1 = await bcrypt.hash(req.body.confirmpassword, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        address: req.body.address,
        nationality: req.body.nationality,
        gender: req.body.gender,
        mobileno: req.body.mobileno,
        email: req.body.email,
        password: secPass,
        confirmpassword: secPass1,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);



// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }
   
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })
  

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});

//Routes for Hotels
router.post(
  "/createHotelUser",
  [
    // body('username', 'Enter a valid name').isLength({ min: 3 }),
    // body('email', 'Enter a valid email').isEmail(),
    // body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let hotel = await Hotels.findOne({ email: req.body.email });
      if (hotel) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // let user1 = await User.findOne({ phnNumber: req.body.phnNumber });
      // if (user) {
      //   return res.status(400).json({ error: "Sorry a user with this phone number already exists" })
      // }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const secPass1 = await bcrypt.hash(req.body.confirmpassword, salt);
      // Create a new user
      hotel = await Hotels.create({
        hotelname: req.body.hotelname,
        ownername: req.body.ownername,

        hoteladdress: req.body.hoteladdress,

        gstno: req.body.mobileno,
        email: req.body.email,
        password: secPass,
        confirmpassword: secPass1,
      });
      const data = {
        hotel: {
          id: hotel.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.post(
  "/loginHotel",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let Hotel = await Hotels.findOne({ email });
      if (!Hotel) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, Hotel.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: Hotel.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Routes for Guides
router.post(
  "/createGuideUser",
  [
    // body('username', 'Enter a valid name').isLength({ min: 3 }),
    // body('email', 'Enter a valid email').isEmail(),
    // body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let guide = await Guides.findOne({ email: req.body.email });
      if (guide) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // let user1 = await User.findOne({ phnNumber: req.body.phnNumber });
      // if (user) {
      //   return res.status(400).json({ error: "Sorry a user with this phone number already exists" })
      // }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const secPass1 = await bcrypt.hash(req.body.confirmpassword, salt);
      // Create a new user
      guide = await Guides.create({
        name: req.body.name,
        
        licenseno:req.body.licenseno,
        experience: req.body.experience,
        gender: req.body.gender,
        mobileno: req.body.mobileno,
        email: req.body.email,
        password: secPass,
        confirmpassword: secPass1,
      });
      const data = {
        guide: {
          id: guide.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.json(user)
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.post(
  "/loginGuide",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let Guide = await Guides.findOne({ email });
      if (!Guide) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, Guide.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: Guide.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 4: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    return res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router