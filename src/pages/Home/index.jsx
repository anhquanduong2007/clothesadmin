import { Grid } from '@mui/material';
import React from 'react';
import Sidebar from "../../components/Sidebar";
import Dashboard from "../Dashboard";
import Products from "../Products";
import Navbar from "../../components/Navbar";
import {Switch,Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./style.scss";
const Home = () => {    
     
    return (
        <>
         <ToastContainer style = {{zIndex: 9999999}}/>
        <Grid container className = "home">
            
            <Navbar/>
            <Sidebar/>
           
            <Switch>
                <Route path = "/home/dashboard"  component = {Dashboard} />
                <Route path = "/home/products" component = {Products}/>
              
            </Switch>
        </Grid>
        </>
    );
};

export default Home;