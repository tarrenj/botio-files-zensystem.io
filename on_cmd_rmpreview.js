var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');

// Recursively copy latest build to public directory
shell.exec('for file in /mnt/latest/*; do rm -rf /mnt/public/$(basename $file); done');

var root_url = botio.public_url

root_url = root_url.slice(0, -16);

botio.message('Removed files from '+root_url);
