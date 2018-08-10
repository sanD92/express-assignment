const mongoose= require('mongoose');
const Schema = mongoose.Schema;

AccessTokenSchema= new Schema({
    result : {
          name :{
            type:String
          },
          accessToken:{
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

const AccessToken = mongoose.model('access-token',AccessTokenSchema);
module.exports =AccessToken;