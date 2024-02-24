require('dotenv').config();

const connectDB = require('./server/config/dB')

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require ('passport');
const MongoStore = require('connect-mongo')

const app = express();
app.set('view engine', 'ejs')
app.set('views', './Views');

app.get('/', (req, res) => {
    res.render('index'); 
})

const PORT = process.env.PORT || 8000;

app.use(session({
    secret: 'hakuna matata',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride ("_method"));

//Connect to DB
connectDB();

// static files
app.use(express.static("public"));

// ejs engine setup
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs');

// Routes

app.use('/', require('./server/routes/auth'))
app.use('/', require('./server/routes/indexRoute'))
app.use('/', require('./server/routes/dashboardRoute'))

app.get('*',function (req, res) {
    res.status(404).render('404')
    
})


app.listen(PORT, ()=>{
    console.log(`server is running of port ${PORT}`);
})
