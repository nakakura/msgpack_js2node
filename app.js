var msgpack = require('msgpack');
var express = require('express');
var app = express();
app.listen(8888);

app.configure(function(){
    app.use(express.bodyParser());
    app.set('views',__dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(app.router);

});

app.get('/', function (req, res){
    res.render('ajax.ejs');
});

app.post('/ajax', express.bodyParser(), function (req, res){
    var base64String = req['body']['data'];
    var packedData = new Buffer(base64String, 'base64');
    var unpackedData = msgpack.unpack(packedData);
    console.log(unpackedData['type']);
    res.redirect('/');
});