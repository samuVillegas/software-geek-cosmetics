import React from 'react';
import '../styles/App.css'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from '../pages/Home'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
