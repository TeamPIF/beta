var mysql = require("mysql");

/************************ API Prepared Statements *********/
var apiStatsSQL      = "SELECT COUNT(*) AS ?? FROM ??";
var apiStatsSQLWhere = apiStatsSQL + " WHERE ?? = (??)";
var apiSubtractSQL   = "SELECT (??) - (??) AS ??"
var apiGetSQL        = "SELECT ?? FROM ?? WHERE ?? = ??";
var apiPostSQL       = "INSERT INTO ?? ?? VALUES ??";
var sep              = ", ";

/************************ API Query Definitions ***********/
var apiGetQueries = {
    stats_donated : function () {
        return mysql.format(apiStatsSQL, ['donations', 'Donation']);
    },
    stats_served : function () {
        return mysql.format(apiStatsSQL, ['claims', 'Claim']);
    },
    stats_avail : function () {
        // return mysql.format(apiSubtractSQL, [
        //     mysql.format(apiStatsSQL, ['donations', 'Donation']),
        //     mysql.format(apiStatsSQL, ['claims', 'Claim']),
        //     'available'
        // ]);
        /******************* Using until figure out issue with query above ******************/
        return "SELECT (SELECT COUNT(*) FROM Donation) - (SELECT COUNT(*) FROM Claim) AS available";
    },
    stats_partners : function() {
        return mysql.format(apiStatsSQL, ['partners', 'Business']);
    },
    partners_avail : function(bname) {
        // return mysql.format(apiStatsSQLWhere, ['donations', 'Donation', 'business_id',
        // mysql.format(apiGetSQL, ['id', 'Business', 'name', bname])
        // ]);
        /******************* Using until figure out issue with query above ******************/
        return "SELECT COUNT(*) AS available FROM Donation WHERE business_id = (SELECT id FROM Business WHERE name = " + bname + ")";
    }
};

var apiPostQueries = {
    register_business : function(name, address) {
        var values = "(" + name + sep + address + ")";
        return mysql.format(apiPostSQL, ["Business", "(name, address)", values]);
    },
    register_creds : function(bid, email, password) {
        var values = "(" + bid + sep + email + sep + password + ")";
        return mysql.format(apiPostSQL, ["Credentials", "(business_id, email, password)", values]);
    },
    stories_submit : function(name, message) {
        var values = "(" + name + sep + message + ")";
        return mysql.format(apiPostSQL, ["Thank_You", "(name, message)", values]);
    }
    /*************** FIX THIS ISSUE. CLIENT WILL SEND BUSINESS NAME AND DONOR NAME,
                     SERVER NEEDS TO GET BUSINESS ID AND DONOR ID ****************/
    // tablet_donate : function(bname, dname) {
    //     var values = "(" + bname + sep + dname + ")";
    //     return mysql.format(apiPostSQL, ["Donation", "(business_id, donor_id)", values]);
    // },
    // tablet_claim : function(bname) {
    //     var values = "(" + bname + ")";
    //     return mysql.format(apiPostSQL, ["Claim", "(business_id)", values]);
    // }
};

module.exports.apiGetQueries = apiGetQueries;
module.exports.apiPostQueries = apiPostQueries;
