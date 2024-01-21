import './App.css';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import NavBar from './components/NavBar'
import {AuthProvider} from './context/AuthContext'
function App() {
  return (
    <div className="App">
   
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            
          <Route element={<PrivateRoute ><HomePage /></ PrivateRoute >} path="/" exact />
          <Route element={<LoginPage />} path="/login" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
