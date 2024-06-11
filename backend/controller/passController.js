const { response } = require("express");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const ForgetPassword = require("../model/ForgotPasswordRequests");

exports.forgetPassword = async (req, res) => {
  const mail = req.body.mail;
  console.log(mail);
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = "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";

  const TranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = { email: "solutions9584@gmail.com" };
  const recievers = [{ email: mail }];
  const uid = uuidv4();
  const UId = req.user.id;
  await ForgetPassword.create({ id: uid, UserId: UId, active: true });
  
  TranEmailApi.sendTransacEmail({
    sender,
    to: recievers,
    subject: "Password Reset Mail",
    textContent: `http://localhost:3000/reset-password/${uid}`,
  })
    .then(response => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.resetpassword = (req, res) => {
  const Uid = req.params.uid;
  console.log(`uidis${Uid}`);
  ForgetPassword.findOne({ where: { id: Uid } }).then(forgotpasswordrequest => {
    if (forgotpasswordrequest) {
      forgotpasswordrequest.update({ active: false });
      res.status(200).send(`<html>
                              <script>
                                  function formsubmitted(e){
                                      e.preventDefault();
                                      console.log('called');
                                  }
                              </script>
                              <form action="/updatepassword/${Uid}" method="post">
                                  <label for="newpassword">Enter New password</label>
                                  <input name="newpassword" type="password" required></input>
                                  <button>reset password</button>
                              </form>
                          </html>`);
      res.end();
    }
  });
};

exports.updatepassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    console.log(`newpass-${newpassword}`);
    const { resetpasswordid } = req.params;
    console.log(`reset id-${resetpasswordid}`);
    ForgetPassword.findOne({ where: { id: resetpasswordid } }).then(resetpasswordrequest => {
      console.log(resetpasswordrequest);
      User.findOne({ where: { id: resetpasswordrequest.UserId } }).then(user => {
        if (user) {
          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              console.log(err);
              throw new Error(err);
            }
            bcrypt.hash(newpassword, salt, (err, hash) => {
              if (err) {
                console.log(err);
                throw new Error(err);
              }
              user.update({ password: hash }).then(() => {
                res.status(201).json({ message: "Successfully updated the new password" });
              });
            });
          });
        } else {
          return res.status(404).json({ error: "No user exists", success: false });
        }
      });
    });
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};
