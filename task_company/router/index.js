var express = require('express');
var router = express.Router();

router.get('/company', function(req, res){
    var companies_to_display = companies;
    if(!!req.query.q){
        companies_to_display = companies_to_display.filter(function(element){
            return element.company.toLowerCase().indexOf(req.query.q.toLowerCase()) > -1;
        });
    }
    var start = parseInt(req.query.from);
    start = (!isNaN(start) && start >= 0) ? start : 0;
    var count = parseInt(req.query.count);
    count = (!isNaN(count) && count > 0) ? count : companies_to_display.length;
    companies_to_display = companies_to_display.slice(start, start + count);

    var obj = {
        'title': 'Company list',
        'uri': req.baseUrl,
        'companies': companies_to_display
    };

    if(!!req.query.ajax){
        var search_result = companies_to_display.map(function(elem){
            return {id: elem._id, str: elem.company};
        });
        res.status(200).json(search_result)
    }else{
        res.status(200).render('company_list', obj);
    }
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

module.exports = router;