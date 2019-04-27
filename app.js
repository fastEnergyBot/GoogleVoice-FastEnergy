// dependencies

const express = require('express');
const http = require('https');
const bodyParser=require('body-parser');
const jsforce = require('jsforce'); 
const server = express();


var conn = new jsforce.Connection({ 
    loginUrl: 'https://test.salesforce.com', 
    version: '45.0' 
}); 
const {
    dialogflow,
    SignIn,
    SimpleResponse,
    Image,
    Suggestions,
    BasicCard
  } = require('actions-on-google');


server.use(bodyParser.json());
// create serve and configure it.


//var app = dialogflow({clientId: '340099036889-ol3tcgb0c06poa9p6j6ijpudo7osel2j.apps.googleusercontent.com'});
var app=dialogflow();

app.intent('Create SR',(conv,params)=>{
	
	
	console.log('Value passed from google1'+params.accountName);
	console.log('Value passed from google2'+params.typeOfSupply);
	console.log('Value passed from google3'+params.department);
	
	conv.ask(new SimpleResponse({speech:"This is a test.",text:"This is a test."}));
	
	//conv.ask(new SimpleResponse({speech:"A new service request has been created.",text:"A new service request has been created."}));
	
	/*conn.login(process.env.username, process.env.pass, function(err, res){
		if(err){
			
			console.log(err);
		}
		else{
			
			//Single case record creation
			conn.sobject("Case").create({ 
				AccountId : '0015C00000NIcDDQA1', 
				Status : 'New' ,
				FE_Department__c : params.department,
				FE_Type_of_supply__c : params.typeOfSupply 
			},
			function(err, ret){
				if (err || !ret.success){ 
					
					return console.error(err, ret);
				}
				console.log("Created record id : " + ret.id);
				
				conv.ask(new SimpleResponse({speech:"A new service request has been created.",text:"A new service request has been created."}));
			});
		}
	});*/
		
		
	
});


var port = process.env.PORT || 3000;


server.get('/',(req,res)=>{res.send('Hello World!');});
server.post('/fulfillment',app);



server.listen(port, function () {
	console.log('port',port);
    console.log("Server is up and running...");
});
