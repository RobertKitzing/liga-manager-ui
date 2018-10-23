let optionDefinitions = [
    {name: "versionCode", alias: "v", type: String},
    {name: "tagName", alias: "t", type: String}
];
const commandLineArgs = require("command-line-args");
const options = commandLineArgs(optionDefinitions);
const { exec } = require("child_process");
var fs = require("fs");
const fastLaneDir = "./metadata/de-DE/changelogs";

exec("git log --oneline --after={2018-21-10} --pretty=format:\"%s\" --grep=\"[[ADD]]\" --grep=\"[[REMOVE]]\" --grep=\"[[CHANGE]]\" ",
    function (error, out) {
        if (error instanceof Error) {
            throw error;
        }
        fs.writeFile(fastLaneDir + "/" + options.versionCode + ".txt", out, function (err) {
            if (err) {
                console.error(err);
            }

            console.log("The file was saved!");
        });
    });