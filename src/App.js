import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Privateroute from './components/Privateroute';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Signup from './pages/Signup';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import Userdashboard from './pages/user-routes/Userdashboard';

 // Make sure 'Base' is capitalized
function App() {
  return(
     
    <BrowserRouter>

    <ToastContainer position='bottom-center'/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/user" element={<Privateroute />} > 
      <Route path="dashboard" element={<Userdashboard />} />
      <Route path="profile-info" element={<ProfileInfo   />} />   
      </Route>

     

    </Routes>
    </BrowserRouter>

  );
};

export default App;
