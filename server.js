const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoute');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/kaiber', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
