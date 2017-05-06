var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');
var now = require("performance-now")


var a = now();
shell.echo("Running the build chain\n");

shell.exec('bundle install --path ./vendor/bundle && npm install && bower install && rm -rf _site/* && gulp sass concat jekyll-build && rm -rf /mnt/latest/* && cp -r ./_site/* /mnt/latest/');
var b = now();

shell.echo("\nBuild chain finished: " + (b - a) / 1000 + " seconds\n");
