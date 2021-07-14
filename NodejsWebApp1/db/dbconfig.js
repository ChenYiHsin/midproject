
var mysql = require("mysql");

module.exports = {
    config: {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "goodcart",
    },

    _connect(sql, prams, cb) {
        let myConnection = mysql.createConnection(this.config);
        myConnetion.connect();
        myConnection.query(sql, params, cb);
        myConnection.end();
    },
    _connection(sql, params, cb){
    let pool = mysql.createPool(this.config);
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(error);
        }
        conn.query(sql, params, cb);
        pool.release.Connection(conn);
        })
    }
}