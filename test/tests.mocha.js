'use strict';

/* global describe, it */

var
	fs = require('fs'),
	assert = require('assert'),
	splitLine = require('streamss').SplitLine,
	jsonArray = require('streamss').JsonArray,
	through = require('streamss').Through,
	pick = require('./lib/compact').pick,
	parser = require('ua-parser2')(require('..').file);

var
	config = {
		tests: __dirname + '/../test_resources/tests.json'
	};

function msg(name, actual, expected, string) {
	string = (string ? string + '\n' : '' );
	return string + name +
		"\n     is: " + JSON.stringify(actual) +
		"\n should: " + JSON.stringify(expected);
}

function test(obj, encoding, done) {
	var
		res,
		exp = obj;

	describe('', function(){
		it(exp.string, function(){

			res = parser.parse(exp.string);
			res = pick(res);

			['ua', 'os', 'engine', 'device'].forEach(function(p){
				assert.deepEqual(res[p], exp[p], msg(p, res[p], exp[p]/*, exp.string*/));
			});

		});
	});

	done();
}

if (! fs.existsSync(config.tests) ){
	config.tests = config.fasttests;
}

describe('tests', function(){
	this.timeout(50000);

	it('exec', function(testDone){
		fs.createReadStream(config.tests)
			.pipe(splitLine({chomp: true}))
			.pipe(jsonArray.parse())
			.pipe(through.obj(test, function(){
				testDone();
			})
		);
	});
});
