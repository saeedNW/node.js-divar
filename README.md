# Node.js-divar

The **Node.js-divar** project serves as a fundamental exercise in developing a
modular Node.js SSR application. Its primary aim is to enhance the developer's
proficiency in building fully modular projects. Within the project's **src**
directory, distinct modules such as **Auth**, **User**, and **Post** are clearly
delineated.

While the emphasis lies on modular application development, ancillary aspects like
**SSR** and **Data validation** are not central to this project. For comprehensive
coverage of these areas, refer to other projects like [node.js-store](https://github.com/saeedNW/node.js-store)
and [nodejs.cms](https://github.com/saeedNW/nodejs.cms) within my repositories.

## Table of Contents

- [Node.js-divar](#nodejs-divar)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
    - [Development Environment](#development-environment)
    - [Production Environment](#production-environment)
    - [Stopping Production Application](#stopping-production-application)
  - [Additional Notes](#additional-notes)
  - [Technologies Used](#technologies-used)
  - [Contributors](#contributors)

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (latest version)
- [Docker](https://www.docker.com) (latest version)
- [MongoDB](https://www.mongodb.com/) (latest version)
- [Visual Studio Code](https://code.visualstudio.com/) (or any code editor of your choice)

## Installation and Setup

In order to get this application up and running on your local machine, follow the
steps below.

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/saeedNW/node.js-divar.git
   ```

2. Navigate to the project directory:

   ```shell
   cd node.js-divar
   ```

3. Install project dependencies:

   ```shell
   npm install
   ```

Note that the application default Listing port is `3000`.

### Development Environment

To run the application in development mode you can use this command:

```shell
npm run dev
```

### Production Environment

For production deployment, we recommend using Docker to containerize the application.
To do so, follow these steps:

1. Make sure you have Docker installed and running on your machine.

2. Build and start the Docker containers using `docker-compose`:

   ```shell
   docker compose up --build -d
   ```

This will create and start the necessary containers for your application, including
Node.js, and MongoDB.

The application will be accessible at `http://localhost:3000` in your web browser.

### Stopping Production Application

To stop the application and the Docker containers (in production mode), run:

```shell
docker-compose down
```

## Additional Notes

- Make sure to set up environment variables as needed in the **.env** file. These
  variables may include database connection details and other sensitive information.

- If you encounter any issues during the installation process or while running the application, please check the
  project's issue tracker on GitHub or contact the project maintainers for support.

- In order to connect to Production MongoDB through MongoDB compass or terminal you can use the following connection string

  ```bash
  mongodb://Manager:aFkdpfww%5EkRKP%5E@127.0.0.1:27018/divar
  ```

Now you should have your Node.js application up and running!

## Technologies Used

List of the major technologies and libraries used to build this application:

- Node.js & Express.js
- MongoDB
- Swagger
- Docker
- EJS (Embedded JavaScript templates)

## Contributors

We would like to thank the following individuals who have contributed to the development of this application:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎ ‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the node.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)
