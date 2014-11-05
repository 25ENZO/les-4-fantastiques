var fs = require('fs');

var myArgs = process.argv.slice(1);

var input = [];

var symb = ["START_POI","","name:","latlng:",";","note:","END_POI","$$"];

fs.readFile(myArgs[1], 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  input = data.split(/\s/);
  console.log(input);
  listPoi();
});

// Operand

function err(){
	console.log("Parsing Error ! on "+input[0]);
	process.exit(0);
}

function next(){
	var curS = input.shift();
	console.log(curS);
	return curS
}

function accept(){
	if(symb.indexOf(input[0]) >= 0){
		return true;	
	}
	return false;
}

function expect(s){
	if(s == next()){
		console.log("Reckognized! "+s)
		return true;
	}else{
		err();
	}
	return false;
}


// Règles

function listPoi(){
	
	while(poi()){
		
	}
	
	expect("$$");
}

function poi(){

	if(accept()){
		expect("START_POI");
		expect("");
		body();
		expect("");
		expect("END_POI");
		expect("");
		return true;
	}else{
		err();
		return false;
	}

}

function body(){
	name();
	expect("");
	latlng();
}

function name(){
	expect("name:")
	var curS = next();
	if(curS.match(/[\w\s]+/i)){
		return true;
	}else{
		err();
	}
}

function latlng(){
	expect("latlng:")
	var curS = next();
	if(curS.match(/-?\d+(\.\d+)?;-?\d+(\.\d+)?/)){
		return true;
	}else{
		err();
	}
}
