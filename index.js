const express = require('express');
const cors = require('cors'); //CORS


const apiRoutes = require('./api-routes.js');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api', apiRoutes);

server.listen(5000, () =>
  console.log('Server listening on port 5000')
);