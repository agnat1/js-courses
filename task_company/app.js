var express = require('express');
var app = express();
var router = express.Router();
var swig = require('swig');

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);

swig.setDefaults({ cache: false });

var companies = require('./data/data.json');

router.get('/company', function(req, res){
    var start = parseInt(req.query.from);
    start = (!isNaN(start) && start >= 0) ? start : 0;
    var count = parseInt(req.query.count);
    count = (!isNaN(count) && count > 0) ? count : companies.length;
    var companies_to_display = companies.slice(start, start + count);

    var obj = {
        'title': 'Company list',
        'uri': req.baseUrl,
        'companies': companies_to_display
    };

    console.log(obj.uri);
    res.status(200).render('company_list', obj);
});

router.get('/company/:id', function(req, res, next){
    var company = null;
    for(var i in companies){
        if(companies[i]._id == req.params.id){
            company = companies[i];
            break;
        }
    }
    if(!!company){
        var obj = {
            'title': company.company,
            'company': company
        };
        res.status(200).render('company', obj);
    }else{
        var e = new Error();
        e.status = 500;
        next(e);
    }
});

app.use(express.static('public'));

app.use(router);

app.use(function(req, res, next){
    res.status(404).send("Page you're looking for is not here :(");
});

app.use(function(err, req, res, next){
    var status = (!!err.status) ? err.status : 500;
    var msg = "";
    if(status == 404){
        msg = "Page you're looking for is not here :(";
    }else if(status == 500){
        msg = "Ooops! Something went wrong :(";
    }
    res.status(status).send(msg);
});

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});