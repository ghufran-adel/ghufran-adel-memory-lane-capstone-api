
# Memory Lane API

Memory Lane API serves as the backend for a Memories application, providing endpoints to manage user profiles, milestones, and media associated with each memory. Built using Express.js, Knex.js, and MySQL database, this API facilitates storing, retrieving, and managing memories stored by users.

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

- **User Authentication**: Users can sign up, log in, and authenticate using JSON Web Tokens (JWT), ensuring secure access to their memories.
- **User Profiles Management**: Users have the ability to manage profiles for their children. This includes creating new profiles, editing existing ones, and deleting profiles as needed. This feature enhances user control and customization, allowing them to organize and personalize their memories more effectively.
- **Memories Management**: Users can create, delete, and view their memories, including milestone events.
- **Media Attachment**: Memories can include various types of media, such as images, videos, or audio recordings, providing a rich multimedia experience.
- **Location Tagging**: Memories can be tagged with location information, allowing users to remember where each memory took place.
- **Creative Memory Creation**: The API offers a creative memory creation feature where users can add descriptive titles and meaningful descriptions to their memories as well as people in the memory.
- **Date Selection**: Users can select the date of each memory, capturing the moment accurately.
- **Secure Authorization**: Authorization middleware ensures that users can only access their own memories and profiles, enhancing data security and privacy.



## Installation

### Developer Environment

1. Clone the repository :
```bash
git clone <repository-url>
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
- **google places api** 

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

### Lessons Learned
- **Thorough Planning and Testing:** The importance of thorough planning and testing became evident during the development process, particularly when implementing advanced functionalities such as notifications. Future projects will benefit from dedicating sufficient time to planning and testing to avoid issues encountered during implementation.
  
- **Consideration of Alternative Approaches:** Attempting to implement functionality using one approach and then pivoting to another when faced with challenges highlighted the importance of considering alternative approaches. This flexibility allows for adaptation and optimization, ultimately leading to more successful outcomes.

### Next Steps
- **Refine Notification Functionality:** Explore alternative methods and technologies for implementing notification functionality, considering lessons learned from the initial attempts. This may involve further research, experimentation, and possibly leveraging external services or APIs specialized in notifications.
  
- **Continuous Improvement:** Continuously seek opportunities for improvement and optimization in the development process. This includes refining development workflows, exploring new technologies, and staying updated on best practices in software development.
  
- **Enhance User Experience:** Prioritize enhancing the user experience by addressing any usability issues, optimizing performance, and adding new features based on user feedback. This could involve conducting user testing sessions, collecting feedback, and iteratively improving the application based on user insights.

## Frontend Repository

[Frontend Repository](<https://github.com/ghufran-adel/memory-lane-capstone>)
