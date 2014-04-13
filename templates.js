var fs = require('fs');
var folder=process.cwd()+'/templates/';
var encoding='utf8';



function main(name){
	try{
		console.log("reading ..." + folder+name);
		return fs.readFileSync(folder+name,encoding);
	}
	catch(ex){
		return undefined;
	}
};
module.exports=main;


