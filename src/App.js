import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import ProtectedRoutes from './components/Pages/ProtectedRoutes';
import Dashboard from './components/Pages/DashBoard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './components/Common/DashboardHeader';

function App() {
  const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("userData"))
  const isLoggedIn = userData?.userId && userData?.sessionId
  useEffect(() => {
    if(isLoggedIn){
      navigate("/dashboard")
    }
  },[navigate, isLoggedIn])

  return (
    <div className="App">
      {isLoggedIn ? <DashboardHeader /> : null}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Route> 
      </Routes>
    </div>
  );
}

export default App;
