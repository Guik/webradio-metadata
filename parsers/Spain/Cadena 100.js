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
			var parsedResult = JSON.parse(result);
		} catch(e) {
			console.log(result);
			return callback(e.message, null, null);
		}

		const artist1 = parsedResult.author;
		const title1 = parsedResult.title;
		const exturl2 = "http://apih.cadena100.es/v1.0/music.track_info_bytitle/?&str=" + encodeURIComponent(artist1) + " %2F " + encodeURIComponent(title1) + "&type=big";

		get(exturl2, function(err, result2, corsEnabled) {

			if (err) {
				return callback(err, null, null);
			}

			try {
				parsedResult = JSON.parse(decodeURI(result2).replace(/\\\//g, "/"));
			} catch(e) {
				console.log(result2);
				return callback(e.message, null, null);
			}

			const artist = parsedResult.artist;
			const title = parsedResult.title;
			const cover = parsedResult.extraTrack ? parsedResult.extraTrack.cover : "";

			return callback(null, { artist: artist, title: title, cover: cover }, corsEnabled);
		});
	});
}