/* jshint node:true */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var types = mongoose.Schema.Types;

/**
 *
 * SYSTEM SCHEMA
 *
 * System defines an infrastructure entity.
 * Allows to create several separated systems on the same domain.
 *
 */
var system_schema = new Schema({

    name: {
        type: String,
        required: true,
    },

    owner: {
        ref: 'Account',
        type: types.ObjectId,
        required: true,
    },

    access_keys: [{
        access_key : {
            type: String,
            required: true,
        },
        secret_key : {
            type: String,
            required: true,
        }
    }],


    // on delete set deletion time
    deleted: {
        type: Date,
    },

    resources: {
        agent_installer: {
            type: String
        },
        s3rest_installer: {
            type: String
        },
    }

}, {
    // we prefer to call ensureIndexes explicitly when needed
    autoIndex: false
});

system_schema.index({
    name: 1,
    deleted: 1, // allow to filter deleted
}, {
    unique: true
});

module.exports = mongoose.model('System', system_schema);
