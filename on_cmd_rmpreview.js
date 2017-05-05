var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');
var root_url = botio.public_url

root_url = root_url.slice(0, -16);

// Remove all files that exist in the latest build from the public directory
shell.exec('for file in /mnt/latest/*; do rm -rf /mnt/public/$(basename $file); done');

botio.message('Removed files from '+root_url);
