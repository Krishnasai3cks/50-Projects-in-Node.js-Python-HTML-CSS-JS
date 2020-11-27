const { profile } = require("console");
const { query } = require("express");
let fs = require("fs");
const { Session } = require("inspector");
const { session } = require("passport");
let passport = require("passport");
require("passport-twitter");
let shortid = require("shortid");
const colorArray = [
    ["#2ecc71", "#3498db", "#95a5a6", "#9b59b6", "#f1c40f", "#e74c3c", "#34495e"],
];
module.exports = function(app, directory, db) {
    app.get("/", (req, res) => {
        db.collection("voting")
            .find({})
            .toArray((err, data) => {
                if (data) {
                    let newData = data.map((d, i, arr) => {
                        let obj = {
                            _id: d._id,
                            title: d.title,
                            votesObject: d.votesObject,
                        };
                        return obj;
                    });
                    res.render("index", {
                        foo: newData,
                        session: {
                            username: Session["username"],
                            displayName: Session["displayName"],
                        },
                    });
                }
            });
    });
    app.get("/createdpoll", (req, res) => {
        let { title, textBody } = req.query;
        let splittedTextBody;
        let votesObject = {};
        splittedTextBody = textBody.split("\n");
        for (let i in splittedTextBody) {
            splittedTextBody[i] = splittedTextBody[i].replace("\r", "");
            votesObject[splittedTextBody[i]] = 0;
        }
        if (title) {
            votesObject[title] = 1;
        }
        let result = {
            _id: shortid.generate(),
            title,
            votesObject,
            ipAddressArray: [],
        };
        db.collection("voting").insertOne(result);
        res.render("index", {
            foo: [result],
            session: {
                username: Session["username"],
                displayName: Session["displayName"],
            },
        });
    });
    app.get("/polls", (req, res) => {
        let { id } = req.query;
        Session["pollId"] = id;
        if (id) {
            db.collection("voting")
                .find({ _id: id })
                .toArray((err, doc) => {
                    let result = doc[0];
                    let choiceVote = Object.keys(result.votesObject);
                    let votesCount = Object.values(result.votesObject);
                    let foo = {
                        piechart: {
                            labels: choiceVote,
                            dataArray: votesCount,
                            colors: colorArray.slice(0, choiceVote.length)[0],
                        },
                        ...result,
                    };
                    res.render("index", {
                        foo: [foo],
                        session: {
                            username: Session["username"],
                            displayName: Session["displayName"],
                        },
                    });
                });
        } else res.redirect("/");
    });
    app.get("/yourvote", (req, res) => {
        let queryObject = req.query;
        let id = Session["pollId"];
        let updateKey = "votesObject." + queryObject["chosenValue"];
        let incQuery = {};
        incQuery[updateKey] = 1;
        db.collection("voting")
            .find({ _id: id })
            .toArray((err, data) => {
                data = data[0];
                if (data.ipAddressArray.includes(req.ip)) {
                    res.send(
                        `<script>alert("You have already voted"); location.replace("/polls?id=${id}");</script>`
                    );
                } else {
                    db.collection("voting").findOneAndUpdate({ _id: id }, { $inc: incQuery, $push: { ipAddressArray: req.ip } }, { new: false },
                        (err, data) => {
                            err ? console.log("error", err) : res.redirect("/polls?id=" + id);
                        }
                    );
                }
            });
    });
    app.get("/auth/twitter", passport.authenticate("twitter"));
    app.get(
        "/auth/twitter/callback",
        passport.authenticate("twitter", { failureRedirect: "/" }),
        (req, res) => {
            /// res.req.user
            Session["username"] = res.req.user.username;
            Session["displayName"] = res.req.user.displayName;
            res.redirect("/");
        }
    );
    app.get("/newpoll", (req, res) => {
        res.render("newpoll", {
            session: {
                username: Session["username"],
                displayName: Session["displayName"],
            },
        });
    });
    app.get("/allpolls", (req, res) => {
        res.sendFile("./views/allpolls.html", { root: directory });
    });
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};