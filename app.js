// dependencies

const express = require('express');
const http = require('https');
const bodyParser=require('body-parser');
const jsforce = require('jsforce'); 
const server = express();



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
	
	
	console.log('Value passed from google1: '+params.accountName);
	console.log('Value passed from google2: '+params.typeOfSupply);
	console.log('Value passed from google3: '+params.department);
	
	
	/*var conn = new jsforce.Connection({ 
    loginUrl: 'https://test.salesforce.com'
}); 

conn.login('patgupta@deloitte.com.fe.cloudip', 'fastEnergy@1qyFizCvlsQ93TRhOtDzhDErSH', function(err, res){
			if(err){
				//reject(err);
				//return console.error(err);
				console.log(err);
			}
		
				
			 console.log(conn.accessToken);
              console.log(conn.instanceUrl);
	conv.ask(new SimpleResponse({speech:"A new service request has been created.",text:"A new service request has been created."})); 
	
			
		});
	});*/

conv.ask(new SimpleResponse({speech:"A new service request has been created.",text:"A new service request has been created."})); 

var port = process.env.PORT || 3000;


server.get('/',(req,res)=>{res.send('Hello World!');});
server.post('/fulfillment',app);



server.listen(port, function () {
	console.log('port',port);
    console.log("Server is up and running...");
});
