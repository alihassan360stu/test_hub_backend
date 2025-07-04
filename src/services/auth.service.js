const User = require("../models/User");
const { generateToken } = require("../utils/token");
const { validateUserInput } = require("../validations/auth.validation");
const ERROR = require("../utils/ERRORS");
const generateOTP = require("../utils/opt-creator");
const { createOtp, optExpired, otpVerify , optUsed } = require("./otp.service");
const sendEmail = require("../utils/mailer");
const Otp = require("../models/otp");

exports.registerUser = async (data) => {
  let isValid = validateUserInput(data);
  if (isValid !== "") throw new Error(isValid);
  const { name, user_id, password,last_name,status,district,address } = data;

  let db_otp = await Otp.findOne({user_id,is_used:true,is_expired:false})
  if(!db_otp) throw new Error("Without otp you can not register");


  const existing = await User.findOne({ user_id });
  if (existing) throw new Error(ERROR.ALREADYEXIST("user"));
  const user = await User.create({name, user_id, password,last_name,status,district,address });

  return { id: user._id, name: user.name, email: user.user_id }
};

exports.isUserExist = async ({ user_id }) => {
  try {
    const user = await User.findOne({ user_id });
    if (user) {
      if (existing) throw new Error(ERROR.ALREADYEXIST("user"));
    }

    // create otp
    const { otp, expiresIn, expiry } = generateOTP();

    setTimeout(async () => {
      await optExpired(otp);
      console.log("otp is expired");
    }, expiresIn);

    let db_otp = await createOtp(user_id, otp, expiry);
    if (!db_otp) {
      throw new Error(ERROR.WENTWRONG);
    }

    // send email
    const mailOptions = {
      from: '"Your App Name" robertdev894@gmail.com',
      to: user_id,
      subject: "Your OTP Code",
      html: `<h3>Your OTP is: <b>${otp}</b></h3><p>This will expire in ${2} minutes.</p>`,
    };

    await sendEmail(mailOptions);
    return { db_otp };
  } catch (e) {
    throw new Error(ERROR.WENTWRONG);
  }
};

exports.loginUser = async ({ user_id, password }) => {
  const user = await User.findOne({ user_id });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user._id);
  return { token, user: { id: user._id, name: user.name, email: user.user_id } };
};

exports.verifyOtp = async (otp) => {
  const db_otp = await otpVerify(otp);
  if (!otp) {
    throw new Error("otp is expired or used");
  }

  // used oto 
  let is_used  = await optUsed(otp)

    if (!is_used) {
    throw new Error("otp is expired or used");
  }

  return db_otp
};
