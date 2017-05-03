var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');
var now = require("performance-now")

/*echo('These are the files in your repo:');
ls().forEach(function(file) {
  echo('  '+file);
});

botio.message('#### Hello world');
botio.message('Your Botio installation works! View full output for the list of files in this repo');*/

var a = now();
shell.echo("Running 'bundle install --path vendor/bundle'\n");

//silent(true);
//shell.silent();

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

var i = now();
shell.echo("Build process finished after " + (i - a) / 1000 + " seconds.");
