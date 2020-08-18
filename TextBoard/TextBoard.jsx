import React from 'react';
import firebase from 'firebase' 
// import ReactDOM, { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";

import {database} from "../Firebase/index"


class TextList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articleList: [],
        }

        this.createBlockElement = this.createBlockElement.bind(this);
        this.createNameElement = this.createNameElement.bind(this);
        this.readArticle = this.readArticle.bind(this);
        this.deleteMessage = this.deleteMessage(this);
    }

    deleteMessage(){
        
    }

    // according to the element class, create element and setting its style
    createNameElement(name, content, classStyle){
        let node = document.createElement(name);
        node.className = classStyle;

        if(content != null){
            var text = document.createTextNode(content);
            node.appendChild(text);
        }
        return node;
    }

    // create a block(an article block) element
    createBlockElement(data, name){
        
        var t_node = this.createNameElement("p", data["title"], "article-title");
        var c_node = this.createNameElement("p", data["content"], "article-content");
        var parNode = this.createNameElement("div", null, "block");

        parNode.setAttribute("id", name);
        if(data["read"] == true)
            parNode.style.backgroundColor = "rgb(255, 225, 230)";
        
        parNode.appendChild(t_node);
        parNode.appendChild(c_node);

        return parNode;
    }

    readArticle(){
        document.getElementById("article-btn").style.display = "none";  // disable button

        // get article collection
        let ref = database.collection(this.props.user).doc("mailbox").collection("message");
        ref.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let node = this.createBlockElement(doc.data(), doc.id);
                if(doc.exists){
                    // append
                    document.getElementById("article-list").appendChild(node);

                    let page = this.props.user;
                    // public 的訊息不能刪掉(except tester)
                    if(this.props.user != "public" || window.userName == "tester"){
                        
                        // double click event(delete)
                        document.getElementById(doc.id).ondblclick = function(){
                            // remove from database
                            var res = confirm("確定刪掉訊息？");
                            if(res == false){
                                event.preventDefault();
                                return;
                            }
                            var ref = database.collection(page).doc("mailbox").collection("message").doc(doc.id);
                            ref.delete();

                            // remove from screen
                            var element = document.getElementById(doc.id);
                            element.remove();
                        };
                    }
                    if(this.props.user != "public"){
                        // click event(read)
                        document.getElementById(doc.id).onclick = function(){
                            var color = document.getElementById(doc.id).style.backgroundColor;
                            var readState = true;

                            // change color
                            if(color != "rgb(255, 225, 230)")  // unread -> read
                                document.getElementById(doc.id).style.backgroundColor = "rgb(255, 225, 230)";
                            else{
                                readState = false;  // read -> unread
                                document.getElementById(doc.id).style.backgroundColor = "rgb(255, 255, 255)"
                            }
                                
                            // change state
                            var ref = database.collection(page).doc("mailbox").collection("message").doc(doc.id);
                            ref.update({read: readState});
                        }
                    }
                }
            });
        });
    }

    render(){
        // different title to different board
        let title;
        if(this.props.user == "public")
            title = <p id="load-title" >Public Board.</p>
        else
            title = <p id="load-title" >Hello ~ This is {this.props.user}'s Board.</p>

        return(
            <div id="board-content">
                <div id="load-block">
                    {title}
                    <div id="article-btn" onClick={this.readArticle}>load</div>

                    {/* append article to this element */}
                    <div id="article-list"></div>
                </div>
            </div>
        )
    }
}

class InputBlock extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            content: "",
        };

        // function
        this.submitForm = this.submitForm.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    submitForm(event) {
        const date = new Date().toString()
        var recv = document.getElementById("select-recv").value.toLowerCase();
        if(recv == "recv"){
            alert("請選擇收件者");
            event.preventDefault();
            return;
        }
        var send = getUser(this.props.match.path.toString());

        var ref = database.collection(recv).doc("mailbox").collection("message").doc(date)
        ref.set({
            title: this.state.title, 
            content: this.state.content,
            from: send
        });
        this.setState({
            title: "",
            content: ""
        })
        alert("訊息成功送出去惹~");
    }

    changeText(event){
        if(event.target.name == "input-c"){
            this.setState({content: event.target.value});
            let area = document.getElementById("content");
            area.style.height = area.scrollHeight + "px";
        }
        else
            this.setState({title: event.target.value});
    }

    render(){
        let node =  <select className="browser-default custom-select" id="select-recv">
                        <option value="recv" disabled selected>receiver</option>
                        <option value="Public">Public</option>
                        <option value="tester">tester</option>
                        <option value="penguin">penguin</option>
                    </select>

        return(
            // send message (form)
            <div className="form-i">
                <p>{this.props.match.params.user}</p>
                <form onSubmit={this.submitForm}>
                    <div className="form-content">
                        <label>Title 標題</label>
                        <br />
                        <textarea id="title" name="input-t" onChange={this.changeText} value={this.state.title}/>
                        <br /><br />

                        <label>Content 內容</label>
                        <br />
                        <textarea id="content" name="input-c" onChange={this.changeText} value={this.state.content}/>
                    </div>  
                </form>
                <div className="button-block">
                    <div className="center-block">
                        {node}
                        <input id="board-submit" type="button" value="submit" onClick={this.submitForm}/>
                    </div>
                    <p></p>
                </div>
            </div>
        )
    }
}

// according to the path, extract the user name
function getUser(path){
    var index = path.indexOf("/", 1)
    var name = path.substring(1, index);
    return name;
}

class UserBoard extends React.Component{
    render(){
        var name = window.userName;
        var content = <TextList user={name}/>
        return(
            <div>
                {content}
            </div>
        )
    }
}

class PublicBoard extends React.Component{
    render(){
        var content = <TextList user="public"/>
        return(
            <div>
                {content}
            </div>
        )
    }
}

// 之後要想辦法跳回去 login 的頁面
class LogOutPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const pStyle = {
            margin: "0 auto",
            textAlign: "center"
        }
        return(
            <p style={pStyle}>Please reload this page.</p>
        )
    }
}

class TextBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            numbers: 0,
            list: [],
        }
        this.click = this.click.bind(this);
    }

    click(){
        this.setState({list: this.state.list});
    }

    render(){
        return(
            // user page for different functional page
            <BrowserRouter>
                <div id="tmp">
                    <div>
                        <div id="item-select">
                            <Link to="/public" className="board-btn" id="board-public" >Public</Link>
                            <Link to={`${this.props.match.url}/message`} className="board-btn" id="board-text" >Message</Link>
                            <Link to={`${this.props.match.url}/send`}  className="board-btn" id="board-send">Send</Link>
                            <Link to="/" className="board-btn" >Log out</Link>
                        </div>
                            <Route exact path="/public" component={PublicBoard} ></Route>
                            <Route exact path={`${this.props.match.path}/message`} component={UserBoard}></Route>
                            <Route exact path={`${this.props.match.path}/send`} component={InputBlock}></Route>
                            <Route exact path="/" component={LogOutPage} ></Route>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export {TextBoard};