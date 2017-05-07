var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');
var now = require("performance-now")
var root_url = botio.public_url

root_url = root_url.slice(0, -16);

var a = now();
shell.echo("Running the build chain\n");

shell.exec('bundle install --path ./vendor/bundle && npm install && bower install && rm -rf _site/* && gulp sass concat jekyll-build && rm -rf /mnt/latest/* && cp -r ./_site/* /mnt/latest/ && tar -czf latest.tar.gz -C /mnt/latest . && cp ./latest.tar.gz /mnt/public');
var b = now();

shell.echo("\nBuild chain finished: " + (b - a) / 1000 + " seconds\n");

botio.message('You can download the generated site at: '+root_url+'/latest.tar.gz');
