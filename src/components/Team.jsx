import React from 'react';
import wood_png from "../Landing_media/woodbg.jpg";
import team_png from "../Landing_media/teamphoto.webp";
import person1_png from "../Landing_media/person1.webp";
import useLenis from '../utils/lenis';

const teamMembers = [
  {
    name: 'Thomas Rösler',
    title: 'Captain & Treasure Hunter',
    description: 'Creates tile jewels, devises a solution to every problem and gets to the bottom of any question until he strikes gold.',
    image: person1_png
  },
  {
    name: 'Thomas Rösler',
    title: 'Captain & Treasure Hunter',
    description: 'Creates tile jewels, devises a solution to every problem and gets to the bottom of any question until he strikes gold.',
    image: person1_png
  },
  {
    name: 'Thomas Rösler',
    title: 'Captain & Treasure Hunter',
    description: 'Creates tile jewels, devises a solution to every problem and gets to the bottom of any question until he strikes gold.',
    image: person1_png
  },
  {
    name: 'Thomas Rösler',
    title: 'Captain & Treasure Hunter',
    description: 'Creates tile jewels, devises a solution to every problem and gets to the bottom of any question until he strikes gold.',
    image: person1_png
  },
];

const App = () => {
  useLenis();

  return (
    <>
      <div className="w-full fixed top-0 h-screen">
        <img className="h-full w-full object-cover opacity-20 fixed -z-10" src={wood_png} alt="Wood background" />
      </div>

      <div className="w-full h-40">
      </div>
      <section className="w-full min-h-screen flex flex-col justify-center items-center gap-10 py-20 md:py-24 lg:py-32 relative z-10 text-white pt-24 md:pt-32 lg:pt-40">
        <div className="text-5xl md:text-6xl lg:text-7xl font-bold shadow-xl rounded-md bg-opacity-30 p-4 px-8 md:px-12">TEAM</div>

        <div className="w-full max-w-6xl px-4 md:px-0 mb-8">
            <img src={team_png} className="w-full h-auto object-cover rounded-lg shadow-lg" alt="Team photo" />
        </div>

        <div className="w-full max-w-6xl flex flex-wrap justify-center items-stretch gap-8 px-4 sm:px-6 lg:px-8 mt-10 md:mt-16">
            {teamMembers.map((member, index) => (
                <div key={index} className="w-full sm:w-5/12 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 bg-[rgb(0,0,0,0.3)] flex flex-col items-center rounded-lg shadow-xl p-4 hover:scale-105 transition duration-300 ease-in-out">
                    {/* Adjusted image container width for smaller screens */}
                    <div className="w-full max-w-[100px] sm:max-w-[120px] md:max-w-[150px] h-auto mb-4 overflow-hidden rounded-md">
                        <img className="object-cover w-full h-full rounded-md" src={member.image} alt={member.name} />
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <h2 className="font-bold text-xl mb-1">{member.name}</h2>
                        <h3 className="font-semibold text-base mb-2">{member.title}</h3>
                        <p className="text-sm px-2 leading-relaxed">{member.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default App;