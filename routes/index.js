const router = require('express').Router();
const Invitation=require("../models/Invitation");
const User=require("../models/User");

router.get('/', (req, res) => {
  Invitation.find({},(err,invitation)=>{
    if (err) throw err;
    res.render("index",{user:req.user,invitation:invitation})
  });
  //res.render('index', {title: 'Ridhu',user:req.user});
});

router.get("/addEvent",(req,res)=>{
  res.render('addEvent');
});

router.post("/addEvent",(req,res)=>{
  let newInvitation=new Invitation();
  newInvitation.hostBy=req.user.id;
  newInvitation.hostByName=req.user.name;
  newInvitation.Header=req.body.header;
  newInvitation.Body=req.body.body;
  newInvitation.Footer=req.body.footer;
  //console.log(newInvitation);
  newInvitation.save((err)=>{
    if (err) throw err;
    res.redirect("/addEvent");
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


router.get("/iam/:user_id/not_interested/:invite_id/interestedBy/:j",(req,res)=>{
var j=req.params.j;
var userId=req.params.user_id;
var inviteId=req.params.invite_id;

Invitation.findOne({InvitaionId:inviteId})
        .then(invitaion=>{
          //console.log(invitaion.interestedBy)
          invitaion.interestedBy[j]="";
          invitaion.save(function(err){
            if (err){
              console.log(err);
            }
          });
          //Invitation.update({"InvitaionId":inviteId},{$push:{"interestedBy":user._id}})
        })
        .catch(err=>{console.log(err)});
res.redirect("/");

});

module.exports = router;
