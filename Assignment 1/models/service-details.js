const mongoose= require('mongoose');
const Schema = mongoose.Schema;

ServiceDetailsSchema= new Schema({
    result : {
          name :{
            type:String
          },
          serviceId:{
            type:String
          }
        
    },
    status :{
        code:{
            type:Number
        },
        message:{
            type:String
        }
    }
});

const ServiceDetails = mongoose.model('service-details',ServiceDetailsSchema);
module.exports =ServiceDetails;