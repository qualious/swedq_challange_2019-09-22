### SwedQ Project

```
# Scenario:
Imagine you are an SwedQ consultant and you got assigned to a project at one of our top partners.
They have a number of connected vehicles that belongs to a number of customers.
They have a need to be able to view the status of the connection among these vehicles on a monitoring display.

The vehicles send the status of the connection one time per minute.
The status can be compared with a ping (network trace); no request from the vehicle means no connection.

# Task:
Your task will be to create a data store that keeps these vehicles with their status and the customers who own them, as well as a GUI (preferably web-based) that displays the status.
How the GUI is designed is up to you, as well as how you chose to implement the features and use suitable technologies.

Obviously, for this task, there are no real vehicles available that can respond to your "ping" request.
This can either be solved by using static values or ​​by creating a separate machinery that returns random fake status.

# Requirements
1. Web GUI (Single Page Application Framework/Platform).
 - An overview of all vehicles should be visible on one page (full-screen display), together with their status.
 - It should be able to filter, to only show vehicles for a specific customer.
 - It should be able to filter, to only show vehicles that have a specific status.
2. Random simulation to vehicles status sending.
3. If database design will consume a lot of time, use data in-memory representation.
4. Unit Testing.
5. .NET Core, Java or any native language.
6. Complete analysis for the problem.
 - Full architectural sketch to solution.
 - Analysis behind the solution design, technologies,....
 - How the solution will make use of cloud.
 - Deployment steps.

# Optional Requirements
1. Write an integration tests.
2. Write an automation test.
3. Use CI(Travis, Circle, TeamCity...) to verify your code (Static analysis,..) and tests.
4. Dockerize the whole solution.
5. Microservices architecture for driver, vehicle and FaaS APIs.
 - Use any Microservices Chassis Framework.
6. Explain if it is possible to be in Serverless architecture and how?

# Data:
Below you have all customers from the system; their addresses and the vehicles they own.

|-----------------------------------|
| Kalles Grustransporter AB         |
| Cementvägen 8, 111 11 Södertälje  |
|-----------------------------------|
| VIN (VehicleId)       Reg. nr.    |
|-----------------------------------|
| YS2R4X20005399401     ABC123      |
| VLUR4X20009093588     DEF456      |
| VLUR4X20009048066     GHI789      |
|-----------------------------------|

|-----------------------------------|
| Johans Bulk AB                    |
| Balkvägen 12, 222 22 Stockholm    |
|-----------------------------------|
| VIN (VehicleId)       Reg. nr.    |
|-----------------------------------|
| YS2R4X20005388011     JKL012      |
| YS2R4X20005387949     MNO345      |
------------------------------------|

|-----------------------------------|
| Haralds Värdetransporter AB       |
| Budgetvägen 1, 333 33 Uppsala     |
|-----------------------------------|
| VIN (VehicleId)       Reg. nr.    |
|-----------------------------------|
| YS2R4X20005387765     PQR678      |
| YS2R4X20005387055     STU901      |
|-----------------------------------|
```

## Analysis

##### COMING SOON

## Installation

In order to look at the final product in your local machine, first clone the repo.

First order of business is to build a DB in order to store our data. For your convenience, I've included a data dump, which can be found at `backend/dump.tar`.

Be sure that you have a postgreSQL instance running and then run:

```
pg_restore -d <db-name> dump.tar -c -U postgres -W -h localhost
```

After setting up the database, don't forget to install and open a `redis-server` instance. It uses `localhost`, so don't change anything.

Then, go to `backend/config/config.json` and modify it with your db information.

Example:

```
{
  "development": {
    "username": "dev-username",
    "password": "dev-password",
    "database": "dev-database",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "sync": true
  },
  "test": {
    "username": "test-username",
    "password": "test-password",
    "database": "test-database",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "sync": true
  },
  "production": {
    "username": "prod-username",
    "password": "prod-password",
    "database": "prod-database",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "sync": true
  }
}

```

Then;

```
cd backend/
npm install
npm start
```

After making sure that backend is up and running without any problems, fingers-crossed, you can start to setup frontend.

The frontend app uses Google Maps API in order to show vehicles on the Map, so don't forget to create a `.env` file that includes the API key given by flag `REACT_APP_GOOGLE_MAPS_API_KEY`. In order to show the full theme and other things, this is necessary. If you can't obtain one, please let me know.

Then, you can start the React part of the project by going to frontend, then executing:

```
cd frontend/
npm install
npm start
```

## Deployment

Create a _Procfile_ with the following line: `web: npm run start:prod`.

Install the Node.js buildpack for your Heroku app by running the following command:

```
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v163 -a [app name]
```

Make sure to replace `#v163` (current highest version) with whatever the latest buildpack is, which you can [find here](https://github.com/heroku/heroku-buildpack-nodejs/releases).

Follow the standard Heroku deploy process:

1.  `git add .`
2.  `git commit -m 'Made some epic changes as per usual'`
3.  `git push heroku master`

## Screenshots

##### COMING SOON
