const mongoose = require('mongoose');
var AutoIncrement=require("mongoose-sequence")(mongoose);
var Schema = mongoose.Schema;
mongoose.plugin(schema => { schema.options.usePushEach = true });
const InvitaionSchema = new mongoose.Schema({
    hostBy:{
        type:Schema.Types.ObjectId,ref:"User",required:1
    },
    hostByName:{type:String},
    Header:{type:String},
    HeaderOne:{type:String},
    Body:{type:String},
    Footer:{type:String},
    Date:{type:Date,default:Date.now()},
    EventOn:{type:String},
    Duration:{type:Number},
    private:{type:Boolean},
    picture:{type:String,default:"card.jpg"},
    interestedBy:[{
        type:Schema.Types.ObjectId,ref:"User"
    }],
    InvitaionId:{type:Number,unique:true},},
    {
        timestamps:true
    }
    );
  
InvitaionSchema .plugin(AutoIncrement,{id:"InvitaionId_seq",inc_field:"InvitaionId"});
  
module.exports = mongoose.model('Invitation', InvitaionSchema );