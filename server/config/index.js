var username = "ledzeper";
var password = "xsRr9yMw6U3K6vMa";
var databaseName = "Programming_Documents";
var hosting = "ps537705.dreamhostps.com:27017";

module.exports = {
	"username": username,
	"password": password,
	"databaseName": databaseName,
	"hosting": hosting,
    "database": "mongodb://"+ username +":"+ password +"@"+ hosting +"/"+ databaseName,
    "port": process.env.PORT || 8123,
    "secretKey": "YourSecreKey"
};
