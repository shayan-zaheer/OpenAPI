const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    provider: { type: String, enum: ["google", "local"], required: true },
    providerId: { type: String, unique: true, sparse: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    profilePhoto: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
    if (this.provider === "local" && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
