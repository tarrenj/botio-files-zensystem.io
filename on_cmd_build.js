var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');
var now = require("performance-now")


var a = now();
shell.echo("Running 'bundle install --path vendor/bundle'\n");

shell.exec('bundle install --path ./vendor/bundle');
var b = now();

shell.echo("\nBundle finished: " + (b - a) / 1000 + " seconds\n");

var c = now();
shell.echo("Running 'npm install'\n");

shell.exec('npm install');
var d = now();

shell.echo("\nnpm finished: " + (d - c) / 1000 + " seconds\n");

var e = now();
shell.echo("Running 'bower install':\n");

shell.exec('bower install');
var f = now();

shell.echo("\nbower finished: " + (f - e) / 1000 + " seconds\n");

var g = now();
shell.echo("Running 'gulp sass concat jekyll-build': " + g + "\n");

shell.exec('gulp sass concat jekyll-build');
var h = now();

shell.echo("\ngulp finished: " + (h - g) / 1000 + " seconds\n");

shell.exec('rm -rf /mnt/latest/*');

shell.exec('cp -r ./_site/* /mnt/latest/');
