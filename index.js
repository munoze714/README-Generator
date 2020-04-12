const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
    .prompt([{
        message: "Enter your GitHub username",
        name: "username"
    },
    {
        type: "input",
        name: "Title",
        message: "What's the Title of your Project?"
    },
    {
        type: "input",
        name: "Description",
        message: "Write a Description of your Project?"
    },
    {
        type: "input",
        name: "Installation",
        message: "What things will you need to install the software and how to install them?"
    },
    {
        type: "input",
        name: "Usage",
        message: "Provide Usage instructions and examples for use. Include screenshots as needed.",
    },
    {
        type: "input",
        name: "License",
        message: "Add a License?"
    },
    {
        type: "input",
        name: "Contributing",
        message: "Add an Contributing Covenant"
    },
    {
        type: "input",
        name: "Tests",
        message: "Are there tests for your application. Then provide examples on how to run them."
    },
    ])
    .then(function (answer) {
        // console.log(answer)

        const queryUrl = `https://api.github.com/users/${answer.username}?access_token=ced8bce7e17bfc19c95a6b7a9799b7d0b1607edc`;
        axios.get(queryUrl).then((data) => {
            console.log('data from github!!!', data.data)

            var readme = `
# Project Title:
${answer.Title}

## Description:
${answer.Description}

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Test](#Test)

### Installation:
${answer.Installation}

### Usage:
${answer.Usage}

### Licence:
${answer.License}

### Contributing:
![${answer.Contributing}](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)

### Test:
${answer.Tests}

### Questions:

![alt text](${data.data.avatar_url})

[${data.data.email}
](${data.data.email})
`

            fs.writeFile('readme.md', readme, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');

            })
        });
    });
