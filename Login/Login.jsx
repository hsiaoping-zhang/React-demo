import React, { Component } from 'react';

import {database} from "../Firebase/index"

class InputForm extends React.Component {
    constructor(props) {
       super(props)
       this.state = { 
          password: "",
          hint: <p>Select user and login.</p>,
          condition: "Change Password",
          correct: ""
       }
       this.changeString = this.changeString.bind(this);
       this.ChangePS = this.ChangePS.bind(this);
       this.logIn = this.logIn.bind(this);
    }

    // handle string in form changing
    changeString(event) {
       if(event.target.id == "id")
          this.setState({ id: event.target.value })
       else
          this.setState({ password: event.target.value })
    }
    
    // login checking: using callback function
    logIn(event){
       event.preventDefault();
       console.log("check login");
       let key = "(password)", password = this.state.password;
 
       var get = function(user, callback){
            var ref = database.collection(user).doc("login").collection("password");
            ref.get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    key = doc.data()["password"];
                });
            });
            // wait time for get password
            window.setTimeout(function(){
                if( typeof callback === 'function' ){
                    callback();
                }
            }, 1000);
       }
 
       var check = function(){
          if(key == password){
            alert("登入正確");
            console.log("click");
            document.getElementById("enter-link").click();  // enter user page
          }
          else{
             alert("登入錯誤");
          }
         // document.getElementById("password").value = "";
       }
       get(window.userName, check);  // callback function 
       
    }
 
    // change user's password
    ChangePS(event){
 
       if(window.userName == "tester"){
          this.setState({
             condition: "Change Password",
             password: "",
             hint: <p>No effect.</p>,
          });
          return;
       }
 
       // set password state
       if(event.target.value == "Change Password"){
            window.selectEnable = false;
            document.getElementById("tester").style.cursor = "default";
            // current state info
            this.setState({
                hint: <p>Please enter previous password.</p>,
                condition: "Submit",
            });
            // hide the Login button
            document.getElementById("input-button").style.visibility = "hidden";
        }
 
       // check current password is correct
       else if(event.target.value == "Submit"){
          console.log(this.props.correct)
          if(this.props.correct == this.state.password){   
             this.setState({
                hint: <p>Password correct. Enter new one.</p>,
                condition: "Change"
             })
          }
          else{
             console.log("error")
             this.setState({hint: <p>Your password error.</p>})
          }
       }
 
       // change password state
        else if(event.target.value == "Change"){
            if(this.state.password == this.props.correct){
                this.setState({
                    hint: <p>Your Password is equal to current one.<br/>Please enter new one.</p>,
                })
            }
            else{
                var ref = database.collection(this.props.charater).doc("login").collection("password").doc("password");
                let new_password = this.state.password;

                // enable select charater
                window.selectEnable = true;
                document.getElementById("tester").style.cursor = "pointer";

                ref.update({password: new_password});
                this.setState({
                    condition: "Change Password",
                    hint: <p>Password has been changed. Login again.</p>,
                    correct: new_password,
                    password: ""
                })
                document.getElementById("input-button").style.visibility = "visible";
                document.getElementById("signup-button").style.visibility = "hidden";
            }
       }
    }
 
    render() {
       return (
          <form className="login" id="login-form">
            {this.state.hint}
            <label>Your ID :</label>
            <br />
            <textarea id="id" name="input" value={window.userName} onChange={this.changeString} />
            <br /><br/>

            <label>Password :</label>
            <textarea id="password" name="key" value={this.state.password} onChange={this.changeString} />
            <br/>

            <input type="button" id="input-button" onClick={this.logIn} value="Login"/>
            <input type="button" id="signup-button" value={this.state.condition} onClick={this.ChangePS}></input>
          </form>
       )
    }
 };
 
 class SelectWindow extends React.Component {
    constructor(props) {
       super(props);
       this.state = { 
          words: "Please Login",
          correct: ""
       };
       this.selectId = this.selectId.bind(this);
       this.readPassword = this.readPassword.bind(this);
    }
 
    readPassword(a){
       var ref = database.collection(a).doc("login").collection("password");
 
       ref.get().then(snapshot =>{
          snapshot.forEach(doc => {    
             // current password
             this.setState({correct: doc.data()["password"]})
          });
       });
       console.log(this.state.correct)
    }
 
 
    UNSAFE_componentWillMount(){
       console.log(this.state.correct);
       window.userName = "tester";
       this.readPassword(window.userName);  // get password first(: read data is too slow)
    }
    
    // select different picture(ID)
    selectId(event) {
        if(window.selectEnable == false)
            return;

        if(event.target.id == "penguin"){
            document.getElementById("tester").style.zIndex = -1;
            this.setState({words: "Hi Hi ^ ^"});
            window.userName = "penguin";
        }
        else{
            document.getElementById("tester").style.zIndex = 0;
            this.setState({words: "Please Login"});
            window.userName = "tester";
        }
        this.readPassword(event.target.id);
    }
 
    render() {
        window.selectEnable = true;
        return (
            <div id="frame">
                {/* select user */}
                <img id="penguin" src="src/penguin.png" onClick={this.selectId}></img>
                <img id="tester" src="src/tester.png" onClick={this.selectId}></img>

                <div id="login-words">
                    {this.state.words}
                </div>
                <InputForm correct={this.state.correct} charater={window.userName}/>
            </div>
        )
    }
    
 };

 export {SelectWindow};