import React from "react";
import videoe1 from "./Landing_media/satellitevid.mp4"
import "./index.css"

const feqData = [
    {
    question: 'What is SAST?',
    answer:
      "SAST — the Society for Aerospace and Space Technology — is where imagination meets innovation. 🚀It sounds like a sci-fi crew from a space movie (and honestly, it is), but it’s one of the most active and creative tech clubs on campus. From building satellites to launching open-source Challenge like Project Nebula, SAST is your launchpad if you’re curious about space, code, and collaborative chaos that somehow always leads to brilliance",
  },
  {
    question: 'What kind of projects can I work on?',
    answer:
      'You can contribute to the SAST website, coding platforms, dashboards, satellite data tools, authentication systems, and documentation centres.',
  },
  {
    question: 'What benefits do contributors receive?',
    answer:
      "Top contributors receive certificates, GitHub badges, social media shoutouts, and eligibility for core tech roles. All valid contributors get participation certificates and leaderboard points.",
  },

  {
    question: "How is performance tracked?",
    answer:
      "Each contribution earns points based on the type and quality of work. Weekly updates are published on the public leaderboard. A detailed breakdown of the scoring system and contribution types is available in the official documentation, which you can download directly from the Project Nebula website.",
  },
]

const FAQ = () => {
  return (
    <>
        <div className="eventsbg">
                <video autoPlay loop muted>
                  <source src={videoe1} />
                </video>
        </div>
        <section className="eventssec h-320 flex flex-col  items-center ">
            <div
              className="h-18 w-150 rounded-3xl flex justify-evenly items-center faq-content"
              style={{ marginTop: "11%", 
                boxShadow: "0px 4px 8px rgba(75,67,710.75)", 
                color: "#00FFFF"}}
            >
              <h1 style={{transform: "scale(2.2)" }}>Frequently Asked Questions</h1>
            </div>
            <div className="rounded-3xl faq-container"
            style={{ 
              marginTop: "1%", maxWidth: "75%", 
              boxShadow: "0px 4px 8px rgba(75,67,710.75)"}}>
                {feqData.map((item, index)=>(
                    <div key={index} className="faq">
                        <div className="question">
                            <h2 style={{fontSize: "2.5rem", 
                              fontWeight: "700", 
                              color: "#80BFFF"}}
                              >Q&gt; {item.question}</h2>
                        </div>
                        <div className="answer">
                            <p style={{fontSize: "2rem", 
                              fontWeight: "600", 
                              color: "#8A8686"}}
                              >&rarr; {item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>
  );
};

export default FAQ;