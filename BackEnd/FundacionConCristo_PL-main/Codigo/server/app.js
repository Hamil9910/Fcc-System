const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

const routerApi = require('./src/routes');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Back-End system for Fundacion con Cristo ');
});

routerApi(app);

app.listen(port,()=>{
    console.log("Listen Server in Port ==> ", port);
});
