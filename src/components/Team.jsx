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
                    <img className="object-fill w-80 h-90 rounded" src={https://nebula.sastclub.tech/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F67745953%3Fs%3D400%26u%3Dcc8f4cb6d463c2ee4c1cc756522e79929dc65ee2%26v%3D4&w=128&q=75} alt="person1"/>
                </div>
                <div className="h-35 w-80 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-l">Neelanshu Karn</h2>
                    <h2 className="font-bold text-l">President</h2>
                    <p className="text-xs text-center">Leads the Nebula project with vision and technical insight, 
                        driving the team toward impactful innovation in space-tech.
                    </p>
                </div>
            </div>

            <div className="h-130 w-85 bg-[rgb(0,0,0,0.3)] flex flex-col justify-evenly items-center hover:scale-101 transition duration-200">
                <div className="w-80 h-90">
                    <img className="object-fill w-80 h-90 rounded" src={https://nebula.sastclub.tech/_next/image?url=https%3A%2F%2Fd3dyfaf3iutrxo.cloudfront.net%2Fthumbnail%2Fuser%2Fb1707d706f294124ab883d476518f6b4.jpeg&w=128&q=75} alt="person1"/>
                </div>
                <div className="h-35 w-80 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-l">Pratiti Paul</h2>
                    <h2 className="font-bold text-l">Content and Documentation</h2>
                    <p className="text-xs text-center">Supports project leadership with coordination, planning, 
                        and creative contributions to team direction.
                    </p>
                </div>
            </div>

            <div className="h-130 w-85 bg-[rgb(0,0,0,0.3)] flex flex-col justify-evenly items-center hover:scale-101 transition duration-200">
                <div className="w-80 h-90">
                    <img className="object-fill w-80 h-90 rounded" src={https://nebula.sastclub.tech/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F178926947%3Fv%3D4&w=128&q=75} alt="person1"/>
                </div>
                <div className="h-35 w-80 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-l">Kavya Katal</h2>
                    <h2 className="font-bold text-l">Vie-President</h2>
                    <p className="text-xs text-center">Dedicated to full-stack development with MERN,
                        solving problems through code and creativity.
                    </p>
                </div>
            </div>

            <div className="h-130 w-85 bg-[rgb(0,0,0,0.3)] flex flex-col justify-evenly items-center hover:scale-101 transition duration-200">
                <div className="w-80 h-90">
                    <img className="object-fill w-80 h-90 rounded" src={https://nebula.sastclub.tech/_next/image?url=https%3A%2F%2Fd3dyfaf3iutrxo.cloudfront.net%2Fthumbnail%2Fuser%2F8bd8e4c4b408476abf043bdf7d652527.jpeg&w=128&q=75} alt="person1"/>
                </div>
                <div className="h-35 w-80 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-l">Pratya Silla</h2>
                    <h2 className="font-bold text-l">UI/UX Lead</h2>
                    <p className="text-xs text-center">Designs intuitive and engaging user interfaces
                        that enhance user experience across all touchpoints
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