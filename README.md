# Digital Hub - Backend Assignment

## Assignment purpose
The purpose of this test is to show off my level of backend development skills and to show my knowledge
of modern backend frameworks.

## Brief description
For this assignment we need to develop a REST API according to provided requirements with the functionality
of transferring money and showing the past transactions in a historical transaction list.

## Functionalities
- Transfer money
- Transaction history
- Account balance

## Technologies used
The application is focused on clean and reusable code following backend development best practices.

Following the rules about development requirements, Javascript, Typescript, and NodeJs are used for this assignment.

## Application development approach

The approach used for this application is constructed classes in "Typescript" for reuse objects in the REST services response, such as in the transaction history.

Some interfaces were created where only the assignment of variables is required and others to implement functionality in different REST controllers.

## How to run the project
To run the application, follow this steps:

### Pre-requisities
1. Nodejs installed

### Setup

1. Open a terminal
2. Change directory to the in the app folder
3. Install dependencies with:
   
    `npm install`

4. Execute command:

    `npm run build && npm run start`

    This command output the message in the console:

    `"Server running..."`

5. Open a browser tab and go to: http://localhost:3000/digitalhub/api

    This will open the swagger documentation and there can execute a test of the REST endpoints.