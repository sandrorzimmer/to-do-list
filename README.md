# Overview

This project develops an API for a task management system (to do list) where users can oversee their daily chores list.
It utilizes HTTP standards to provide seamless data exchange and interaction between differente systems over the web.

# Technology resources

- JavaScript ES6
- Node.js 18.14.2
- Express 4.18.2
- Mongoose 7.2.0
- MongoDB

# Primary features

- Create task
- List all tasks
- Retrieve one task
- Update task
- Delete task

# Aditional features

- Filter
  - Retrieve tasks by keyword
  - Retrieve tasks by due date range
  - Retrieve tasks by status (completed or not)
- Pagination
  - Select page
  - Limit number of items per page
  - Sort by specified field

# Endpoints

- **GET - /tasks**
    
    Retrieves a list of all tasks from the database. By default, it uses pagination with a limit of ten items, as explained further below.
    
    Returns a JSON response containing information about the tasks.

- **GET - /tasks/search**
    
    Retrieves a list of tasks according to provided search parameters.

    Returns a JSON response with the data of the requested query.

    Some examples of search can include:

    - **/tasks/search?completed=true**
        
        Retrieves all completed tasks.

    - **/tasks/search?title=clothes**
        
        Retrieves all tasks whose title contains the word "clothes".

    - **/tasks/search?description=dry**
        
        Retrieves all tasks whose description contains the word "dry".

    - **/tasks/search?minDueDate=2023-05-27T00:00:00.000Z**
        
        Retrieves all tasks whose due date is equal or higher than 2023-05-27T00:00:00.000Z. It uses the ISO standard to provide date and time.

        It is also possible to provide only the date in the query, like "2023-05-27". The API will automatically fill the time as 00:00:00.000Z.

    - **/tasks/search?maxDueDate=2023-05-31T00:00:00.000Z**
        
        Retrieves all tasks whose due date is equal or lower than 2023-05-31T00:00:00.000Z.

    - **/tasks/search?minDueDate=2023-05-27T00:00:00.000Z&maxDueDate=2023-05-31T00:00:00.000Z**
        
        Retrieves all tasks whose due date range is between 2023-05-27T00:00:00.000Z and 2023-05-31T00:00:00.000Z.

    - **/tasks/search?title=clothes&completed=true&maxDueDate=2023-05-31T00:00:00.000Z**
        
        It is possible to use the filters combined using the *&* operator. In the example, it retrieves all tasks whose title contains the word "clothes", the status is completed and the due date is equal or lower than 2023-05-31T00:00:00.000Z.
    
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

# Pagination

By default, the API uses a limit of 10 items per page, sorted by ID in ascending order.

Using the keywords ***limit***, ***page*** and ***sortBy*** will change these parameters.

These are some examples:

- **GET - /tasks**

    Retrieves the first ten tasks, sorted by ID in ascending order. This is the default way.

- **GET - /tasks?limit=20**

    Retrieves the first 20 tasks, sorted by ID in ascending order.

- **GET - /tasks?limit=20&page=2**

    Retrieves 20 tasks, sorted by ID in ascending order.
    
    The parameter *page=2* indicates that this is the second page, meaning the first 20 taks are skipped, and the result includes the 21st to 40th tasks.

# Sorting

By default, the results are sorted by ID in ascending order.

Using the keyword ***sortBy*** and a positive or negative number 1 will change these parameters.

For example:

- **GET - /tasks?sortBy=title:-1**

    Retrieves the first ten tasks sorted title in descending order.

- **GET - /tasks?limit=20&page=2&sortBy=title:1**

    This is a combined form, using pagination and sorting.
    
    Retrieves 20 tasks, sorted by title in ascending order, skipping the first 20 items.