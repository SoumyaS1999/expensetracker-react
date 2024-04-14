import {BrowserRouter as Router} from "react-router-dom"
import './App.css';
import AuthForm from './components/Auth/Authform';

import Header from './components/Header/Header';
import Routers from './components/Router/Router';

function App() {
  return (
    <div>
      <Router>
      
      <Header />
      <Routers />

      </Router>
      
    </div>
  );
}

export default App;
