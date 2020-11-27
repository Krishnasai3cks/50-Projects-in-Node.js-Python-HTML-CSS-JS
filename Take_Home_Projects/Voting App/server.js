const express = require("express");
const app = express();
require("dotenv").config();
const reload = require("reload");
const http = require("http");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const MongoClient = require("mongodb").MongoClient;
const routesPath = require("./routes/routes.js");
const session = require("express-session");
app.set("port", 3000);
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(
    session({
        secret: "Happy birthday to you my friend",
        saveUninitialized: true,
        resave: false,
        cookie: { secure: false },
    })
);
app.use(passport.initialize());

MongoClient.connect(
    process.env.DATABASE, { useUnifiedTopology: true },
    (err, client) => {
        if (err) console.log("error \n", err);
        let db = client.db("cluster0");
        db ? console.log("yaay") : console.log("error");

        passport.use(
            new TwitterStrategy({
                    consumerKey: process.env.CONSUMER_KEY,
                    consumerSecret: process.env.CONSUMER_SECRET,
                    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
                },
                (token, tokenSecret, profile, callback) => {
                    return callback(null, profile);
                }
            )
        );

        passport.serializeUser((user, cb) => {
            cb(null, user);
        });
        passport.deserializeUser((obj, cb) => {
            cb(null.obj);
        });
        routesPath(app, __dirname, db);

        let server = http.createServer(app);

        reload(app)
            .then((reloadReturned) => {
                server.listen(app.get("port"), () => {
                    console.log("server listening on port" + app.get("port"));
                });
            })
            .catch((err) => {
                console.log("error");
            });
    }
);