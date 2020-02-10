/* eslint-disable strict */
'use strict';

const events = require('./events.js');

events.on('read', payload => log('read', payload));
events.on('write', payload => log('write', payload));
events.on('uppercase', payload => log('uppercase', payload));

function log(event,payload) {
  let time = new Date();
  console.log({event, time, payload});
}
exports.log = log;