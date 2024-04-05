import {BrowserRouter as Router} from "react-router-dom"
import './App.css';
import AuthForm from './components/Auth/Authform';
import { AuthContextProvider } from './components/Store/auth-context';
import Header from './components/Header/Header';
import Routers from './components/Router/Router';

function App() {
  return (
    <div>
      <Router>
      <AuthContextProvider>
      <Header />
      <Routers />
      </AuthContextProvider>
      </Router>
      
    </div>
  );
}

export default App;
