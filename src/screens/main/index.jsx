import React from "react";
import "./style.css";

class MainView extends React.Component{

    constructor(props){
        super(props);    
    }
    render(){
        return(
            <nav>
                
                <ul className="nav-links">
                    <li><a href="/">Login</a></li>
                    <li><a href="/404">404</a></li>
                    <li><a href="/adminHome">Admin Home</a></li>
                    
                </ul>
                <div className="burger" onClick = {()=>{

                    const burger = document.querySelector('.burger');
                    const nav = document.querySelector('.nav-links');
                    const navLinks = document.querySelectorAll('.nav-links li');

                    //burger.addEventListener('click',()=>{
                        nav.classList.toggle('nav-active');
                    
                        navLinks.forEach((link,index)=>{
                            if(link.style.animation){
                                link.style.animation='';
                            }else{
                                link.style.animation = `navLinkFade 0.5 ease forwards ${index /7 + 1.5 }s`;
                            }
                        });

                        burger.classList.toggle('toggle');
                    //});

                }}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                <div className="logo">
                    Powered by EduPay
                </div>
            </nav>
        );
        
    };
    navSlide(){
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelector('.nav-links li');

        //burger.addEventListener('click',()=>{
            nav.classList.toggle('nav-active');
        
            navLinks.forEach((link,index)=>{
                if(link.style.animation){
                    link.style.animation='';
                }else{
                    link.style.animation = `navLinkFade 0.5 ease forwards ${index /7 + 1.5 }s`;
                }
            });

            burger.classList.toggle('toggle');
        //});
    }
    
}

export default MainView;