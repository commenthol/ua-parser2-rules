#!/usr/bin/env node

/**
 * concatenate regexes.yaml and models.yaml and output as json file.
 */

'use strict';

var
	fs   = require('fs'),
	path = require('path'),
	yaml = require('js-yaml'),
	extend = require('util')._extend;

function loadYaml(filename) {
	return yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
}
function writeJson(filename, data) {
	return fs.writeFileSync(filename, JSON.stringify(data, null, '\t'), 'utf8');
}

function cat(opts) {
	var obj = {};

	obj = loadYaml(opts.regexes);
	obj.device_models =	loadYaml(opts.models).device_models;

	writeJson(opts.file, obj);
}

module.exports = cat;

if (require.main === module) {
	cat(require('../'));
}