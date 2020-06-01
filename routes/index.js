const router = require('express').Router();
const Invitation=require("../models/Invitation");
const User=require("../models/User");

router.get('/', (req, res) => {
  let Created=0;
  let Accepted =0;
  if(req.user){
    Invitation.find({},(err,invitation)=>{
      if (err) throw err;
      for(let i=0;i<invitation.length;i++){
        if((invitation[i].interestedBy.length)){  
          for(var j=0;j<invitation[i].interestedBy.length;j++){
            if(JSON.stringify(invitation[i].interestedBy[j])==JSON.stringify(req.user._id)){
              Accepted++;
            }
            //console.log(invitation[i].interestedBy[j])
          }
        }
        if(JSON.stringify(invitation[i].hostBy)==JSON.stringify(req.user._id)){
          Created++;
        }
      }
      res.render("index",{user:req.user,invitation:invitation,Created:Created,Accepted :Accepted })
    });
  }
  else{
    res.redirect("/user/login");
  }
 
  
  //res.render('index', {title: 'Ridhu',user:req.user});
});

router.get("/addEvent",(req,res)=>{
  res.render('addEvent',{user:req.user});
});

router.post("/addEvent",(req,res)=>{
  let checkbox=req.body.private;
  let private=false;
  if(checkbox=="on"){
    private=true
  }
  let newInvitation=new Invitation();
  newInvitation.EventOn=req.body.eventOn;
  newInvitation.Duration=req.body.duration;
  newInvitation.hostBy=req.user.id;
  newInvitation.private=private;
  newInvitation.hostByName=req.user.name;
  newInvitation.Header=req.body.header;
  newInvitation.Body=req.body.body;
  newInvitation.Footer=req.body.footer;
  //console.log(newInvitation);
  newInvitation.save((err)=>{
    if (err) throw err;
    //console.log(newInvitation.InvitaionId);
    res.render("addEvent",{linkId:newInvitation.InvitaionId,user:req.user});
    //res.redirect("/addEvent");
  });

  
});


router.get("/iam/:user_id/interested/:invite_id",(req,res)=>{
  var userId=req.params.user_id;
  var inviteId=req.params.invite_id;

  User.findOne({userId:userId})
    .then(user=>{
      //console.log(user._id)
      Invitation.findOne({InvitaionId:inviteId})
        .then(invitaion=>{
          //console.log(invitaion.interestedBy)
          invitaion.interestedBy.push(user._id);
          invitaion.save(function(err){
            if (err){
              console.log(err);
            }
          });
          //Invitation.update({"InvitaionId":inviteId},{$push:{"interestedBy":user._id}})
        })
        .catch(err=>{console.log(err)});
    })
    .catch(err => console.log(err));
  //User.findOne({email: req.body.email})
  
  res.redirect("/");
});

//pending
router.get("/iam/:user_id/not_interested/:invite_id/interestedBy/:j",(req,res)=>{
//console.log(req.params);
var j=JSON.parse(req.params.j);
var userId=req.params.user_id;
var inviteId=req.params.invite_id;

Invitation.findOneAndUpdate({InvitaionId:inviteId},{$pull:{"interestedBy":req.user._id}},(err,done)=>{
  if(err){
    console.log(err);
  }
  else{
    res.redirect("/");
  }
});


});



//view card via links 
router.get("/view/:id",(req,res)=>{
  var inviteId=req.params.id;
  Invitation.findOne({InvitaionId:inviteId})
    .then(invitaion=>{
      let currentTime=new Date();
      let currentSeconds=currentTime.getMinutes();
      let currentHour=currentTime.getHours();
      let currentMilliseconds=currentTime.getMilliseconds();
      let currentDate=currentTime.getDate();
      let currentMonth=(currentTime.getMonth())+1;
      let currentYear=currentTime.getFullYear();
      //console.log(currentYear,currentMonth,currentDate,currentHour);
      let eventTime=invitaion.Date;
      let EventOn=invitaion.EventOn;
      //console.log(eventTime,EventOn)
      //get time form Date date form Event on (array) 
      //console.log(eventTime.getFullYear());
      let eventSeconds=eventTime.getMinutes();
      let eventHour=eventTime.getHours();
      let eventMilliseconds=eventTime.getMilliseconds();
      // console.log(EventOn,EventOn[0],EventOn[1]);
      let eventDate=eventTime.getDate();
      let eventMonth=(eventTime.getMonth())+1;
      let eventYear=eventTime.getFullYear();
      //console.log(eventDate)
      //console.log(eventYear,eventMonth,eventDate)
      // console.log((Show).getHours());
      // console.log((invitaion.Date).getHours())
      // console.log((Show).getHours()-(invitaion.Date).getHours())
      res.render("showInvitation",{invitaion:invitaion});
    })
    .catch(err=>{console.log(err)});

});

module.exports = router;
