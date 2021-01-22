## Description
Sometimes can be hard to handle with authentication on some applications, especially when there are a large number of user types with different access permissions to certain resources. This project aims to implement a permissions system based on <b>"Roles and Permissions"</b>. This approach allows you to categorize users into <b>Roles</b> and assign them a series of <b>Permissions</b> for certain <b>Resources</b>. In this project, the permissions will be stored in the database and the application will use a function to determine whether or not the user has permission to access a given resource.
 
## Installation
```bash
$ npm install
or
$ yarn install
```

## Setting up enviroment variables
Create a file called ".env" at the root of the project. Then add the following environment variables:

| NAME         | DESCRIPTION                                               | EXAMPLES         |
|--------------|-----------------------------------------------------------|------------------|
| APP_PORT     | The port that will be used to run the app.                | 3333             |
| APP_HOST     | The host name that will be used to run the app.           | localhost        |
| APP_PROTOCOL | The protocol that will be used by the app (http or https) | http             |
| APP_SECRET   | Private key used to encrypt app data.                     | SomeHashedString |
| DB_HOST      | The host name of the database.                            | localhost        |
| DB_PORT      | The port of the database.                                 | 5432             |
| DB_USER      | The user of the database                                  | docker           |
| DB_PASSWORD  | The password for the database user.                       | docker           |
| DB_NAME      | The database name.                                        | rpa              |

## Running the migrations
Before starting the application we need to run the existing migrations in ```src/shared/database/migrations```. To do this, run one of the following commands:
 
```bash
$ npm run migration:run
or
$ yarn migration:run
```
After that, the environment is ready to run the application.

## Running the app
```bash
# development
$ npm run start
or
$ yarn start

# watch mode
$ npm run start:dev
or
$ yarn start:dev

# production mode
$ npm run start:prod
or
$ yarn start:prod
```

## Providing initial data to database
To use system authentication we need to feed the database with some initial data. Among the tables that need to be fed are: "roles", "resources" and "permissions".

### Resources table
The "resources" table refers to the resources that users can manipulate through the system, to identify the resources we can look at the name that we put in the "controllers", in this example we will create 3 different resources and they are: "users", " customers "and" sessions "(this system uses JWT authentication and the sessions resource could be changed to" auth "for example, just assign the name" sessions "for semantic reasons).

our resource table should look like this:

| id                                   | name      |
|--------------------------------------|-----------|
| f05be280-9846-4d06-b48c-fc74f05c6bf1 | sessions  |
| 35c66938-0fe7-4a49-b013-960481060812 | users     |
| 5b645a3f-738b-429b-a57f-c7501a6e6f1c | customers |

### Roles table
The "roles" table will contain all system user roles, including a "guest" user who is not directly registered in the database. In this example we will register 2 different types of user, they are: "guest" and "admin".

Our table of roles should look like this:  

| id                                   | name  |
|--------------------------------------|-------|
| 8c0fc252-7cd4-4154-bb2f-8a09203c539d | guest |
| 852930c3-d94c-40ed-94c4-9b0bef43a5db | admin |

### Permissions table
In the "permissions" table, we assign access permissions to certain resources for certain roles, in addition, we need to provide the http method. Through this table we can read the permissions as follows: "role CAN http_method resource".

As an example I will add some permissions using the data already registered above.

| id | role_id                              | method | resource_id                          |
|----|--------------------------------------|--------|--------------------------------------|
|    | 8c0fc252-7cd4-4154-bb2f-8a09203c539d | POST   | f05be280-9846-4d06-b48c-fc74f05c6bf1 |
|    | 8c0fc252-7cd4-4154-bb2f-8a09203c539d | POST   | 35c66938-0fe7-4a49-b013-960481060812 |
|    | 852930c3-d94c-40ed-94c4-9b0bef43a5db | GET    | 5b645a3f-738b-429b-a57f-c7501a6e6f1c |

We can read the following permissions as follows:

"guest can post sessions"
"guest can post users"
"admin can get customers"

## Protecting resources
To protect our routes we need to use a Decorator called "Protect", which can be found inside the "sessions" module, this decorator receives the resource name as the first parameter (same in the database) and the other parameters are other optional decorators. Example:

```ts
import { Controller, Get } from  '@nestjs/common';
import { Protect } from  './sessions/protect.decorator';

@Controller()
export  class  AppController {
	@Protect('index')
	@Get()
	index() {
		return { hello:  'World' };
	}
}
```

In the example above we import the "Protect" decorator and decorate our "Get" route by passing the resource name as a parameter, every time this route is accessed by a user, this decorator will check the permissions in the database and check whether the accessor has the necessary permissions or not. If the user does not have permission to access any resource, a 403 error will be thrown, like this:

```json
{
	"statusCode":  403,
	"message":  "Forbidden resource",
	"error":  "Forbidden"
}
```