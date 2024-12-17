# WBS-Alumni-Board-API

## Exposed endpoints:
- **push** **/api/users** for signing up
- **push** **/api/auth/login** for login (& retrieve auth token)
- **/api/users** for any other CRUD operations
- **/api/skills**
- **/api/jobs** (pass skills as an array of skill-ids: skills:[])
- **/api/projects** (pass skills as an array of skill-ids: skills:[])
- **/api/comments**
- **/api/comments/:model/:id** (special) to retrieve data related to a specific entry of a model (e.g. "/api/comments/jobs/1" gets the comments related to the job with id=1)

### Matches endpoints
- **/api/match/users/jobs/:jobId** get users matching to a job
- **/api/match/jobs/users/:userId** get jobs matching to a user
- **/api/match/users/projects/:jobId** get users matching to a project
- **/api/match/projects/users/:userId** get projects matching to a user

## ToDos:
- secure endpoints as needed
