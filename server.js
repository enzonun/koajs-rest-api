const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./routes')
const logger = require('koa-logger');
const data = require('./utils/initialdata');
const app = new Koa();
const swagger = require('swagger2');
const { ui, validate } = require('swagger2-koa');
const sequelize = require('./config/database');
// const Role = require('./models/role.model');
const document = swagger.loadDocumentSync('./swagger.yml');

sequelize.sync()
    .then(() => {
        console.log('all models synced!')
        // Seed
        // use this function to insert some records from data.json file
        // then you can comment it or delete it
        data.insertAllData();
    }
    )
    .catch((err) => console.log(err));

// db added to app context
app.context.db = sequelize;

app.use(logger())
    .use(bodyparser())
    .use(router.routes())
    .use(ui(document, '/api', ['/api/v1']))
    // change for env. variable for production
    .listen(3000);
console.log(`Server is listening on PORT ${3000}`);
