import React, { useEffect } from 'react';
import "../index.css"
import logo from "../Landing_media/SAST.png";
import video1 from "../Landing_media/saturnbg.mp4"
import img1 from "../Landing_media/Newsletter.png"
import useLenis from '../utils/lenis'

const Newsletter = () => {
  useLenis();
  return (
    <>
    <div className="h-660 w-full absolute top-0 left-0 -z-10">
        <video className="w-full h-full object-cover opacity-30" autoPlay muted loop>
            <source src={video1} type="video/mp4"/>
        </video>
    </div>

  <section className="news flex flex-col justify-around items-center w-full h-690 gap-20" style={{marginTop:"-10%", marginBottom:"10%"}}>
  <div className="w-280 h-50 border-l-2 border-[#00a1ff]">
        <div className="newsdisplay w-280 h-50 flex flex-col gap-10 justify-between items-end">
            <h2 className="text-7xl font-bold text-[rgb(0,161,255,0.8)] hover:text-[rgb(0,161,255,1)] hover:shadow-xl transition duration-250 ">2022 NEWSLETTER : CUBESAST</h2>
            <div className="w-270 flex justify-center"><img src={img1} className="h-95 rounded shadow-xl shadow-grey-200 hover:scale-180 transition duration-500"/></div>
            <a href="https://media.licdn.com/dms/document/media/v2/D4D1FAQFTvI5spYW-9Q/feedshare-document-pdf-analyzed/feedshare-document-pdf-analyzed/0/1732080308313?e=1749686400&v=beta&t=-_SoEaLMV5ZYYW3eAUNJ2RzEOwNm8svbYiIOxEyAQeQ" target="_blank"><div className="w-265 h-15 border border-[rgb(0,161,255,0.8)] rounded flex justify-center items-center font-bold opacity-70 hover:opacity-100 hover:shadow-xl hover:border-text-[rgb(0,161,255,1)] hover:bg-[rgb(0,161,255,0.9)] transition duration-250 text-xs">DOWNLOAD</div></a>
        </div>
    </div>

    <div className="w-280 h-50 border-l-2 border-[#00a1ff]">
        <div className="newsdisplay w-280 h-50 flex flex-col gap-10 justify-between items-end">
            <h2 className="text-7xl font-bold text-[rgb(0,161,255,0.8)] hover:text-[rgb(0,161,255,1)] hover:shadow-xl transition duration-250 ">2022 NEWSLETTER : CUBESAST</h2>
            <div className="w-270 flex justify-center"><img src={img1} className="h-95 rounded shadow-xl shadow-grey-200 hover:scale-180 transition duration-500"/></div>
            <a href="https://media.licdn.com/dms/document/media/v2/D4D1FAQFTvI5spYW-9Q/feedshare-document-pdf-analyzed/feedshare-document-pdf-analyzed/0/1732080308313?e=1749686400&v=beta&t=-_SoEaLMV5ZYYW3eAUNJ2RzEOwNm8svbYiIOxEyAQeQ" target="_blank"><div className="w-265 h-15 border border-[rgb(0,161,255,0.8)] rounded flex justify-center items-center font-bold opacity-70 hover:opacity-100 hover:shadow-xl hover:border-text-[rgb(0,161,255,1)] hover:bg-[rgb(0,161,255,0.9)] transition duration-250 text-xs">DOWNLOAD</div></a>
        </div>
    </div>

    <div className="w-280 h-50 border-l-2 border-[#00a1ff]">
        <div className="newsdisplay w-280 h-50 flex flex-col gap-10 justify-between items-end">
            <h2 className="text-7xl font-bold text-[rgb(0,161,255,0.8)] hover:text-[rgb(0,161,255,1)] hover:shadow-xl transition duration-250 ">2022 NEWSLETTER : CUBESAST</h2>
            <div className="w-270 flex justify-center"><img src={img1} className="h-95 rounded shadow-xl shadow-grey-200 hover:scale-180 transition duration-500"/></div>
            <a href="https://media.licdn.com/dms/document/media/v2/D4D1FAQFTvI5spYW-9Q/feedshare-document-pdf-analyzed/feedshare-document-pdf-analyzed/0/1732080308313?e=1749686400&v=beta&t=-_SoEaLMV5ZYYW3eAUNJ2RzEOwNm8svbYiIOxEyAQeQ" target="_blank"><div className="w-265 h-15 border border-[rgb(0,161,255,0.8)] rounded flex justify-center items-center font-bold opacity-70 hover:opacity-100 hover:shadow-xl hover:border-text-[rgb(0,161,255,1)] hover:bg-[rgb(0,161,255,0.9)] transition duration-250 text-xs">DOWNLOAD</div></a>
        </div>
    </div>
    
  </section>

  <br/><br/><br/>

  <hr className="opacity-15"/><br/><br/>

  <form className="w-full h-60 ">
    <div className="news flex justify-evenly ">
      <div className="flex flex-col gap-8">
        <div className="text-4xl font-bold w-150 ">SUBSCRIBE TO OUR SAST NEWSLETTER</div>
        <a href="newsletter.html"><div className="h-10 w-50 border border-[#00a1ff] text-s font-bold flex justify-center items-center opacity-80 rounded hover:bg-[#00a1ff] transition duration-500">READ NOW</div></a>
      </div>

      <div className="h-50 w-200  flex flex-col justify-center gap-8 p-4">
        <h3 className="text-l font-lighter">SUBSCRIBE AND NEVER MISS OUT ON WHAT WE’RE UP TO.</h3>
        <input className="h-10 w-166 text-xl border-b-2 border-[#00a1ff] font-bold" type="email" placeholder="EMAIL ADDRESS" name="email" required/>
        <div className="gap-5 w-full flex jus-between">
          <input className="h-10 w-90 text-xl border-b-2 border-[#00a1ff] font-bold" type="text" placeholder="FIRST NAME" name="firstname" required/>
          <input className="h-10 w-90 text-xl border-b-2 border-[#00a1ff] font-bold" type="text" placeholder="LAST NAME" name="lastname" required/>
          <input className="border border-[#00a1ff] h-10 w-32 hover:bg-[#00a1ff] transition duration-500 rounded font-bold opacity-80" type="submit" value="SUBSCRIBE" name="submit"/>
        </div>
        <p className="text-xs font-lighter">You must be 13 years or older to opt-in to SAST emails.</p>
      </div>
    </div>
  </form>

    <br/><hr className="opacity-18"/>
    </>
  )

}

export default Newsletter