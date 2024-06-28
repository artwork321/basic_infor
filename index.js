var http = require('http');
var fs = require('fs');
const url = require("url");


http.createServer(function (req, res) {

    // Create a path to find the html page in server
    const q = url.parse(req.url, true);
    let pagename = "";

    if (q.pathname == "/") {
        pagename = "./" + "index.html";
    }
    else {
        pagename = "." + q.pathname;
    }
    console.log("Debug: " + pagename);

    // Read path and response with the html file
    fs.readFile(pagename, function (err, data) {
        if (err) {
            fs.readFile("404.html", function (err404, data404) {
                if (err404) throw err;

                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(data404); // read 404.html file
                return res.end();

            })
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);