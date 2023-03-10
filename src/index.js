import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEdit from './components/AddEdit';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/index'
import Registration from './components/Registration';
import { Protector } from './helpers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/registration' element={<Registration/>}/>
    <Route path='/employeetable' element={<Protector Component={App}/> }/>
    <Route path='/addEdit' element={<AddEdit/>}/>
    <Route path='/addEdit/:id' element={<AddEdit/>}/>
   </Routes>
   </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
