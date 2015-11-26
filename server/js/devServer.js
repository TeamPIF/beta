/************************ Packages ************************/
var express = require("express");               // express package
var mysql = require("mysql");                   // mysql driver for node.js
var cors = require("express-cors");             // cors package for express
var bparser = require("body-parser");           // for parsing POST requests
var routes = require("./routes.js");            // pre-defined routes
var queries = require("./queries.js");          // pre-defined queries per route
var utils = require("./utils.js");              // custom utility functions

/************************ App and Routers *****************/
var app = express();
app.use(cors({
    allowedOrigins : ["*"]
}));
var apiRouter = express.Router();
app.use("/api", apiRouter);
var port = 8070;
app.use(bparser.json());
app.use(bparser.urlencoded({
    extended : true
}));

/************************ MySQL Connection Config *********/
var pool = mysql.createPool({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "******",
    database : "pifDev"
});
// pool.connectWrapper = function(query, queryHandler) {
//     var resultSet;
//     pool.getConnection(function(err, connection) {
//         if (err) throw err;
//         connection.query(query, function(err, rows) {
//             if (err) throw err;
//             resultSet = queryHandler(rows);
//         });
//     });
//     return resultSet;
// }

/*********************** Testing **************************/
apiRouter.get("/test", function(req, res) {
    var testList = [
        queries.apiGetQueries.stats_donated(),
        queries.apiGetQueries.stats_served(),
        queries.apiGetQueries.stats_avail(),
        queries.apiGetQueries.stats_partners(),
        queries.apiGetQueries.partners_avail(
            pool.escape(
                utils.processName("Dick's_Barn_Yard")
            )
        )
    ];
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        testList.forEach(function(query) {
            connection.query(query, function(err, rows) {
                if (err) console.log(err);
                var result = { query : query, result : rows };
                console.log(result);
            });
        });
        connection.release();
    });
    res.json({ status : 200 });
});

/*********************** Statistics ***********************/
// Total number of donations
apiRouter.get(routes.apiGetRoutes.stats_donated, function(req, res){
    var query = queries.apiGetQueries.stats_donated();
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows) {
            if (err) throw err;
            res.json({ query : query, result : rows[0].donations });
        });
        connection.release();
    });
    // res.json({ query : query });
});

// Total number of meals served
apiRouter.get(routes.apiGetRoutes.stats_served, function(req, res){
    var query = queries.apiGetQueries.stats_served();
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows) {
            if (err) throw err;
            res.json({ query : query, result : rows[0].claims });
        });
        connection.release();
    });
    res.json({ query : query });
});

// Total number of meals available
apiRouter.get(routes.apiGetRoutes.stats_avail, function(req, res){
    var query = queries.apiGetQueries.stats_avail();
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows) {
            if (err) throw err;
            console.log(rows);
            res.json({ query : query, result : rows[0].available });
        });
        connection.release();
    });
    // res.json({ query : query });
});

// Total number of partners
apiRouter.get(routes.apiGetRoutes.stats_partners, function(req, res){
    var query = queries.apiGetQueries.stats_partners();
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows) {
            if (err) throw err;
            res.json({ query : query, result : rows[0].partners });
        });
        connection.release();
    });
    // res.json({ query : query });
});

/*********************** Partners *************************/
// Total number of meals available for given partner
apiRouter.get(routes.apiGetRoutes.partners_avail, function(req, res){
    var query = queries.apiGetQueries.partners_avail(
        pool.escape(
            utils.processName(req.params.bname)
        )
    );
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows) {
            if (err) throw err;
            res.json({ query : query, result : rows[0].available });
        });
        connection.release();
    });
    // res.json({ query : query });
});

/*********************** Register *************************/
// Register partner into database
apiRouter.post(routes.apiPostRoutes.register_business, function(req, res){
    var name = req.body.name,
        address = req.body.address,
        email = req.body.email,
        password = req.body.password, // add in password hashing for security later
        query1 = queries.apiPostQueries.register_business(name, address);
    pool.getConnection(function(err, connection) {
        var bid;
        connection.query(query1, function(err, rows) {
            //TODO -- bid = ?
        });
        var query2 = queries.apiPostQueries.register_creds(bid, email, password);
        connection.query(query2, function(err, rows) {
            //TODO
        });
        connection.release();
    });
});

/*********************** Stories **************************/
// Submit a story to the database
apiRouter.post(routes.apiPostRoutes.stories_submit, function(req, res){
    var name = req.body.name,
        message = req.body.message;
    var query = queries.apiPostQueries.stories_submit(name, message);
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, rows) {
            if (err) throw err;
            //TODO
        });
        connection.release();
    });
});

/*********************** Tablet ***************************/
/**************** SEE QUERIES.JS FOR ISSUES ***************/
// // Submit a donation
// apiRouter.post(routes.apiPostRoutes.tablet_donate, function(req, res){
//     var bname = req.body.bname,
//         dname = req.body.dname;
//     var query = queries.apiPostQueries.stories_submit(bname, dname);
//     pool.connectWrapper(query, function(row) {
//         //TODO
//     });
// });
//
// // Receive a claim
// apiRouter.post(routes.apiPostRoutes.tablet_claim, function(req, res){
//     pool.getConnection(function(err, connection) {
//         connection.query(query, function(err, rows) {
//
//         });
//     });
// });

/*********************** Main *****************************/
app.listen(port);
