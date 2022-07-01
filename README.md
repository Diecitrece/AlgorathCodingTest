# Coding test approach

## Problem

We have a number of users that we need to keep track of, we also wish to keep track
of the connections between users.

## Solution

We would like you to build a web app that allows to:
- Add a user.
- Add a connection between 2 users.
- Retrieve all the users that are directly connected with a given user.
- Show a stats report regarding the relations between the users.

A user is defined by 2 pieces of information, an id and a name.

## Restrictions

- You may use any technology, libraries, frameworks and database of your choice.
- Consider that your solution should come with deployment instructions and tests.

## Delivery

Please provide your solution in a compressed file.
Create a project available through a public repository (e.g. git) that we can access (we
would like to be able to see how your solution progresses).

# Deployment instructions

**It is important to use node v17.8.0**

1. Open a terminal and execute `git clone https://github.com/Diecitrece/AlgorathCodingTest.git`
2. Execute `cd AlgorathCodingTest` in 3 distinct terminals
3. Run `cd backend` in two of the terminals
4. In 'backend' folder, create a '.env' file based on the 'env_template' file, and fill it's variables as you want
5. In the first terminal, execute `docker-compose up` to deploy the database. You may need to open docker desktop first
6. In the second terminal, run `npm install` and `npm run dev`(I've not been able to get the backend on productions because of some aliases)
7. In the missing terminal, run `cd frontend` and repeat step **4** but on 'frontend' folder. By default, the backend runs at port 8080
8. Run `npm install`, `npm run build` and `npm run start`
9. Get to `http://localhost:3000` on your browser to start using the app
