import Header from "./components/Header";
import Login from './components/Login';
import {Routes,Route} from 'react-router-dom';
import Register from "./components/Register";
import Profile from "./components/Profile"
import Error from "./components/Error";

function App() {
  return (
   <>
   <Header/>
   
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="*" element={<Error/>} />
   </Routes>
   
   </>
  );
}

export default App;
