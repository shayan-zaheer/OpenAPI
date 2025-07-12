require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const APIRoute = require("./routes/APIRoute");
const morgan = require("morgan");
const configurePassport = require("./utils/passport");
const app = express();

configurePassport(app);

const PORT = process.env.PORT || 8000;

app.use(
    cors({
        origin: ["https://open-api-iota-eosin.vercel.app", "http://localhost:5173"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error(err));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/api", APIRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});