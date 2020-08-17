import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import {TextBoard} from "./TextBoard/index"
import {SelectWindow} from "./Login/index"


import { timers } from 'jquery';


function App() {
   window.userName = "tester";
   return (
      <BrowserRouter>
            {/* enter user page */}
            <Link to="/user" id="enter-link"/>  
            <div>
               <Switch>
                  {/* login */}
                  <Route exact path="/" component={SelectWindow} ></Route>

                  {/* user page */}
                  <Route path="/user" component={TextBoard}/>
               </Switch>
            </div>
      </BrowserRouter>
   )
}

export default App;