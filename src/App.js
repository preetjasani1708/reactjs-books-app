import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Books from './components/Books';
import BooksCreate from './components/BooksCreate';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/register'>
            <SignUp />
          </Route>
          <Route path='/login' exact>
            <SignIn />
          </Route>
          <Route path='/books' exact>
            <Books />
          </Route>
          <Route path='/books/create' exact>
            <BooksCreate />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
