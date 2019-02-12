const express = require('express');

const app = express();

const user = require("./user");

const bodyParser = require('body-parser')

app.use(bodyParser.json());

const cors = require('cors')

const service=require('./service')

app.use(cors())

var server_port = process.env.YOUR_PORT || process.env.PORT || 8000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port || server_host, () => {
    console.log(`server is started`);
})

const db = "mongodb://chetan:chetan123@ds023105.mlab.com:23105/banking_curd";

const mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error!" + err)
    } else {
        console.log("connected with mlab")
    }

})

app.post('/addUser', (req, res) => {
    console.log("in add method");
    console.log(req.body);
    user.find({ Id: req.body.id }, (err, data) => {
        if (err) {
            res.send({ "sms": err })
        }
        else if (JSON.stringify(data) == '[]') {
            const a = new user();
            a.Id = req.body.id;
            a.Name=req.body.name;
            a.Email = req.body.email;
            a.Password = service.createPassword(req.body.password);
            a.City = req.body.city;
            a.save((err, data) => {
                if (err) {
                    console.log("error" + err);
                    res.send({ "err": err });
                }
                else {
                    console.log("inserted" + data);
                    res.send({ "sms": "inserted" });
                }
            })
        }
        else {
            console.log("same id found");
            res.send({ "sms": "same id found" })
        }
    })
})

app.post("/getAll", (req, res) => {
    console.log("in get call method");
    user.find({}, (err, data) => {
        if (err) {
            console.log("error" + err)
            res.send({ "err": err })
        }
        else {
            console.log("find all" + data);
            res.send({ "data": data });
        }
    })

})


app.post("/findbyid/Id", (req, res) => {
    console.log("in findbyid method");
    console.log("id is " + req.body.id);
    user.find({ Id: req.body.id }, (err, data) => {
        if (err) {
            console.log("error" + err);
            res.send({ "error": err })
        }
        else {
            console.log("find" + data)
            res.send({ "user": data });
        }
    })

})

app.post("/delete", (req, res) => {
    console.log("in delete function");
    console.log("id is " + req.body.id);
    user.findOneAndRemove({ Id: req.body.id }, (err, data) => {
        if (err) {
            console.log("error" + err);
            res.send({ "err": err });
        }
        else {
            console.log("deleted" + data);
            res.send({ "msg": data.Id + " deleted" });
        }
    })
})

app.post("/searchbycity", (req, res) => {
    console.log("in search method");
    console.log("city is " + req.body.city);
    user.find({ City: req.body.city }, (err, data) => {
        if (err) {
            console.log("error" + err);
            res.send({ "err": err })
        }
        else {
            console.log("searched" + data);
            res.send({ "sms": "searched", "data": data })
        }
    })
})


app.get("/",(req,res)=>{
    res.send("hye its working")
})