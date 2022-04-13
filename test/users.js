const EventEmitter = require("events");
const fs = require("fs");
const it = require("mocha").it;
const expect = require("chai").expect;
const config = require("../config/config.json");
const user = require("../test/users.js");
const hitwebservices = require("../API_Framework/hitWebAPI");
//const testData = fs.readFileSync("../test/testcase.json",'utf8');
var testDatafile = require("../test/testcase.json");
var testData = testDatafile.testData;
const MyEmitter = new EventEmitter();
const addcontext = require("mocha")

describe('Webserives Trial Testing', () => {

    console.log("******************************************************");

    MyEmitter.on("testData", (testData) => {
        it("Testing", () => {
            console.log(testData);
            user.getUSers(testData.id);
        });

    });

    function abc(data) {
        it("Testing", function () {
            console.log(data)

            user.getUSers(data.id);
        });
    }

    // it('GET /users', () => {

    //     user.getUSers();
    // });

    for (var eachTestData in testData) {
        if (null != eachTestData) {
            //console.log(testData[eachTestData]);
            //console.log(eachTestData);
            MyEmitter.emit("emitting data", testData[eachTestData])
            MyEmitter.emit("testData", testData[eachTestData]);
            //abc(testData[eachTestData]);
        }
    }




    module.exports.getUSers = function (id) {


        var URL = config.url + config.path + "/" + id + "?access-token=" + config.token;

        const options = {
            method: 'GET'
        }
        var getdata = hitwebservices.getResponse("GET", URL, options);
        console.log(JSON.stringify(getdata, null, 2));

       

    }

});
