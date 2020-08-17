import React from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';


class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charater: this.props.charater,
            inputText: "Your bithday as password:",
            text: ""
        };
        this.app = firebase.initializeApp({projectId: 'web-react-cloud'});
        this.database = this.app.firestore();

        this.clickButton = this.clickButton.bind(this);
        this.submitText = this.submitText.bind(this);
        this.textChange = this.textChange.bind(this);
    }

    clickButton(event){
        console.log(event.target.id);
        this.setState({charater: event.target.id});
        if(event.target.id == "tester"){
            this.setState({inputText: "Hello~~"});
        }
    }

    textChange(event){
        this.setState({text: event.target.value});
        console.log("revise.");
    }

    submitText(event){
        var date = new Date().toLocaleString();
        var ref = this.database.collection(this.state.charater).doc("login").collection("datetime");
        ref.add({date: date, string: this.state.text});
        console.log("set successful.");
        window.location.href = "#/board"
        event.preventDefault();
    }
 
    render() {
       return (
        <div>
            <button type="button" class="btn btn-primary btn-enter" id="penguin" 
            data-toggle="modal" data-target="#exampleModal" data-whatever="penguin" 
            onClick={this.clickButton}></button>

            <button type="button" class="btn btn-primary btn-enter" id="tester" 
            data-toggle="modal" data-target="#exampleModal" data-whatever="tester" 
            onClick={this.clickButton}></button>
            

            <div class="modal " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">

                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 for="recipient-name" class="modal-title" id="exampleModalLabel">{this.state.charater}</h5>
                            <Link to="board">ll</Link>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="birthday" class="col-form-label">{this.state.inputText}</label>
                                    <input type="text" class="form-control" id="input-birthday" onChange={this.textChange}/>
                                </div>
                            </form>
                        </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <Link to="board" class="btn btn-primary"  
                            >
                                {this.state.charater == "tester" ? "GO GO" : "Login"}
                                </Link> 
                    </div>

                </div>
            </div>
        </div>
    </div>
       )
    }
 };

export default ModalWindow;
