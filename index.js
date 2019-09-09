const express = require('express');
const parseString = require('xml2js').parseString;
const request = require('request');

const app = express();
const getCapability = '/service=wms?request=getCapabilities';


app.use(express.json());

app.use('/', express.static('public'));

app.post('/get-layers', (req, res) => {
    const URL = req.body.URL;

    request(`${URL}${getCapability}`, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            const XMLGrandao = body;
            let JSONGrandao = {};
            parseString(XMLGrandao, (err, result) => {
                JSONGrandao = result;
            });
            
            let layers = JSONGrandao.WMS_Capabilities.Capability[0].Layer[0].Layer;

            res.statusCode = 200;
            res.send(layers);
        } 
    });
})

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
})