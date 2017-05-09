var botio = require(process.env['BOTIO_MODULE']);
var shell = require('shelljs');
var now = require('performance-now');
var cmd;
var suppress = false;
var runtime = true;
var root_url = botio.public_url.slice(0, -16);

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


// Remove all files that exist in the latest build from the public directory
cmd = 'for file in /mnt/latest/*; do rm -rf /mnt/public/$(basename $file); done';
runCommand(cmd, suppress, runtime);

botio.message('Removed files from '+root_url);

