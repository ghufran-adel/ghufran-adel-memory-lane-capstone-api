
# Memory Lane API

Memory Lane API is a backend application for a Memories app built with Express.js, Knex.js, and MySQL database.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
  - [Developer Environment](#developer-environment)
- [API References](#api-references)
- [Screenshots](#screenshots)
- [Lessons Learned & Next Steps](#lessons-learned--next-steps)

## Tech Stack

- Express.js
- Knex.js
- MySQL
- bcrypt 
- Multer
- JWT

## Features

- Create, read, and delete Memories 
- Create, read, update, and delete profiles
- Manage users accounts
- Authenticate users and profiles


## Installation

### Developer Environment

1. Clone the repository :
```bash
git clone <git@github.com:ghufran-adel/ghufran-adel-memory-lane-capstone-api.git>
```

2.  create and Connect database using environment variables :
```bash
cp .env.sample .env
```
3. install dependencies :
```bash
npm install
```
4. run migrations and seeds :
```bash
npm run migrate
npm run seed
```
5. start the server :
```bash
npm start
```

## API References
- **google places api** : for au

### Milestones Endpoints

- **GET /milstones/:profileId**: Get all Milestones related to the profile ID
- **POST /milstones/:profileId**: Post new milstones by profile ID
- **GET /milstones/:profileId/:milestoneId**: Get one milestone detalis by profile ID and milestone ID 
- **DELETE /milstones/:profileId/:milestoneId**: Delete a milestone in profile by profile ID and milestone ID 

### User Profiles Endpoints

- **GET /api/profile**:  Get all profiles related to the user logged in
- **POST /api/profile**: Create new profile to the user logged in
- **GET /api/profile/:profileID**: Get Info of profile by profile ID
- **PUT /api/profile/:profileID**: Update a profile by profile ID
- **DELETE /api/profile/:profileID**: Delete a a profile by profile ID

### User Endpoints

- **POST /api/signup**: Register a new user
- **POST /api/login**: Authenticate user login
- **GET /api/** : Get user Info after login


## Screenshots

No screenshots available.

## Lessons Learned & Next Steps

During the development process, attempts were made to implement socket functionality for real-time updates, but it was unsuccessful.

### Lessons Learned
- Importance of thorough planning and testing for implementing advanced functionalities like sockets
- Consideration of alternative approaches for real-time updates

### Next Steps
- Further investigation and implementation of socket functionality
- Enhance API documentation and error handling
- Implement additional features such as user roles and leaderboard

## Frontend Repository

[Frontend Repository](<https://github.com/ghufran-adel/memory-lane-capstone>)
