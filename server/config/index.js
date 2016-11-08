var username = "ledzeper";
var password = "LA4j6hSV5mcj";
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
