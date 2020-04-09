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
        message: "Is there a Special Installation?"

    },
    {
        type: "input",
        name: "Usage",
        message: "What's the Usage?"
    },
    {
        type: "input",
        name: "License",
        message: "What's the License?"
    },
    {
        type: "input",
        name: "Contributing",
        message: "Who is Contributing?"
    },
    {
        type: "input",
        name: "Tests",
        message: "Are there any test?"
    },
    {
        type: "input",
        name: "Questions",
        message: "Any other Questions?"
    },
    ])
    .then(function (answer) {
        console.log(answer)

        const queryUrl = `https://api.github.com/users/${answer.username}/repos?per_page=100`;
        axios.get(queryUrl).then((data) => {
            console.log('data from github!!!', data.data)

            var readme = `
                ***Title:
                ${answer.Title}
                **Description:
                ${answer.Description}
                **Installation:
                ${answer.Installation}
                **Usage:
                ${answer.Usage}
                **Licence:
                ${answer.License}
                **Contributing:
                ${answer.Contributing}
                **Test:
                ${answer.Tests}
                **Questions:
                ${answer.Questions}
                ![alt text](${data.data.avatar_url})

                `

            fs.writeFile('readme.md', readme, (err) => {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');

            })
        });
    });
