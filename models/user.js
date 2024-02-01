const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: function (email) {
        return String(email).toLocaleLowerCase().match();
      },
      message: (props) => `Email (${props.value}) is invalid`,
    },
  },
  googleId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  // Only run this fxn if OTP is actually modified

  if (!this.isModified("otp") || !this.otp) return next();

  // hash the OTP with the cost of 12
  this.otp = await bcrypt.hash(this.otp.toString(), 12);

  next();
});

userSchema.pre("save", async function (next) {
  // Only run this fxn if OTP is actually modified

  if (!this.isModified("password")) return next();

  // hash the OTP with the cose of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
  return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  console.log(resetToken);
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log();
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (timestamp) {
  return timestamp < this.passwordChangedAt;
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
