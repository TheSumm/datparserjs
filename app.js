'use strict';

const defaultFileName = 'Tibia.dat';

const ProtoBuf = require('protobufjs'),
		    fs = require('fs'),
		  argv = require('minimist')(process.argv.slice(2),
					{ alias: { 'file': 'f' },
					  default: { 'file': defaultFileName } });

const ProtoDatFile = ProtoBuf.loadProtoFile('./dat.proto').build('DatFile');

console.log(`>> Loading ${argv.file}..`);
fs.readFile(`${argv.file}`, (err, content) => {
	if (err) {
		console.log(`>> Error: Unable to load ${argv.file}..`)
		return;
	}

	console.log(`>> Decoding ${argv.file}..`);
	const data = ProtoDatFile.decode(content, content.length);

	for (const object of data.objects) {
		if (object.attributes.marketData !== null)
			console.log(object.clientID, object.attributes.marketData.name);
	}
});

