import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IntroPage, MainPage } from './pages';
import  "./App.scss";
const App=()=> { 
    return (
      <Switch>
        <Route exact path='/' component={IntroPage}/>
        <Route path='/main' component={MainPage} />
      </Switch>
    );
};
 
export default App;
