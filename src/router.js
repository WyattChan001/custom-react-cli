import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";

import SliderMenu from "./layout/SlideMenu";
import NavigationBar from "./layout/NavigationBar";

import HomeIndex from "./home";
import BlogIndex from "./blog";
import ResumeIndex from "./resume";
import UserIndex from "./user";

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <NavigationBar />
          <div className="app-content">
            <SliderMenu />
            <div className="container">
              {/* Switch只显示一个组件。加exact表示精确匹配/。如果不加exact，/xxx也会匹配/。  */}
              <Switch>
                {/* exact */}
                <Route exact path="/" component={HomeIndex} />
                {/* resume */}
                <Route exact path="/resume" component={ResumeIndex} />
                {/* blog */}
                <Route path="/blog" component={BlogIndex} />
                {/* user */}
                <Route path="/user" component={UserIndex} />
              </Switch>
            </div>
          </div>
        </div>
        {/* <ul>
                    <li><Link to="/home">home</Link></li>
                    <li><Link to="/blog">blog</Link></li>
                    <li><Link to="/resume">resume</Link></li>
                    <li><Link to="/user">user</Link></li>
                </ul>
                <div>
                    <Switch>
                        <Route path="/home" component={HomeIndex} />
                        <Route path="/blog" component={BlogIndex} />
                        <Route path="/resume" component={ResumeIndex} />
                        <Route path="/user" component={UserIndex} />
                    </Switch>
                </div> */}
      </Router>
    );
  }
}
