# Overview

This project develops an API for a task management system where users can oversee their daily chores list.

# Primary features

- Create task
- Read all tasks
- Read one task
- Update one task
- Delete task
- Mark task as completed

# Secondary features

- Data validation
- Due date
- Pagination
- Filter

# Technology resources

- JavaScript
- Node.js 18.14.2
- Express 4.18.2
- Mongoose 7.2.0
- MongoDB

# Endpoints

- **GET - /tasks**
    
    Retrieves a list of all tasks from the database.
    
    Returns a JSON response containing information about the tasks.
    
- **GET - /tasks/:id**
    
    Retrieves a specific task based on the provided ID parameter in the URL (e.g., /tasks/001).
    
    Returns a JSON response with the data of the requested task.
    
- **POST - /tasks**
    
    Creates a new task. Expects the task data to be included in the request body.
    
    If the operation is successful, returns a JSON response with the newly created task.

    The field ***title*** is required.

    The fields ***description*** and ***dueDate*** are optional.

    The field ***completed*** is set to *false* by default.

    There is also a field ***createdAt***, which is automatically populated with the current date and time.

    The field ***_id*** is also automatically populated.
    
    A task can have the following fields:
    
```
    {
        "title": "Example of a title",

        "description": "Description of the task",

        "completed": false,

        "dueDate": "2023-05-25T00:00:00.000Z"
    }
```
    
- **PUT - /tasks/:id**
    
    Updates an existing task identified by its ID included as a parameter in the URL (e.g., /tasks/001).
    
    After the update is performed, returns a JSON response with the updated task.
    
- **DELETE - /tasks/:id**
    
    Deletes a task identified by its ID included as a parameter in the URL (e.g., /tasks/001).
    
    When this endpoint is called, the corresponding task is removed from the system, and a response indicating the success of the deletion is returned.