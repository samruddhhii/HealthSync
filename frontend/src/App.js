import React, {useEffect} from "react";
import ReactDOM from "react-dom/client";
import logo from './logo.svg';
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import './App.css';
import Header from "./components/Header";


function App() {
  
  return (
    <div className="App max-h-[100vh]">
      <Header />
      <Outlet />
    </div>
  );
}


export default App;
