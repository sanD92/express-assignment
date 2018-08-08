
const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const registerApprovalSchema =new Schema({
        request :[ {
            name:{
                type:String
            },
            Designation:{
                type:String
            },
            role:{
                type:String
            }
        }]
});
const RegisterApproval =mongoose.model('register-approver',registerApprovalSchema);
module.exports =RegisterApproval;