import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Influencer from "./components/Influencer";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [role, setRole] = useState("pet food");

  const [influencers, setInfluencers] = useState([
    {
      name: "jon",
      role: "events",
      img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      name: "talo",
      role: "designer",
      img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
    {
      name: "safiya",
      role: "engineer",
      img: "https://images.pexels.com/photos/11606423/pexels-photo-11606423.jpeg",
    },
    {
      name: "maryam",
      role: "outreach",
      img: "https://images.pexels.com/photos/15046702/pexels-photo-15046702/free-photo-of-portrait-of-a-woman-dressed-in-black.jpeg",
    },
    {
      name: "mo",
      role: "accountant",
      img: "https://images.pexels.com/photos/18935840/pexels-photo-18935840/free-photo-of-portrait-of-a-man-wearing-black-shirt.jpeg",
    },
    {
      name: "tim",
      role: "construction",
      img: "https://images.pexels.com/photos/12190564/pexels-photo-12190564.jpeg",
    },
    {
      name: "aisha",
      role: "qa engineer",
      img: "https://images.pexels.com/photos/9380925/pexels-photo-9380925.jpeg",
    },
  ]);

  const showInfluencers = true;

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {showInfluencers ? (
        <div>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />
          <div className="flex flex-wrap justify-center">
            {influencers.map((influencer) => {
              return (
                <Influencer
                  key={uuidv4()}
                  name={influencer.name}
                  role={influencer.role}
                  img={influencer.img}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <p>Influencers hidden</p>
      )}
    </>
  );
}

export default App;
