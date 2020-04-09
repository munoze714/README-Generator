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
        message: "Provide instructions and examples for use. Include screenshots as needed.",
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
        message: "Write tests for your application. Then provide examples on how to run them."
    },
    {
        type: "input",
        name: "Questions",
        message: "Any other Questions?"
    },
    ])
    .then(function (answer) {
        // console.log(answer)

        const queryUrl = `https://api.github.com/users/${answer.username}?acceses_token=0c8635d351a30c3534085cffdb89e924eb82b4b4`;
        axios.get(queryUrl).then((data) => {
            console.log('data from github!!!', data.data)

            var readme = `
                #Project Title:
                ${answer.Title}
                ##Description:
                ${answer.Description}
                ##Table of Contents
                *[Installation](#Installation)
                *[Usage](#Usage)
                *[License](#License)
                *[Contributing](#Contributing)
                *[Test](#Test)
                ###Installation:
                ${answer.Installation}
                ###Usage:
                ${answer.Usage}
                ###Licence:
                ${answer.License}
                ###Contributing:
                [![${answer.Contributing}](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)
                ###Test:
                ${answer.Tests}
                ###Questions:
                ${answer.Questions}
                ![alt text](${data.data.avatar_url})
                ![alt text](${data.data.email})

                `

            fs.writeFile('readme.md', readme, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');

            })
        });
    });
