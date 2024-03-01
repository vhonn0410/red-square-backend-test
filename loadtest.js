// const loadtest = require('loadtest');
import loadtest from 'loadtest';
// const app = require("./app");
import app from "./app.js";
const endpointUrl = 'http://localhost:3000';

app.listen(3000, function () {
    console.log(`Example app listening on port 3000! ${endpointUrl}`);
});
const options = {
  url: 'http://localhost:3000/api/endpoint2',
  concurrency: 10,
  maxRequests: 200,
  requestsPerSecond: 1000
};

loadtest.loadTest(options, (error, result) => {
  if (error) {
    return console.error('Error during test:', error);
  }
  console.log('Tests run successfully:', result);
});