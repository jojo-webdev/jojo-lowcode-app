#!/usr/bin/env node

const {execSync} = require('child_process');
const fs = require("fs");

const runCommand = command => {
    try {
        execSync(`${command}`, {stdio: 'inherit'});
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return false;
}

const repoName = process.argv[2]

console.log('');
console.log(`Creating jojo-lowcode-app with name ${repoName}`);
console.log('');
const gitCheckoutCommand = `git clone --depth=1 --branch=main https://github.com/jojo-webdev/jojo-lowcode-app ${repoName}`;
runCommand(gitCheckoutCommand);
fs.rmSync(`./${repoName}/.git`, { recursive: true, force: true });

console.log('');
console.log(`Installing depedencies for ${repoName}`);
console.log('');
const installDepsCommand = `cd ${repoName} && npm install`;
runCommand(installDepsCommand);

console.log("Congratulations! You are ready.")