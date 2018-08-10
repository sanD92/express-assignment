
const express = require('express');
const RequestApprover = require('../models/request-approver');
const AccessToken = require('../models/access-token');
const RegisterServices = require('../models/request-services');
const ServiceDetails = require('../models/service-details');
const router = express.Router();
var Rx = require('rxjs');
let subject = new Rx.Subject();

serviceArrayObejct = {};
// =[{name:'sandip',roll:'11'},{name:'RAM',roll:'12'}];

//pre=JSON.stringify(serviceArrayObejct);
/* router.get('/',function(req,res,next){
    res.render('index');
}); */

console.log('Object is ...', serviceArrayObejct);

router.post('/register', function (req, res, next) {

    //console.log(req.statusCode);
    /*   console.log('res status code',res.statusCode);
      console.log('response status message',res.statusMessage); */
    console.log('req params', req.params)
    console.log('Request Body', req.body);
    console.log('name ', req.body.name)
    reqObj = {
        request: {
            name: req.body.name,
            Designation: req.body.designation,
            role: req.body.role
        }
    }
    console.log('request object is', reqObj);
    RequestApprover.create(reqObj).then(function (reg) {
        /*      res.status(200).json({
                 message: 'Welcome to the project-name api'
             }); */

        console.log('reg Json', reg);
        var a = Math.random().toString(36).slice(2);
        //console.log(a.toUpperCase())
        /*  console.log('status code', req.status());
         console.log('message', req.statusMessage); */
        //res.send(reg);
        obj = {
            result:
                {
                    name: reg.request.name,
                    //req.body.name, 
                    //reg.request[0].name,
                    accessToken: a.toUpperCase()
                }
            ,
            status: {
                code: res.statusCode,
                message: 'Succesfully registered the approvers'
            }
        }

        console.log('Json Object is ', obj)

        AccessToken.create(obj).then(function (response) {
            //res.send(response);
            //res.redirect(req.originalUrl);
            // res.redirect(req.get('../'));
            console.log('access token added to db')
            res.redirect('back');

        }).catch(next);


    }).catch(next);


});

// code for register services
router.post('/services', function (req, res, next) {

    console.log('Request Body from services', req.body);
    ServiceObj = {
        request: {
            name: req.body.name,
            approvals: req.body.approvals,
        }
    }
    RegisterServices.create(ServiceObj).then(function (service) {
        var a = Math.random().toString(36).slice(2);
        console.log('service Json', service);
        obj = {
            result:
                {
                    name: service.request.name,
                    //req.body.name, 
                    //reg.request[0].name,
                    serviceId: a.toUpperCase()
                }
            ,
            status: {
                code: res.statusCode,
                message: 'Succesfully registered the approvers'
            }
        }
        console.log('Object from register services', obj);

        ServiceDetails.create(obj).then(function (response) {
            console.log('access token added to db');
            // res.send(response);
            res.redirect('back');

        }).catch(next);
    }).catch(next);

});
/* app.get('/',function(req,res){
    res.render('index');
}); */
router.get('/services', function (req, res, next) {

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //next();
    ServiceDetails.find({}).then(function (services) {
        /*  serviceArrayObejct.push(services); */
        serviceArrayObejct = services;
        console.log('Service array object in get ', serviceArrayObejct)
        // console.log('service object ',serviceArrayObejct.result)
        /*  serviceArrayObejct.forEach(element => {
            serviceArrayObejct=element.result;
             console.log('array service', element.result);
         }); */
        //res.send(services);
        res.redirect('back');
    }).catch(next);
});
router.delete('/services', function (req, res, next) {

    level_1ApproverDetailsObject = [];
    level1Object = {};
    res.send('delete request calling');

    /*    AccessToken.find({}).then(function (token) {
           console.log('token', token);
           token.forEach(function (val, index, arr) {
               console.log('token name', val.result.accessToken);
           });
       }); */

    RequestApprover.find({}).then(function (data) {

        data.forEach(function (val, index, arr) {
            // console.log('Approver details',val.request.name)
            if (val.request.role == 'level 1') {

                AccessToken.find({}).then(function (token) {
                    token.forEach(function (valtok, index, arr) {
                        //console.log('token name', val.result.accessToken);
                        if (valtok.result.name == val.request.name) {
                            level_1ApproverDetailsObject = {
                                name: val.request.name,
                                Designation: val.request.Designation,
                                role: val.request.role,
                                accesstoken: valtok.result.accessToken
                            }
                            subject.next(level_1ApproverDetailsObject);
                            //console.log(level_1ApproverDetailsObject);
                        }

                    });
                });


                /* level_1ApproverDetailsObject = {
                    name: val.request.name,
                    Designation: val.request.Designation,
                    role: val.request.role
                }
                console.log(level_1ApproverDetailsObject); */

            }

        })
        subject.subscribe(args => {
            level1Object = args;
            console.log(level1Object);
        });


    });
    //console.log(level_1ApproverDetailsObject);

});
module.exports = router;