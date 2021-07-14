var express = require('express');
var db = require('../db/dbconfig.js');
var _router = express.Router();
var mysql = require('mysql');
module.exports = _router;
//?取商品信息接口
_router.route('/getList')
    .get(function (request, response) {
        let values = [];
        let sql = 'select * from good';
        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功讀取物信息",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "讀取物品信息失敗",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })

//?取?物??除商品信息接口
_router.route('/deleteCart')
    .get(function (request, response) {
        let cid = request.query.goodId;
        let values = [cid];

        let sql = "delete from goodcart where gid=?"
        let cb = function (err, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功刪除",
                    "data": []
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "刪除失敗",
                    "data": []
                })
            }
        }
        db._connetion(sql, values, cb);
    })

//?取清空商品信息接口
_router.route('/deleteAllCart')
    .get(function (request, response) {
        let values = [];
        let sql = "delete from goodcart";
        let cb = function (err, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功刪除",
                    "data": []
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "刪除失敗",
                    "data": []
                })
            }
        }
        db._connetion(sql, values, cb);
    })

//?取?物?信息接口
_router.route('/getCartList')
    .get(function (request, response) {
        let uid = request.query.uid;
        let cid = request.query.cid;
        let values = [cid];

        let sql = 'SELECT  goodId,goodName,goodNum,price,gc.`goodqutity` FROM cart c,goodcart gc,good g WHERE c.cid=? AND c.cid=gc.cid AND gc.gid=g.goodId';
        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功讀取物信息",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "讀取物品信息失敗",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);

    })
//?取?物??算接口
_router.route('/getTotal')
    .get(function (request, response) {
        let uid = request.query.uid;
        let cid = request.query.cid;
        let values = [uid, cid];
        console.log(values);
        let sql = 'select *from t_user where uid=?;SELECT  goodId,goodName,price,gc.goodqutity FROM cart c,goodcart gc,good g WHERE c.cid=? AND c.cid=gc.cid AND gc.gid=g.goodId;';
        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功用?及?物?信息",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "?取用?及?物信息失?",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })

//?取商品?情信息接口
_router.route('/getGoodDetailInfo')
    .get(function (request, response) {
        let cid = request.query.goodId;
        let values = [cid];

        let sql = "select * from good where goodId=?"
        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功?取",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "?取失?",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })

//?取?物?加入商品信息接口
_router.route('/saveCartInfo')
    .get(function (request, response) {
        let count = request.query.count;
        let goodId = request.query.goodId;
        let cartId = request.query.cartId;
        let values = [cartId, goodId, count];

        let sql = "INSERT INTO goodcart (cid, gid,goodqutity) VALUES(?,?,?);"
        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功?取",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "?取失?",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })

//?建?物?接口
_router.route('/createC')
    .get(function (request, response) {
        let uId = request.query.uId;
        let cId = request.query.cId;
        let values = [cId, uId];
        console.log(values);
        let sql = " INSERT INTO cart VALUE(?,?);";
        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功?取",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "?取失?",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })

_router.route('/setuid')
    .get(function (request, response) {
        let username = request.query.username;
        let values = [username];
        let sql = " SELECT uid FROM t_user WHERE uname=?;";
        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功?取",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "?取失?",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })

//?取全部商品信息
_router.route('/selectAll')
    .get(function (request, response) {
        let values = [];

        console.log(values);
        let sql = " SELECT Count(*) FROM good;SELECT goodId FROM good;";
        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功?取",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "?取失?",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })
//全部商品加入?物?接口
_router.route('/addAll')
    .get(function (request, response) {
        let gooddata = request.query.gooddata;
        let length = request.query.length;
        let cid = request.query.cid;
        let sql = "";
        for (let i = 0; i < length; i++) {
            sql += selectOne(cid, gooddata[i].goodId)

        }
        let values = [];

        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功?取",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "?取失?",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })

function selectOne(cid, gid) {
    let sql = 'INSERT INTO `goodcart` (`gcid`, `cid`, `gid`, `goodqutity`) VALUES(NULL,' + cid + ',' + gid + ',NULL); '
    return sql;
}

//批量商品加入?物?接口
_router.route('/selectSome')
    .get(function (request, response) {
        let arr1 = request.query.arr1;
        let length = request.query.length;
        let cid = request.query.cid;
        let sql = "";
        for (let i = 0; i < length; i++) {
            sql += selectOne(cid, arr1[i])
        }
        let values = [];

        let cb = function (err, data, fields) {
            if (!err) {
                response.json({
                    "status": 200,
                    "msg": "成功?取",
                    "data": data
                })
            } else {
                response.json({
                    "status": 400,
                    "msg": "?取失?",
                    "data": data
                })
            }
        }
        db._connetion(sql, values, cb);
    })
