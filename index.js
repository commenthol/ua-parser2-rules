'use strict';

var path = require('path');

module.exports = {
	file   : path.join( __dirname, 'rules.json'),
	regexes: path.join( __dirname, 'regexes.yaml'),
	models : path.join( __dirname, 'models.yaml')
}