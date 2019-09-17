const express = require('express');
const parseString = require('xml2js').parseString;
const request = require('request');

const app = express();
const getCapability = '/service=wms?request=getCapabilities';
const getMap = '/service=wms?request=getMap&';
// URL de teste: http://sistemas.anatel.gov.br:80/geoserver/ANATEL/wms

app.use(express.json());

app.use('/', express.static('public'));

app.post('/get-layers', async (req, res) => {
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
});

app.post('/get-parameters', async function (req, res) {

    request(`${req.body.URL}${getCapability}`, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            const XMLGrandao = body;
            let JSONGrandao = {};
            parseString(XMLGrandao, (err, result) => {
                JSONGrandao = result;
            });
            
            let layers = JSONGrandao.WMS_Capabilities.Capability[0].Layer[0].Layer;

            for (let i = 0; i < layers.length; i++) {
                if(layers[i].Name == req.body.layer){
                    let crs = layers[i].CRS[0];
                    let bbox = layers[i].EX_GeographicBoundingBox[0].westBoundLongitude[0] + ',' + layers[i].EX_GeographicBoundingBox[0].eastBoundLongitude[0] + ',' + layers[i].EX_GeographicBoundingBox[0].southBoundLatitude[0] + ',' + layers[i].EX_GeographicBoundingBox[0].northBoundLatitude[0];
                    let rexpoxta = {
                        crs: crs,
                        bbox: bbox,
                        layer: req.body.layer,
                        URL: req.body.URL,
                    }                    
                    res.statusCode = 200;
                    res.send(rexpoxta);
                }
            }

        } 
    });
})

app.post('/get-image', async function (req, res){
    let crs = req.body.crs;
    let bbox = req.body.bbox;
    let layer = req.body.layer;
    let URL = req.body.URL;
    URL = newURL = `${URL}${getMap}WIDTH=400&HEIGHT=400&crs=${crs}&bbox=${bbox}&format=image%2Fpng&layers=${layer}`;
    let respoxta = {
        src: URL,
    }

    res.send(respoxta);
})

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
})