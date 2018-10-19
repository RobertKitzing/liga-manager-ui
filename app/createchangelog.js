const optionDefinitions = [
    { name: 'versionCode', alias: 'v', type: String },
    { name: 'tagName', alias: 't', type: String }
]
const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)
const { exec } = require('child_process');
var fs = require('fs');
const fastLaneDir = "./metadata/de-DE/changelogs";

exec("git log --oneline $(git describe --tags --abbrev=0 @^)..@",
    function (error, out) {
        if (error instanceof Error)
            throw error;
        fs.writeFile(fastLaneDir + "/" + options.versionCode + ".txt", out, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    });