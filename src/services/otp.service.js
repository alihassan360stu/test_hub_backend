const Otp = require("../models/otp");
const ERROR = require("../utils/ERRORS");

exports.createOtp = async (user_id, otp, expiry) => {
  try {
    const otpExist = await Otp.findOne({
      otp:Number(otp),
      is_expired: false,
      is_used: false,
    });
    if (otpExist) return false;

    const db_otp = await Otp.create({
      otp: Number(otp),
      user_id,
      time: expiry,
    });
    if (db_otp) return true;
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
exports.optExpired = async (otp) => {
  try {
    const db_otp =await Otp.findOneAndUpdate(
      { otp: Number(otp), is_expired: false, is_used: false },
      {
        $set: {
          is_expired: true,
        },
      }
    );

    if (!db_otp) return false;

    return true;
  } catch (e) {
    return false;
  }
};

exports.otpVerify = async (otp) => {
  try {
    const db_otp =await Otp.findOne({ otp: Number(otp), is_expired: false, is_used: false });
    if (!db_otp) throw new Error("otp not matched please try again");;

    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
};



exports.optUsed = async (otp) => {
  try {
    const db_otp =await Otp.findOneAndUpdate(
      { otp: Number(otp), is_expired: false, is_used: false },
      {
        $set: {
          is_used: true,
        },
      }
    );

    if (!db_otp) return false;

    return true;
  } catch (e) {
    console.log(e)
    return false;
  }
};
