/* Copyright (C) 2016 NooBaa */
'use strict';

const fs = require('fs');
const tls = require('tls');
const path = require('path');

const P = require('./promise');
const dbg = require('./debug_module')(__filename);
const native_core = require('./native_core');

const SERVER_SSL_DIR_PATH = path.join('/etc', 'private_ssl_path');
const SERVER_SSL_KEY_PATH = path.join(SERVER_SSL_DIR_PATH, 'server.key');
const SERVER_SSL_CERT_PATH = path.join(SERVER_SSL_DIR_PATH, 'server.crt');

function read_ssl_certificate() {
    return P.resolve()
        .then(() => P.props({
            key: fs.readFileAsync(SERVER_SSL_KEY_PATH, 'utf8'),
            cert: fs.readFileAsync(SERVER_SSL_CERT_PATH, 'utf8'),
        }))
        .then(certificate => {
            // check that these key and certificate are valid, matching and can be loaded before using them
            tls.createSecureContext(certificate);
            dbg.log('Using local certificate');
            return certificate;
        })
        .catch(err => {
            if (err.code !== 'ENOENT') {
                dbg.error('Local SSL certificate failed to load', err.message);
                dbg.warn('Fallback to generating self-signed certificate...');
            }
            dbg.warn('Generating self-signed certificate');
            return native_core().x509();
        });
}

exports.SERVER_SSL_DIR_PATH = SERVER_SSL_DIR_PATH;
exports.SERVER_SSL_KEY_PATH = SERVER_SSL_KEY_PATH;
exports.SERVER_SSL_CERT_PATH = SERVER_SSL_CERT_PATH;
exports.read_ssl_certificate = read_ssl_certificate;