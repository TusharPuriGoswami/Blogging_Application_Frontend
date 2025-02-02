import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Privateroute from './components/Privateroute';
import UserProvider from './context/UserProvider';
import About from './pages/About';
import Categories from './pages/Categories';
import Home from './pages/Home';
import Login from './pages/Login';
import PostPage from './pages/PostPage';
import Services from './pages/Services';
import Signup from './pages/Signup';
import UpdateBlog from './pages/UpdateBlog';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import Userdashboard from './pages/user-routes/Userdashboard';

 // Make sure 'Base' is capitalized
function App() {
  return(
     
    <UserProvider>
      <BrowserRouter>

<ToastContainer position='bottom-center'/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  <Route path="/posts/:postId" element={<PostPage />} />
  <Route path="/categories/:categoryId" element={<Categories />} />  




  <Route path="/user" element={<Privateroute />} > 
  <Route path="dashboard" element={<Userdashboard />} />
  <Route path="profile-info/:userId" element={<ProfileInfo   />} /> 
  <Route path="update-blog/:blogId" element={<UpdateBlog   />} />   
  
  </Route>

 

</Routes>
</BrowserRouter>
</UserProvider>
    

  );
};

export default App;
