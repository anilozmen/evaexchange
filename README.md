# EvaExchange


## Endpoints

| Method | URL                                         | Description                              |
| -------| ------------------------------------------- | ---------------------------------------- |
| `GET`  | `/api/v1/users`                             | Returns all users.                       |
| `GET`  | `/api/v1/users/:userId`                     | Returns a user.                          |
| `POST` | `/api/v1/users`                             | Creates a new user                       |
| `GET`  | `/api/v1/users/:userId/portfolios`          | Returns a user w/ portfolio data.        |
| `POST` | `/api/v1/users/:userId/portfolios`          | Creates a portfolio to the user.         |
| `POST` | `/api/v1/users/:userId/share/:shareId/buy`  | Buys a share.                            |
| `POST` | `/api/v1/users/:userId/share/:shareId/sell` | Sells a share.                           |
|        |                                             |                                          |
| `GET`  | `/api/v1/shares`                            | Returns all shares.                      |
| `GET`  | `/api/v1/shares/:shareId`                   | Returns a share.                         |
| `POST` | `/api/v1/shares`                            | Creates a share.                         |
| `PUT`  | `/api/v1/shares/:shareId`                   | Updates a share.                         |


## Installation

```bash
# Install Dependencies
$ npm install

# Create the Database
$ npm run db:create

# Create Tables
$ npm run db:migrate

# Import All Dummy Data
$ npm run db:seeds

# Start
$ npm run start

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

