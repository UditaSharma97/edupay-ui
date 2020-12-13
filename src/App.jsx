import React from "react";
import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./constants/pageNames";
//Pages 
import MainPage from "./screens/login";
import NotFoundPage from "./screens/404";
import AdminPage from "./screens/admin";
import MainView from "./screens/main";

import { 
  INDEX_PATH,ADMIN_HOME,PAGE_404,MAIN_VIEW
 } from "./constants/pageNames";

class App extends React.Component {
  render(){
    return<Router>
      <Switch>
      <Route exact path={INDEX_PATH} component={MainPage}/>
      <Route exact path={ADMIN_HOME} component={AdminPage}/>
      <Route exact path={MAIN_VIEW} component={MainView}/>
      <Route exact path={PAGE_404} component={NotFoundPage}/>
      <Redirect to={PAGE_404}/>
      </Switch>
    </Router>
  }
}
export default App;
