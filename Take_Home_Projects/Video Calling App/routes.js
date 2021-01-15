const path = require("path");
const express = require("express");
const { v4: uuidV4 } = require("uuid");
module.exports = function(app, dir) {
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.route("/").get((req, res) => {
        res.redirect(`/${uuidV4()}`);
    });
    app.get("/:room", (req, res) => {
        res.render("room", { roomId: req.params.room });
    });
};