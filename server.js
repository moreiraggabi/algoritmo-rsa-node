const express = require('express');
const ursa = require('ursa');

const server = express();

server.get('/algoritmo-encrypt/:param', (req, res) => {
    var keys = ursa.generatePrivateKey();

    var publicPem = keys.toPublicPem('base64');

    var privatePem = keys.toPrivatePem('base64');

    let msg = req.params.param
    let publicaPem = req.body.publicaPem

    let pub = ursa.createPublicKey(publicaPem, 'base64');

    let msgCripto = pub.encrypt(msg);

    console.log(msgCripto.toString());
    console.log(privatePem);
});

server.get('/algoritm-decrypt/:param/:keyPrivate', (req, res) => {
    let msgCripto = req.params.param;
    let privadaPem = req.params.private;

    let priv = ursa.createPrivateKey(privadaPem, '', 'base64');

    let msgDescripto = priv.decrypt(msgCripto);

    console.log(msgDescripto.toString());
});

server.listen(3000);
