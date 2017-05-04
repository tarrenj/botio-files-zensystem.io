//var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');

// Recursively copy latest build to public directory
shell.exec('for file in /mnt/latest/*; do rm -rf /mnt/public/$(basename $file); done');

botio.message('Removed files from '+botio.public_url);
