const express = require('express');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const churchesRoutes = require('./routes/churches');
const membersRoutes = require('./routes/members');
const announcesRoutes = require('./routes/announces');
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myChurchApp")
.then(()=>{
  console.log("Database is successfully connected");
});

const { PORT = 3000 } = process.env;

app.use('/church', churchesRoutes);
app.use('/members', membersRoutes);
app.use('/announces', announcesRoutes);
app.use('/users', usersRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta: ${PORT}`));