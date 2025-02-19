const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const routes = require('./routes');
const app = express();
// Connect to database
db.connect();
// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 3000;

// Middleware xử lý lỗi cors
app.use(cors());
//Middleware xử lý dữ liệu từ form, submit lên
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
  }),
);
// XMLHttpRequest, fetch, axios, jquery => gửi dữ liệu bằng phương thức get,hoặc POST lên server bằng JS
app.use(
  express.json({
    limit: '50mb',
  }),
);
// Routes
routes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});