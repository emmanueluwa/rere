import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Influencer from "./components/Influencer";

function App() {
  const [role, setRole] = useState("pet food");

  const [influencers, setInfluencers] = useState([
    {
      name: "fulo",
      role: "builder",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      name: "fulo",
      role: "builder",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      name: "fulo",
      role: "builder",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      name: "fulo",
      role: "builder",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      name: "fulo",
      role: "builder",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      name: "fulo",
      role: "builder",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
    },
    {
      name: "fulo",
      role: "builder",
      img: "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg",
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
            <Influencer
              name="fulo"
              role="builder"
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="usman"
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="esa"
              role={role}
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="fulo"
              role="builder"
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="usman"
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="esa"
              role={role}
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="fulo"
              role="builder"
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="usman"
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer name="esa" role={role} />
            <Influencer
              name="fulo"
              role="builder"
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="usman"
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
            <Influencer
              name="esa"
              role={role}
              img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"
            />
          </div>
        </div>
      ) : (
        <p>Influencers hidden</p>
      )}
    </>
  );
}

export default App;
