# NodeJS API Assessment

## Description
API for system where teachers can perform administrative functions for their students. Teachers and students are identified by their email addresses.

## Table of Contents
- Requirements
- Installation
- Usage
- API Endpoints
- Testing

## Requirements
- Node v14.x or newer
- MySQL database

## Installation
Instructions on how to install and set up the project locally.

```bash
git clone https://github.com/falahsakti/node-api-assessment.git
cd node-api-assessment
npm install
```

Configure environment variables
- Before configuring environment variables, prepare a new empty MySQL database
- Create new file: .env (or copy and rename from .env.example)
- Specify environment variables for db connection. e.g.:
```
DB_USER=[YOUR_DB_USER]
DB_PASSWORD=[YOUR_DB_PASSWORD]
DB_DATABASE=[YOUR_DATABASE_NAME]
DB_HOST=[YOUR_DB_HOST]
DB_DIALECT=mysql
DB_PORT=3306
PORT=5000
```
Run db migration (optional)
- it will migrate the database tables and seed data for teachers table.
- Teachers seed data:
  - teacherken@gmail.com
  - teacherjoe@gmail.com
``` bash
npm run dbmigration
```
## Usage
``` bash
npm start
```
By default, the API will run on port 5000

# API Endpoints
List of API Endpoints

## POST /api/Register
- Description: Register one or more students to a specified teacher.
- Headers: `Content-Type: application/json`
- Request Body:
``` json
{
  "teacher": "teacherken@gmail.com"
  "students":
    [
      "studentjon@gmail.com",
      "studenthon@gmail.com"
    ]
}
```

- Response:
`HTTP 204 (No content)`

## GET /api/commonStudent
- Description: Retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers.

- Request examples:
- `GET /api/commonstudents?teacher=teacherken%40gmail.com`
- `GET /api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com`
- Response:
```
{
  "students" :
    [
      "commonstudent1@gmail.com", 
      "commonstudent2@gmail.com"
    ]
}
```

## POST /api/suspend
- Description: Suspend a specified student.
- Headers: `Content-Type: application/json`
- Request Body:
``` json
{
  "student" : "studentmary@gmail.com"
}
```

- Response:
`HTTP 204 (No content)`

## POST /api/retrievefornotifications
- Description: Retrieve a list of students who are not suspended and can receive a given notification.
- Headers: `Content-Type: application/json`
- Request Body:
``` json
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
}
```

- Response:
``` json
{
  "recipients":
    [
      "studentbob@gmail.com",
      "studentagnes@gmail.com", 
      "studentmiche@gmail.com"
    ]   
}
```
## Testing
Ensure you have all dependencies installed:
```
npm install
```
Run the tests:
```
npm test
```
View test results: The test results will be displayed in the terminal.

Using Postman: Import collection file `postman-collection.json`

