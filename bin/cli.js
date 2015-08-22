#! /usr/bin/env node

var _ = require('lodash');
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
    .option('-+, --googleplus', 'Google+ profile');

program.command('github')
    .description('GitHub Profile Details')
    .option('-f, --followers', 'List Followers')
    .option('-r, --repos', 'List Repositories')
    .action(function (options) {
        var github = new GitHubApi({
            version: "3.0.0",
            protocol: "https",
            host: "api.github.com",
            timeout: 5000,
            headers: {
                "user-agent": "jordan-hawker"
            }
        });

        if (options.followers) {
            github.user.getFollowers({
                user: 'elwayman02'
            }, function (err, followers) {
                console.log('Followers:');
                var logins = _.chain(followers).sortBy('login').map('login').value();
                _.each(logins, function (follower) {
                    console.log(follower);
                });
            });
        }
        if (options.repos) {
            github.repos.getFromUser({
                user: 'elwayman02',
                type: 'owner',
                per_page: 100
            }, function (err, repos) {
                console.log('Repositories:');
                var names = _.chain(repos).filter('fork', false).map('name').value();
                _.each(names, function (repo) {
                    console.log(repo);
                })
            });
        }
    });

// Finish configuring the program and parse the CLI arguments
program.parse(process.argv);

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
