
var express = require("express");
var db = require("../db/dbconfig.js");
var _router = express.router()

module.exports = _router;
_router.route("/register")
    .post(function (req, res) {
        let user = request.body;
        let values = [user.username, user.pwd];
        console.log(values)
        let sql = "INSERT INTO table user(uname, upwd) VALUE(?,?); ";
        let cb = function(err, data, fields){
            if(err) {
                response.json({
                    "status": 200,
                    "message": "���U���\",
                    "data":[]
                })
            }else{
            response.json({
                "status": 400,
                "message": "���U����",
                "data": []
                })
            }
        }
        db._connection(sql, values, cb);
    })
_router.post('/login', function (request, response) {
    let user = request.body;
    let values = [user.username, user.pwd];
    let sql = 'select uid from `t_user` where uname=? and upwd=?';
    let cb = function (error, data, fields) {
        if (!error & data.length == 1) {
            response.json({
                "status": 200,
                "msg": "�n�����\",
                "data": data
            })

        } else {
            response.json({
                "status": 400,
                "msg": "�n������",
                "data": data
            })
        }
    }
    db._connetion(sql, values, cb);
})