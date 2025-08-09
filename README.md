# WBS-Alumni-Board-API

## Description
WBS-Alumni-Board-API is a RESTful backend service designed to support an alumni board platform for WBS Coding School graduates. It provides endpoints for user management, job and project postings, skill tracking, Q&A, comments, and matching users to jobs or projects. The API also integrates with OpenAI for prompt-based communication and supports basic statistics and email notifications.

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- OpenAI API
- Nodemailer

## Basic Instructions

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd WBS-Alumni-Board-API
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**
    - Create a `.env` file based on `.env.example`.
    - Set up database credentials, JWT secret, and OpenAI API key.

4. **Run database migrations:**
    ```bash
    npx sequelize db:migrate
    ```

5. **Start the server:**
    ```bash
    npm start
    ```

## Exposed Endpoints

### User & Authentication
- `POST /api/users` — Sign up a new user
- `POST /api/auth/login` — Log in and retrieve an auth token
- `GET /api/users` — Retrieve users
- `PUT /api/users/:id` — Update user details
- `DELETE /api/users/:id` — Delete a user

### Company
- `GET /api/companies` — List all companies
- `POST /api/companies` — Create a new company
- `GET /api/companies/:id` — Retrieve details for a specific company
- `PUT /api/companies/:id` — Update company information
- `DELETE /api/companies/:id` — Delete a company

### Skills
- `GET /api/skills` — List all skills
- `POST /api/skills` — Add a new skill
- `PUT /api/skills/:id` — Update a skill
- `DELETE /api/skills/:id` — Remove a skill

### Jobs & Projects
- `GET /api/jobs` — List jobs (pass skills as an array of skill IDs: `skills: []`)
- `POST /api/jobs` — Create a job
- `PUT /api/jobs/:id` — Update a job
- `DELETE /api/jobs/:id` — Delete a job
- `GET /api/projects` — List projects (pass skills as an array of skill IDs: `skills: []`)
- `POST /api/projects` — Create a project
- `PUT /api/projects/:id` — Update a project
- `DELETE /api/projects/:id` — Delete a project

### Q&A and Comments
- `GET /api/questions` — List questions
- `POST /api/questions` — Create a question
- `GET /api/comments` — List comments
- `POST /api/comments` — Add a comment
- `GET /api/comments/:model/:id` — Retrieve comments for a specific entry (e.g., `/api/comments/jobs/1` for comments on job with `id=1`)

### Statistics & Email
- `GET /api/stats` — Retrieve basic statistics
- `POST /api/mail` — Send emails

### Matching Endpoints
- `GET /api/match/users/jobs/:jobId` — Get users matching a job
- `GET /api/match/jobs/users/:userId` — Get jobs matching a user
- `GET /api/match/users/projects/:projectId` — Get users matching a project
- `GET /api/match/projects/users/:userId` — Get projects matching a user

### OpenAI Integration
- `POST /api/prompts` — Communicate with OpenAI via proxy

### File Uploads & Cloud Storage
- The API uses [Multer](https://github.com/expressjs/multer) for handling file uploads (e.g., user avatars, company logos).
- Uploaded files are stored in the cloud using [Cloudinary](https://cloudinary.com/), which provides secure and scalable media management.
- Refer to the relevant endpoints for file upload instructions and required fields.

> **Note:** All endpoints may require authentication. Refer to your API documentation or Swagger for detailed request/response formats.


## Live API

The API is deployed and actively used by the frontend at [https://wbs-alumni-board.onrender.com/](https://wbs-alumni-board.onrender.com/). You can interact with the live endpoints via this URL.