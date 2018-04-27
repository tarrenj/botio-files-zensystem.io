var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');
var now = require('performance-now');
var cmd;
var suppress = false;
var runtime = true;

// Run commdand synchronously, exit if error
function runCommand(cmd, suppress, runtime) {
    shell.echo('\nRunning command "' + cmd + '"\n');
    var start = now();
    var run = shell.exec(cmd, {silent:suppress});
    var end = now();
    if (runtime) {
        shell.echo('\nCommand "' + cmd + '" finished after ' + (end - start) / 1000 + ' seconds\n')
    }
    if (run.code !== 0) {
        shell.echo('\nError: Build failed at step "' + cmd + '" with ExitCode ' + run.code + '\n');
        botio.message('Error: Build failed at step "' + cmd + '" with ExitCode ' + run.code);
        shell.exit(1);
    }
}


cmd = 'bundle install --path ./vendor/bundle';
runCommand(cmd, suppress, runtime);

cmd = 'npm install';
runCommand(cmd, suppress, runtime);

cmd = 'bower install';
runCommand(cmd, suppress, runtime);

cmd = 'rm -rf _site/*';
runCommand(cmd, suppress, runtime);

cmd = 'gulp sass concat jekyll-build';
runCommand(cmd, suppress, runtime);

cmd = 'cp -r ./_site/* /mnt/live';
runCommand(cmd, suppress, runtime);
