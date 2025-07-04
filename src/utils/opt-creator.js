function generateOTP(length = 6) {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }

  const expiresIn =2 * 60 * 1000; // 5 minutes
  const expiry = Date.now() + expiresIn;

  return {otp, expiresIn , expiry}
}

module.exports =generateOTP
