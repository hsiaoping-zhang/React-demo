import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { HashRouter, Route, Switch, Link } from "react-router-dom";

import {TextBoard} from "./TextBoard/index"
import {SelectWindow} from "./Login/index"


import { timers } from 'jquery';


function App() {
   return(
      <HashRouter>
         {/* enter user page */}
         <Link to="/" id="login-page"/>
         <Link to="/user" id="enter-link"/>  
         <div>
            <Switch>
               {/* login */}
               <Route exact path="/" component={SelectWindow} ></Route>
               <Route path="/index.html" component={SelectWindow}></Route>

               {/* user page */}
               <Route path="/user" component={TextBoard}/>
               <Route component={SelectWindow}/>
            </Switch>
         </div>
      </HashRouter>
   )
   
}

export default App;