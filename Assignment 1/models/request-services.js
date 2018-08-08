const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerServicesSchema = new Schema({
    request: [
        {
            name: {
                type: String
            },
            approvals: {
                type: String
            }
        }
    ]

});

const RegisterServices = mongoose.model('register-services',registerServicesSchema);
module.exports =RegisterServices;
