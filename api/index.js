require("dotenv").config();
const express = require("express"),
    app = express(),
    http = require("http"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    fileUpload = require("express-fileupload"),
    routes = require("./routes.js");

port = process.env.API_PORT;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(morgan("dev"));
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(routes);
const server = http.createServer(app);
server.listen(port, () => {
    console.log("API running on port", port);
});

app.use((err, req, res, next) => {
    if (!err) next();
    res.status(err.status || 400).json({
        success: false,
        message: err.message || "An error occurred",
        errors: err.error || [],
    });
});

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Resource not found." });
});

module.exports = server;
