var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');

// Recursively copy latest build to public directory
shell.exec('cp -r /mnt/latest/* /mnt/public');

var root_url = botio.public_url

root_url = root_url.slice(0, -16);

botio.message('#### Published');
botio.message('You can view your repo files at: '+root_url);
