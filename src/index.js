const express = require('express');
const Sequelize = require('sequelize');

const responseObject = {
  successfulPostgresConnection: false,
  envVarTest: process.env.ENV_VAR_TEST || 'none',
};

const app = express();
const port = process.env.PORT || 8080;

app.use('/volume', express.static('/var/www/'))

const sql = new Sequelize('dockerintro', 'postgres', 'dockerintropw', {
  dialect: 'postgres',
  host: 'prod-postgres',
  logging: false,
  operatorsAliases: false,
  },
);

sql
  .authenticate()
  .then(() => {
    responseObject.successfulPostgresConnection = true;
    console.log('Successful Connection');
  })
  .catch((err) => console.log('Unsuccessful connection', err));

app.get('/', (_, res) => {
  res
    .set({'Content-Type': 'application/json; charset=utf-8'})
    .status(200)
    .send(JSON.stringify(responseObject, undefined, 2));
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
