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

var app=dialogflow();

app.intent('Create SR',(conv,params)=>{
	
	
	console.log('Value passed from google1: '+params.accountName);
	console.log('Value passed from google2: '+params.typeOfSupply);
	console.log('Value passed from google3: '+params.department);
	
	var conn = new jsforce.Connection({ 
		loginUrl: 'https://test.salesforce.com'
	}); 
	
	
	return new Promise((resolve,reject)=>{
		conn.login('patgupta@deloitte.com.fe.cloudip', 'fastEnergy@1qyFizCvlsQ93TRhOtDzhDErSH', function(err, res){
			if(err){
				console.log(err);
			}
			else{
				console.log(conn.accessToken);
				console.log(conn.instanceUrl);
				//Single case record creation
				conn.sobject("Case").create({ 
					AccountId : '0015C00000NIcDDQA1', 
					Status : 'New' ,
					FE_Department__c : params.department,
					FE_Type_of_supply__c : params.typeOfSupply 
				},
				function(err, ret){
					if (err || !ret.success){ 
						reject(err);
						return console.error(err, ret);
					}
					console.log("Created record id : " + ret.id);
					resolve('success');
					conv.ask(new SimpleResponse({speech:"A new service request has been created.",text:"A new service request has been created."}));
					
					conv.ask(new BasicCard({
						text: "Case has been created.",
						image: new Image({
							url: "http://www.fastenergy.co.ke/images/FAST.jpg",
							alt: "Fast Energy",
						}),
						title: "Case Number : 00001538",
						formattedText : "Type of Supply : Gas , Department : Billing"
					}));
					
					
					
				});
			}
		});
	});
	
	
	
});


var port = process.env.PORT || 3000;


server.get('/',(req,res)=>{res.send('Hello World!');});
server.post('/fulfillment',app);



server.listen(port, function () {
	console.log('port',port);
    console.log("Server is up and running...");
});
