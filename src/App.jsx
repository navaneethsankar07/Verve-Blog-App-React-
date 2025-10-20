import Login from './authentication/Login'
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Signup from './authentication/signup'
import Createblog from './components/Createblog'
import Myblogs from './components/Myblogs'
import Blogedit from './components/Blogedit'
function App() {

  return(
    <>
          <ToastContainer position="top-right" autoClose={2000} />
          <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/create-blog' element={<Createblog/>}/>
        <Route path='/myblogs' element={<Myblogs/>}/>
              <Route path="/edit-blog/:id" element={<Blogedit/>} />

      </Routes>
    </BrowserRouter>
    </>
   )
}

export default App
