const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/spotify/:client_id/:client_secret', (req, resp) => {
    const client_id = req.params.client_id;
    const client_secret = req.params.client_secret;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };


    request.post(authOptions, (err, httpResponse, body) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'No se pudo obtener el token',
                err
            })
        }

        resp.json(body);
    });

});


app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});