const { Router } = require("express");
const landmet = require("../models/landmets");
const asteroid = require("../models/asteroids");
const router = Router();
const http = require("http");
const url = require("url");
const { performance } = require('perf_hooks');

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/landmet", async (req, res) => {
    res.render("landmet");
});

router.get("/service/query", async (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    let queryFilter = {};
    if (queryObject.object === "meteorite") {
        if (!queryObject.recclass) {
            delete queryObject.recclass;
        } else {
            queryFilter.recclass = queryObject.recclass;
        }
        if (!queryObject.fromYear) {
            delete queryObject.fromYear;
        } else {
            if (typeof queryFilter.year == "undefined") {
                queryFilter.year = {};
            }
            queryFilter.year["$gte"] = parseInt(queryObject.fromYear);
        }
        if (!queryObject.toYear) {
            delete queryObject.toYear;
        } else {
            if (typeof queryFilter.year == "undefined") {
                queryFilter.year = {};
            }
            queryFilter.year["$lte"] = parseInt(queryObject.toYear);
        }
        if (!queryObject.fromMass) {
            delete queryObject.fromMass;
        } else {
            if (typeof queryFilter.mass == "undefined") {
                queryFilter.mass = {};
            }
            queryFilter.mass["$gte"] = parseFloat(queryObject.fromMass);
        }
        if (!queryObject.toMass) {
            delete queryObject.toMass;
        } else {
            if (typeof queryFilter.mass == "undefined") {
                queryFilter.mass = {};
            }
            queryFilter.mass["$lte"] = parseFloat(queryObject.toMass);
        }
        const landmets = await landmet.find(queryFilter).limit(5000).lean();
        res.jsonp(landmets);
    } else if (queryObject.object === "asteroid") {
        if (
            !queryObject.isDangerous ||
            queryObject.isDangerous === "???? ??????????"
        ) {
            delete queryObject.isDangerous;
        } else {
            queryFilter.pha = queryObject.isDangerous === "????" ? "Y" : "N";
        }
        if (!queryObject.fromDiameter) {
            delete queryObject.fromDiameter;
        } else {
            if (typeof queryFilter.diameter == "undefined") {
                queryFilter.diameter = {};
            }
            queryFilter.diameter["$gte"] = parseFloat(queryObject.fromDiameter);
        }
        if (!queryObject.toDiameter) {
            delete queryObject.toDiameter;
        } else {
            if (typeof queryFilter.diameter == "undefined") {
                queryFilter.diameter = {};
            }
            queryFilter.diameter["$lte"] = parseFloat(queryObject.toDiameter);
        }
        const asteroids = await asteroid.find(queryFilter).limit(3000).lean();
        res.jsonp(asteroids);
    }
});

router.get("/service/chart", async (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    let queryFilter = {};
    if (!queryObject.recclass) {
        delete queryObject.recclass;
    } else {
        queryFilter.recclass = queryObject.recclass;
    }
    if (!queryObject.fromYear) {
        delete queryObject.fromYear;
    } else {
        if (typeof queryFilter.year == "undefined") {
            queryFilter.year = {};
        }
        queryFilter.year["$gte"] = parseInt(queryObject.fromYear);
    }
    if (!queryObject.toYear) {
        delete queryObject.toYear;
    } else {
        if (typeof queryFilter.year == "undefined") {
            queryFilter.year = {};
        }
        queryFilter.year["$lte"] = parseInt(queryObject.toYear);
    }
    if (!queryObject.fromMass) {
        delete queryObject.fromMass;
    } else {
        if (typeof queryFilter.mass == "undefined") {
            queryFilter.mass = {};
        }
        queryFilter.mass["$gte"] = parseFloat(queryObject.fromMass);
    }
    if (!queryObject.toMass) {
        delete queryObject.toMass;
    } else {
        if (typeof queryFilter.mass == "undefined") {
            queryFilter.mass = {};
        }
        queryFilter.mass["$lte"] = parseFloat(queryObject.toMass);
    }
    const landmets = await landmet.find(queryFilter).lean();
    let minX = 2021;
    let points = [];
    let oy = new Array(2021);
    for (let i = 0; i < landmets.length; i++) {
        if (landmets[i].year) {
            if (!oy[landmets[i].year]) {
                oy[landmets[i].year] = 0;
            }
            oy[landmets[i].year] = oy[landmets[i].year] + 1;
            minX = landmets[i].year < minX ? landmets[i].year : minX;
        }
    }
    let num1 = 0;
    for (let i = 0; i < oy.length; i++) {
        if (oy[i]) {
            points[num1] = { x: i, y: oy[i] };
            num1++;
        }
    }
    res.jsonp({ points: points, minX: minX });
});

router.get("/NEO", async (req, res) => {
    res.render("NEO");
});

router.get("/MKS", async (req, res) => {
    res.render("MKS");
});

router.post("/service/import", async (req, res) => {
    console.log("service/import")
    console.log(req.body)


    landmet.deleteMany({}, function(err, result){
        if (err) {
            console.log("??????????1", err)
        } else {
            console.log("????????????1")
            landmet.insertMany(req.body["landmets"], function(err,result) {
                if (err) {
                    console.log("??????????2", err)
                } else {
                    console.log("????????????2")
                    res.jsonp({"ok":"ok"});
                }
            });
        }
    })

    asteroid.deleteMany({}, function(err, result){
        if (err) {
            console.log("??????????3", err)
        } else {
            console.log("????????????4")
            asteroid.insertMany(req.body["asteroids"], function(err,result) {
                if (err) {
                    console.log("??????????5", err)
                } else {
                    console.log("????????????6")
                }
            });
        }
    })
})


router.post("/service/add_one", async (req, res) => {
    console.log("service/add_one")
    console.log(req.body)
    landmet.insertMany(req.body, function(err,result) {
        if (err) {
            console.log("??????????2", err)
        } else {
            console.log("????????????2")
            res.jsonp({"ok":"ok"});
        }
    });
})



router.get("/service/export", async (req, res) => {
    console.log("service/export")

    landmet.find({}, function(err, result){
        if (err) {
            console.log("??????????", err)
        } else {
            console.log("????????????")
            var resultLandmets = result
            asteroid.find({}, function(err, result){
                if (err) {
                    console.log("??????????2", err)
                    res.jsonp(JSON.stringify({"landmets": resultLandmets}));
                }
                else {
                    console.log("????????????2")
                    res.jsonp(JSON.stringify({"landmets": resultLandmets, "asteroids": result}));
                }
            })
            //res.jsonp(JSON.stringify(result));
        }
    })
    

})

router.get("/service/execute_test", async (req, res) => {
    console.log("service/execute_test")
    testIter(res, 1, [])

})

function testIter(res, iter, times){
    time1 = performance.now()
    if (iter == 20){
        landmet.find({"name":"Zulu Queen"}, function(err, result){
            if (err) {
                console.log("??????????", err)
            } else {
                time2 = performance.now()
                diff = time2-time1
                times.push(diff)
                avg = times.map(i=>x+=i, x=0).reverse()[0]/20
                landmet.collection.stats(function(err, result){
                    res.jsonp(JSON.stringify({"size": result["size"], "avg_query_time": avg}));
                })
            }
        })
    }
    else {
        landmet.find({"name":"Zulu Queen"}, function(err, result){
            if (err) {
                console.log("??????????", err)
            } else {
                time2 = performance.now()
                diff = time2-time1
                times.push(diff)
                testIter(res, iter+1, times) 
    
            }
        })
    }
}
module.exports = router;
