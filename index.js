const express = require('express');

const apiRoutes = require('./api-routes.js');

const server = express();

server.use('/api', apiRoutes);

server.listen(5000, () =>
  console.log('Server listening on port 5000')
);