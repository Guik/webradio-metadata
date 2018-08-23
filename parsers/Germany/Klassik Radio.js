// Copyright (c) 2018 Alexandre Storelli
// This file is licensed under the Affero General Public License version 3 or later.
// See the LICENSE file.

var get = require("../get.js");

module.exports = function(exturl, callback) {
	get(exturl, function(err, result, corsEnabled) {

		if (err) {
			return callback(err, null, null);
		}

		try {
			parsedResult = JSON.parse(result);
			parsedResult = parsedResult.nowPlaying[0];
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		const artist = parsedResult.composer;
		const title = parsedResult.title;

		return callback(null, { artist: artist, title: title }, corsEnabled);
	});
}