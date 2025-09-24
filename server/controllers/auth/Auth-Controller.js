const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../../models/User");

//Register For New User
const UserRegister = async (req, res) => {
  const SignUpSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9@#$%^&*!()_+\-=\[\]{};':"\\|,.<>\/?]{6,30}$/)
      .required(),
  });

  const { error, value } = SignUpSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { username, email, password } = value;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "Email Already Exits Try with Alternate Email",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      originalPassword: password,
    });

    console.log(newUser, "New");

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User Register Succesfully",
    });
  } catch (error) {
    console.log("Error while Create New User", error);
    res.status(500).json({
      success: false,
      message: "New User Registration Failed",
    });
  }
};

//Login

const UserLogin = async (req, res) => {
  const LoginSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(/^[a-zA-Z0-9@#$%^&*!()_+\-=\[\]{};':"\\|,.<>\/?]{6,30}$/)
      )
      .required(),
  });

  const { error, value } = LoginSchema.validate(req.body);

  console.log(error);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { email, password } = value;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User With This Email is Not Exits, Create New Account first!",
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.json({
        success: false,
        message: "Enter Valid Password",
        data: checkPassword,
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res
      .cookie("jwtToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        success: true,
        message: "User Logged In SuccesFully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          username: checkUser.username,
        },
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Auth Middleware

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "UnAuthorised User",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "UnAuthorised User",
    });
  }
};

//LogOut

const Userlogout = (req, res) => {
  res.clearCookie("jwtToken").json({
    success: true,
    message: "User Logged Out Sucessfully",
  });
};

//Auth Middleware

module.exports = { UserRegister, UserLogin, Userlogout, authMiddleware };
