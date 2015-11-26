/************************ API Route Definitions ************/
var apiGetRoutes = {
    stats_donated : "/statistics/donated",
    stats_served : "/statistics/served",
    stats_avail : "/statistics/available_all",
    stats_partners : "/statistics/num_partners",
    partners_avail : "/partners/available/:bname"
};

var apiPostRoutes = {
    register_business : "/register/business",
    stories_submit : "/stories/submit",
    tablet_donate : "/tablet/donation",
    tablet_claim : "/tablet/claim"
};

var apiDeleteRoutes = {};

module.exports.apiGetRoutes = apiGetRoutes;
module.exports.apiPostRoutes = apiPostRoutes;
module.exports.apiDeleteRoutes = apiDeleteRoutes;
