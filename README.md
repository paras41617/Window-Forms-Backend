# Windows Forms App Express.js Server

This project implements a RESTful API server using Express.js to manage submissions from the Windows Forms App. It allows CRUD operations (Create, Read, Update, Delete) on submissions via HTTP requests.

## Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/paras41617/Window-Forms-Backend
   cd Window-Forms-Backend

2. **Install the packages:**

   ```bash
   npm install

3. **Run server:**

   ```bash
   npm start

4. **Run server:**

   ```bash
   The server will start running at http://localhost:3000

## API Endpoints

1. **Ping Endpoint:**

   ```bash
   GET /ping
   Checks if the server is running.

2. **Submit Endpoint:**

   ```bash
   POST /submit
   Adds a new submission to the database
   Example request body:

    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "github_link": "https://github.com/johndoe",
        "stopwatch_time": "1:30:00"
    }

3. **Read Endpoint:**

   ```bash
   GET /read
   Retrieves a submission by index.

   Query parameter - index: Index of the submission to retrieve.

4. **Edit Endpoint:**

   ```bash
   PUT /edit
   Edits an existing submission.

   Example request body (to edit by index):

   {
       "index": 0,
       "name": "Updated Name",
       "email": "updated.email@example.com"
   }
   
   Not allowed to edit the stopwatch time.

5. **Delete Endpoint:**

   ```bash
   DELETE /delete
   Deletes a submission by index.

   Query parameter - index: Index of the submission to delete.