
var status={
	ok:200,
	error:500
};

var content_types={
	"html":{"Content-Type": "text/html"},
	"json":{"Content-Type": "application.json"}
};

var mapping={
	'/':{'name':'home','content_type':'html'},
	'/home':{'name':'home','content_type':'html'},
	'/messages':{'name':'messages','content_type':'json'}
};

var Header=function(){
	this.currentStatus=200;
	this.currentContentType=content_types.html;

	this.setStatus=function(name){
		this.currentStatus=status[name];
	};

};



module.exports.mapping=mapping;
module.exports.Header=Header;

