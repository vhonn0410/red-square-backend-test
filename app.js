// const express = require('express');
import express from 'express';
const app = express();

import CryptoJS from 'crypto-js';
import crypto from 'crypto';

// const request = require('request');
const endpointUrl = 'http://localhost:3000';
// const axios = require("axios");
import axios from 'axios';
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/endpoint1', function (req, res) {
    try {
        setTimeout(() => {
            // res.send(crypto.createHash('sha256').update('bacon').digest('base64'));
            const myRandomSecketKey = crypto.randomBytes(64).toString("hex");
            const result = CryptoJS.HmacSHA256("WELCOME", myRandomSecketKey).toString(CryptoJS.enc.Hex);
            res.send(result);
        }
            , 1000);

    } catch (e) {
        console.error("Errpr in endpoint1", e)
    }
});

app.get('/api/endpoint2', async function (req, res, next) {
    try {
        const response1 = await axios.get(`${endpointUrl}/api/endpoint1`);
        if (response1?.data) {
            const lastChar = response1?.data[response1?.data.length - 1];
            if (!Number(lastChar))
                next(`The last character is ${lastChar}. This is an alpabent. Does not Pass.`)
            else if (lastChar % 2 !== 1)
                next(`The last character is ${lastChar}. This is an even number. Does not Pass.`)
            else
                res.send(response1.data);
        }
    } catch (e) {
        console.error("Errpr in endpoint2", e)
    }

    // axios.get(`${endpointUrl}/api/endpoint1`, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         const lastChar = body[body.length - 1];
    //         if (!Number(lastChar))
    //             next(`The last character is ${lastChar}. This is an alpabent. Does not Pass.`)
    //         else if (lastChar % 2 !== 1)
    //             next(`The last character is ${lastChar}. This is an even number. Does not Pass.`)
    //         else
    //             res.send(body);
    //     }
    // })
});

// module.exports = app;
export default app;