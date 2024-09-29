// Hostname and port
const hostname = "localhost";
const port = 3000;

// Some libraries
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger-output.json");

// Routers
const UserRouter = require('./routes/user');

// Controllers
const ConsoleController = require('./controllers/console');
const ErrorController = require('./controllers/error');

// Models
const User = require('./models/user');

// Database
const mongo_db = require('./data/database');

// Application
const app = express();

// We give the app some useful features
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(
    path.dirname(require.main.filename), 
    'public'
)));

// Some settings
app.set('view engine', 'ejs');
app.set('views', 'views');

// Setting the user of request
app.use(function(req, res, next)
{
    User.findById('652a8a9aaa12b063de93ecea', function(user)
    {
        /*
            For now, there is only one user, but in future, 
            there will be more users and authentication.
        */
        req.user = new User(
            user.username,
            user.email, 
            user.password,
            user._id
        );
        next();
    });
});

// Give the app access to log every request
app.use(ConsoleController.LOG_Request);

// Give the app access to the routes 
app.use('/', UserRouter);

// Give the app access to log and send error
app.use(ConsoleController.LOG_Error);
app.use(ErrorController.SEND_Error_Page);

// Connect to the database and start the server
mongo_db.mongoConnect((client) => {
    app.listen(port, hostname, () => {
        console.log(`\n\nServer successfully started at ${hostname}:${port}\n`);
    });    
})
