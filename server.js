var server = require('webserver').create(),
	system = require('system'),
	fs     = require('fs'),
	port   = system.env.PORT || 8080;

var service = server.listen(port, function(request, response) {

	if(request.method == 'GET' && request.post.url){
		var url = request.post.url;

		request_page(url, function(htmlContents){
			response.statusCode = 200;
			response.write(htmlContents);
			response.close();
		})

	}

});

if(service) console.log("server started - http://localhost:" + server.port);

function request_page(url, callback){

	var page = new WebPage();
	page.clipRect = { top: 0, left: 0, width: 700, height: 400 };
	page.viewportSize = { width: 700, height: 400 };

	page.onLoadStarted = function () {
		console.log('loading:' + url);
	};

	page.onLoadFinished = function (status) {
		console.log('loaded:' + url);

		setTimeout(function(){

			callback(page.content);

			page.close();
		},100)
	};

	page.open(url);
}
