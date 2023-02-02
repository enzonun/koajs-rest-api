# koajs-rest-api
## Example of NodeJS Koa framework + Postgres as RDBMS   

## Tech stack

- [Koajs] web framework
- [Sequelized] for ORM operations

## Project specific 
- Using bcrypt for encrypt passwords
- Basic-Auth based flow

## Installation

Software you must have installed on your system
- NodeJS 14+
- npm
- nodemon for auto reload ( npm i -g nodemon )

Install Dependencies 
```sh
npm install
```

Create postgresql database with the following name - (change credentials on the config.js file if you need)
```sh
sampledb
```
Run 
```sh
npm run start:dev
```

For insert initial data, execute this function on server.js
```sh
initialdata.insertAllData();
```

[KoaJS]: <https://koajs.com/>
[Sequelized]: <https://sequelize.org/>
[Jest]: <https://jestjs.io/>

