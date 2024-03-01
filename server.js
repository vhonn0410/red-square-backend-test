// const app = require("./app");
import app from "./app.js";
const endpointUrl = 'http://localhost:3000';

app.listen(3000, function () {
    console.log(`Example app listening on port 3000! ${endpointUrl}`);
});