const inquirer = require("inquirer");
const SVG = require("./svg");
const {Circle, Triangle, Square} = require("./shapes");
const {writeFile} = require("fs/promises");

class CLI {
    run() {
        return inquirer
        .prompt([
            {
                name: "text",
                type: "input",
                message: "Enter text to be placed inside the logo. (Must be no more than 3 characters.",
                validate: (text) =>
                text.length <= 3 || "The text entered cannot be more than 3 characters."
            },
            {
                name: "textColor",
                type: "input",
                message: "What color would you like the text color to be?"
            },
            {
                name: "logoShape",
                type: "list",
                message: "Please select the shape of your logo.",
                choices: ["circle", "square", "triangle"]
            },
            {
                name: "shapeColor",
                type: "input",
                message: "What color would you like the shape to be?"
            }
        ])
        .then(({text, textColor, logoShape, shapeColor}) => {
            let shape;

            switch (logoShape) {
                case "circle":
                    shape = new Circle(shapeColor);
                    break;
                case "square":
                    shape = new Square(shapeColor);
                    break;
                case "triangle":
                    shape = new Triangle(shapeColor);
                    break;
            }

            shape.setColor(shapeColor);

            const svg = new SVG();
            svg.setText(text, textColor);
            svg.setShape(shape);
            return writeFile("logo.svg", svg.render());
        });
    }
}