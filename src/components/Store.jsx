/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Landing_media/SAST.png";
import sast_cap from "../Landing_media/sast ki cap.jpeg"
import store_bg from "../Landing_media/lashope.mp4"


const Store = () => {

    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    
    <div className="h-660 w-full absolute top-0 left-0 -z-10">
        <video className="w-full h-full  opacity-70" autoPlay loop muted>
            <source src={store_bg}/>
        </video>
    </div>

    <header className="header">
        <div className="container header-content">
            <a href="../index.html" className="logo">
                <img className="rounded" src={logo} alt="Logo" width="60" height="60"/>
            </a>
            
           
            <nav className="flex flex-col justify-evenly items-center">
                <ul className="nav-links gap-20 flex justify-evenly items-center" style={{marginLeft:"210px"}}>

                    <li className="opacity-75 hover:opacity-100"><a href="#">MEN</a></li>
                    <li className="opacity-75 hover:opacity-100"><a href="#">WOMEN</a></li>
                    <li className="opacity-75 hover:opacity-100"><a href="#">ACCESSORIES</a></li>
                   
                    
                </ul>
            </nav>
            <div className="flex justify-evenly items-center w-70 gap-10">
                <a href="https://forms.gle/LtxwMT4r8byMRg8CA" 
                className="font-bold text-xs opacity-75 hover:opacity-100" target="_blank">ACCOUNT</a>
                <a href="https://forms.gle/LtxwMT4r8byMRg8CA" 
                className="font-bold text-xs opacity-75 hover:opacity-100" target="_blank">SEARCH</a>
                <a href="https://forms.gle/LtxwMT4r8byMRg8CA" 
                className="contact-button" target="_blank">CART</a>
            </div>
        </div>
      </header>

     <section style={{marginTop: "150px"}}>
        <div>
  <h1 className="text-center text-3xl font-bold text-white">OUR MERCHANDISE</h1>
  </div>
  <div></div>
        
        <div className=" flex justify-evenly items-center flex-wrap gap-20" style={{marginTop: "5%"}}>
            <div className="flex flex-col items-center  w-64 h-75 bg-[rgb(255,255,255,0.2)] rounded  justify-center hover:scale-105 transition duration-250">
                <img className="rounded" src={sast_cap}/>
                <h2 className="font-bold text-m" style={{marginTop:"3%"}}>SAST Cap</h2>
                <h6 className="text-xs" style={{marginTop: "1%"}}>₹699</h6>
                <div></div>
            </div>

            <div className="flex flex-col items-center  w-64 h-75 bg-[rgb(255,255,255,0.2)] rounded  justify-center hover:scale-105 transition duration-250">
                <img className="rounded" src={sast_cap}/>
                <h2 className="font-bold text-m" style={{marginTop:"3%"}}>SAST Cap</h2>
                <h6 className="text-xs" style={{marginTop: "1%"}}>₹699</h6>
                <div></div>
            </div>

            <div className="flex flex-col items-center  w-64 h-75 bg-[rgb(255,255,255,0.2)] rounded  justify-center hover:scale-105 transition duration-250">
                <img className="rounded" src={sast_cap}/>
                <h2 className="font-bold text-m" style={{marginTop:"3%"}}>SAST Cap</h2>
                <h6 className="text-xs" style={{marginTop: "1%"}}>₹699</h6>
                <div></div>
            </div>

            <div className="flex flex-col items-center  w-64 h-75 bg-[rgb(255,255,255,0.2)] rounded  justify-center hover:scale-105 transition duration-250">
                <img className="rounded" src={sast_cap}/>
                <h2 className="font-bold text-m" style={{marginTop:"3%"}}>SAST Cap</h2>
                <h6 className="text-xs" style={{marginTop: "1%"}}>₹699</h6>
                <div></div>
            </div>

            <div className="flex flex-col items-center  w-64 h-75 bg-[rgb(255,255,255,0.2)] rounded  justify-center hover:scale-105 transition duration-250">
                <img className="rounded" src={sast_cap}/>
                <h2 className="font-bold text-m" style={{marginTop:"3%"}}>SAST Cap</h2>
                <h6 className="text-xs" style={{marginTop: "1%"}}>₹699</h6>
                <div></div>
            </div>

            <div className="flex flex-col items-center  w-64 h-75 bg-[rgb(255,255,255,0.2)] rounded  justify-center hover:scale-105 transition duration-250">
                <img className="rounded" src={sast_cap}/>
                <h2 className="font-bold text-m" style={{marginTop:"3%"}}>SAST Cap</h2>
                <h6 className="text-xs" style={{marginTop: "1%"}}>₹699</h6>
                <div></div>
            </div> 
        </div>
    </section>
    
    </>
  )
}

export default Store