# e-commerce

## Description

The motivations of this project is to build a back end for an e-commerce site. The application uses an Express.js API and Sequelize to interact with a MySQL database. Sequelize, an object relational mapper (ORM) which is an npm package, allows us to model our data as Javascript classes. Within the server.js file, the Sequlize models are synchronized to the MySQL database on server start. The application includes a seed to populate data in the database with multiple SQL tables including Category, Product, Tag, and Product-Tag. It executes association methods on these Sequelize models to create relationships between these tables. The user is able to interact with the database by sending API Routes in the form of HTTP requests to perform RESTful CRUD (create, read, update, delete) operations. The application is tested using the application's routes in Insomnia.

Link to walkthrough video: https://drive.google.com/file/d/1R-gc1DGe938UBq5nJvm0KPSfcdLaGW2h/view

## Installation

The following tools were used for the development and testing of this project. Code development IDE (Microsoft VS Code) node.js (JavaScript runtime environment) npm (software registry containing mysql2, express, and sequelize).

## Usage

Open command line interface and run MySQL shell and node commands to initiate the database and the server, respectively.

## Credits

Georgia Tech Coding Bootcamp instructors, TA's, and other faculty.

## License

Not applicable