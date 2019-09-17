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
            if (response.status == 404) {
                return response.json()
                .then((body) => {
                    alert(body.res);
                });
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

    fetch(`${serverURL}/get-that-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then((response) => {
            if (response.status === 404) {
                $('body').css('cursor', '');
                $('#URL').css('cursor', '');
                $('#NOMEDALAYERMF').css('cursor', '');
                $('#botaozao').css('cursor', '');
                $('#botaozao').attr('disabled', false);
                $('#botaozao').css('background-color', '');
                $('#botaozao').css('color', '');
                $('#NOMEDALAYERMF').attr('disabled', false);

                alert('Não foi possivel capturar PNG desta Layer.');
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

    setTimeout(() => {
        $('body').css('cursor', '');
        $('#URL').css('cursor', '');
        $('#NOMEDALAYERMF').css('cursor', '');
        $('#botaozao').css('cursor', '');
        $('#botaozao').attr('disabled', false);
        $('#botaozao').css('background-color', '');
        $('#botaozao').css('color', '');
        $('#NOMEDALAYERMF').attr('disabled', false);
    }, 500);

}

async function getThatImageMFucker() {
    $('body').css('cursor', 'wait');
    $('#URL').css('cursor', 'wait');
    $('#NOMEDALAYERMF').css('cursor', 'wait');
    $('#botaozao').css('cursor', 'wait');
    $('#botaozao').attr('disabled', true);
    $('#botaozao').css('background-color', '#dddddd');
    $('#botaozao').css('color', 'black');
    $('#NOMEDALAYERMF').attr('disabled', true);



    await getThatImageMF();


}