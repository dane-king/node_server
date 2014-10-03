var http = require("http");
var templates=require("./templates/read_file");
var setting=require("./config/server_setup");

var errorPage='<h1>Error<h1>';


function parseUrl(url){
  var current_url;
  if (url instanceof Array){
    for(var current_url in url) break;  
  }else{
    current_url=url;
  }
  return current_url;
}
function getPageMap(url){
  console.log("getting page map for " + url)
  var map=setting.mapping[url];
  if(typeof map =="undefined"){
    return {};
  }

  var pageName=(typeof map.name=='undefined'?"":map.name);
  var pageContentType=(typeof map.content_type=='undefined'?"":map.content_type);

  pageMap={
    name: pageName,
    template_name :pageName + "." + pageContentType,
    content_type:pageContentType
  };

  return pageMap;
}

function handle(request,response){
 //handle annoying favicon requests
 if (request.url === '/favicon.ico') {
  response.writeHead(200, {'Content-Type': 'image/x-icon'} );
  response.end();
  console.log('favicon requested');
  return;
}
//if we aren't set up to handle
var pageMap=getPageMap(parseUrl(request.url));
if(typeof pageMap =="undefined" || typeof pageMap.template_name == "undefined" ){
  console.log("not handling....");
  response.end();
  return;
}
var body=createBody(request, pageMap.template_name);

var header=createHeader(pageMap, body===errorPage);
writeOutput(response,header,body);
};

function createBody(request, template_name){
  var body;
  try{
    body=templates(template_name);
    body=body.replace(/{@host}/g,"http://"+ request.headers.host);
  }catch(ex){
    console.log(ex);
    body = errorPage;
  };
  return body
};

function templateName(pageMap){
  return (pageMap.name + "." + pageMap.content_type);
};



function createHeader(pageMap, isErrorPage){
  var header=new setting.Header();
  header.currentContentType=pageMap["content_type"];
  if(isErrorPage){
    header.setStatus("error");
  };
  
  return header;
};

function writeOutput(response, header, body){
  response.writeHead(header.currentStatus, header.currentContentType);
  response.end(body);
};


http.createServer(handle).listen(8888);
console.log("listening on port 8888");
