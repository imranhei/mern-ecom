const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//resgister
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with the same email! Try another email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials! Please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1h" }
    );

    // if i have any subdomain
    // res.cookie("token", token, { httpOnly: true, secure: true }).json({
    //   success: true,
    //   message: "Login successfull",
    //   user: {
    //     id: checkUser._id,
    //     userName: checkUser.userName,
    //     email: checkUser.email,
    //     role: checkUser.role,
    //   },
    // });

    // if i don't have any subdomain
    res.status(200).json({
      success: true,
      message: "Login successfull",
      token,
      user: {
        id: checkUser._id,
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout successfull",
  });
};

//auth middleware
// if i have any subdomain
// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized access",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized user",
//     });
//   }
// };

// if i don't have any subdomain
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  } finally {
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
