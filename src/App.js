import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Books from './components/Books';
import BooksCreate from './components/BooksCreate';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Switch>
            <Route path='/register'>
              <SignUp />
            </Route>
            <Route path='/login' exact>
              <SignIn />
            </Route>
            <PrivateRoute path='/books' exact>
              <Books />
            </PrivateRoute>
            <PrivateRoute path='/books/create' exact>
              <BooksCreate />
            </PrivateRoute>
          </Switch>
        </Router>
      </div>
    </div>
  );
}


export default App;
