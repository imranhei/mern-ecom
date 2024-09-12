const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");

mongoose
  .connect(
    "mongodb+srv://imranhei32:rqgNbwIJ37CejTmF@cluster0.ifnr0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin : "http://localhost:5173",
        method : ["GET", "POST", 'PUT', 'DELETE'],
        allowedHeaders : ["Content-Type", "Authorization", 'Cache-Control', 'Expires', 'Pragma'],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
