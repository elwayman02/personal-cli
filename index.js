#! /usr/bin/env node

var program = require('commander');
var GitHubApi = require('github');

program.version('0.0.1-beta.1')
    .usage('[options]')
    .option('-a, --all', 'All Information')
    .option('-b, --blog', 'Blog')
    .option('-c, --contact', 'Contact Information')
    .option('-e, --email', 'Email Address')
    .option('-g, --github', 'GitHub profile')
    .option('-1, --linkedin', 'LinkedIn profile')
    .option('-s, --stackoverflow', 'StackOverflow profile')
    .option('-t, --twitter', 'Twitter profile')
    .option('-w, --website', 'Website')
    .option('-+, --googleplus', 'Google+ profile')
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
}

var commands = {
    website: 'Website: www.JordanHawker.com',
    email: 'Email: hawker.jordan@gmail.com',
    contact: 'Contact: http://jhawk.co/JHcontact',
    blog: 'Blog: http://jhawk.co/JHposts',
    github: 'GitHub: https://github.com/elwayman02',
    linkedin: 'LinkedIn: http://jhawk.co/JHLinked',
    twitter: 'Twitter: @JordanHawker',
    googleplus: 'Google+: +JordanHawker',
    stackoverflow: 'StackOverflow: http://jhawk.co/JHStackOverflow'
};

var key;
for (key in commands) {
    if (commands.hasOwnProperty(key) && (program.all || program[key])) {
        console.log(commands[key]);
    }
}