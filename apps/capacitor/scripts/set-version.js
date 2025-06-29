const optionDefinitions = [
    { name: 'version', alias: 'v', type: String },
    { name: 'build', alias: 'b', type: String }
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

const versionInt = options.version.replaceAll('.', '');

const newVersion = `${versionInt}${options.build}`

require('child_process').execSync(
    `npx capacitor-set-version set:android -v ${options.version} -b ${newVersion}`,
    {stdio: 'inherit'}
);