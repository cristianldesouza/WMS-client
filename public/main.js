const serverURL = 'http://localhost:3000';

//'/service=wms?request=getCapabilities'

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
            if (response.status === 500) {
                complete('não foi possível inserir o poste');
            } else {
                return response.json()
                .then((body) => {
                    takeThoseLayers(body);
                    complete(undefined, body);
                });
            }
        })
        .catch(complete);
}

function takeThoseLayers(layers) {
    const select = $('#layers')[0];
    layers = Object.values(layers);

    for (let i = 0; i < layers.length; i++) {
        let opt = document.createElement('option');
        opt.appendChild(document.createTextNode(layers[i].Name));
        opt.valye = layers[i].Name;
        select.appendChild(opt);
    }    
}