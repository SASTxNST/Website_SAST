import React from 'react'
import "../index.css"
import { Link } from "react-router-dom";
import wood_png from "../Landing_media/woodbg.jpg"
import team_png from "../Landing_media/teamphoto.webp"
import person1_png from "../Landing_media/person1.webp"
import useLenis from '../utils/lenis'




const Team = () => {
    useLenis();
  return (
    <>
    
    <div className="w-full h-full">
        <img className="h-full w-full object-cover opacity-20 fixed -z-10" src={wood_png}/>
      </div> 


      <section className="w-full h-450 flex flex-col justify-center items-center gap-15">
        <div className="h-20 w-40 flex justify-center items-center text-5xl font-bold shadow-xl">TEAM</div>

        <div className="h-150 w-300 bg-red-900 object-cover">
            <img src={team_png} className="object-cover h-150 w-300"/>
        </div>

        <div className="w-300 h-150 flex justify-evenly items-center flex-wrap gap-15" style={{marginTop:"10%"}}>
            <div className="h-130 w-85 bg-[rgb(0,0,0,0.3)] flex flex-col justify-evenly items-center hover:scale-101 transition duration-200">
                <div className="w-80 h-90">
                    <img className="object-fill w-80 h-90 rounded" src={person1_png} alt="person1"/>
                </div>
                <div className="h-35 w-80 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-l">Thomas Rösler</h2>
                    <h2 className="font-bold text-l">Captain & Treasure Hunter</h2>
                    <p className="text-xs text-center">Creates tile jewels, devises a solution to every problem
                        and gets to the bottom of any question until he strikes
                        gold.
                    </p>
                </div>
            </div>

            <div className="h-130 w-85 bg-[rgb(0,0,0,0.3)] flex flex-col justify-evenly items-center hover:scale-101 transition duration-200">
                <div className="w-80 h-90">
                    <img className="object-fill w-80 h-90 rounded" src={person1_png} alt="person1"/>
                </div>
                <div className="h-35 w-80 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-l">Thomas Rösler</h2>
                    <h2 className="font-bold text-l">Captain & Treasure Hunter</h2>
                    <p className="text-xs text-center">Creates tile jewels, devises a solution to every problem
                        and gets to the bottom of any question until he strikes
                        gold.
                    </p>
                </div>
            </div>

            <div className="h-130 w-85 bg-[rgb(0,0,0,0.3)] flex flex-col justify-evenly items-center hover:scale-101 transition duration-200">
                <div className="w-80 h-90">
                    <img className="object-fill w-80 h-90 rounded" src={person1_png} alt="person1"/>
                </div>
                <div className="h-35 w-80 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-l">Thomas Rösler</h2>
                    <h2 className="font-bold text-l">Captain & Treasure Hunter</h2>
                    <p className="text-xs text-center">Creates tile jewels, devises a solution to every problem
                        and gets to the bottom of any question until he strikes
                        gold.
                    </p>
                </div>
            </div>

            <div className="h-130 w-85 bg-[rgb(0,0,0,0.3)] flex flex-col justify-evenly items-center hover:scale-101 transition duration-200">
                <div className="w-80 h-90">
                    <img className="object-fill w-80 h-90 rounded" src={person1_png} alt="person1"/>
                </div>
                <div className="h-35 w-80 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-l">Thomas Rösler</h2>
                    <h2 className="font-bold text-l">Captain & Treasure Hunter</h2>
                    <p className="text-xs text-center">Creates tile jewels, devises a solution to every problem
                        and gets to the bottom of any question until he strikes
                        gold.
                    </p>
                </div>
            </div>
        </div>
    </section>

    </>
  )
}

export default Team