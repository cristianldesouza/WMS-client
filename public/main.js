const serverURL = 'http://localhost:3000';

//'/service=wms?request=getCapabilities'

// URL de teste: http://www.geoservicos.inde.gov.br/geoserver/BNDES/wms
function getThoseLayersMF() {
    const URLInput = $('#URL').val();

    const URLFormatada = {URL: URLInput}
    
    whereAreMyLayers(URLFormatada, (error, layers) => {
        if(error) {

        } else {
            
        }
    })
}


function whereAreMyLayers(URL, complete) {
    fetch(`${serverURL}/get-layers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(URL)
    })
        .then((response) => {
            if (response.status == 500) {
                alert(response.body.res);
            } else {
                return response.json()
                .then((body) => {
                    takeThoseLayers(body);
                });
            }
        })
        .catch();
}

function takeThoseLayers(layers) {
    const select = $('#NOMEDALAYERMF')[0];
    layers = Object.values(layers);

    for (let i = 0; i < layers.length; i++) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(layers[i].Title));
        opt.value = layers[i].Name;
        select.appendChild(opt);
    }    
}

function getThatImageMF() {
    let URL = $('#URL').val();
    let layerName = $('#NOMEDALAYERMF').val();
    body = {
        URL: URL,
        layer: layerName,    
    }

    fetch(`${serverURL}/get-parameters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then((response) => {
            if (response.status === 500) {
                console.log('DEU RUIM IRMAO');
            } else {
                return response.json()
                .then((body) => {
                    
                    takeCareOfThatImageMF(body);
                });
            }
        })
        .catch()
}

function takeCareOfThatImageMF(bboxcrs){

    fetch(`${serverURL}/get-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bboxcrs)
    })
        .then((response) => {
            if (response.status === 500) {
                console.log('DEU RUIM IRMAO');
            } else {
                return response.json()
                .then((body) => {
                    theImageIsHere(body.src);
                });
            }
        })
        .catch()
}

function theImageIsHere(image) {
    $('#hereTheImageLays').attr('src', image);
}