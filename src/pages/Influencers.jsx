import { useState } from "react";
import "../App";
import Influencer from "../components/Influencer";
import { v4 as uuidv4 } from "uuid";
import Addfluencer from "../components/AddInfluencer";
import EditInfluencer from "../components/EditInfluencer";

function Influencers() {
  const [influencers, setInfluencers] = useState([
    {
      id: 1,
      name: "jon",
      role: "events",
      img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      id: 2,
      name: "talo",
      role: "designer",
      img: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
    {
      id: 3,
      name: "safiya",
      role: "engineer",
      img: "https://images.pexels.com/photos/11606423/pexels-photo-11606423.jpeg",
    },
    {
      id: 4,
      name: "maryam",
      role: "outreach",
      img: "https://images.pexels.com/photos/15046702/pexels-photo-15046702/free-photo-of-portrait-of-a-woman-dressed-in-black.jpeg",
    },
    {
      id: 5,
      name: "mo",
      role: "accountant",
      img: "https://images.pexels.com/photos/18935840/pexels-photo-18935840/free-photo-of-portrait-of-a-man-wearing-black-shirt.jpeg",
    },
    {
      id: 6,
      name: "tim",
      role: "construction",
      img: "https://images.pexels.com/photos/12190564/pexels-photo-12190564.jpeg",
    },
    {
      id: 7,
      name: "aisha",
      role: "qa engineer",
      img: "https://images.pexels.com/photos/9380925/pexels-photo-9380925.jpeg",
    },
  ]);

  const showInfluencers = true;

  /* 
  defining function for updating influencer to be passed as property to => Influencer.jsx => EditInfluencer.jsx
  */
  function updateInfluencer(id, newName, newRole) {
    const updatedInfluencers = influencers.map((influencer) => {
      if (influencer.id == id) {
        return { ...influencer, name: newName, role: newRole };
      }
      return influencer;
    });
    setInfluencers(updatedInfluencers);
  }

  /* 
  defining function for adding new influencer to be passed as property to => AddInfluencer.jsx
  */
  function addInfluencer(name, role, img) {
    const newInfluencer = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setInfluencers([...influencers, newInfluencer]);
  }

  return (
    <div className="bg-gray-300 min-h-screen ">
      {showInfluencers ? (
        <div>
          <div className="flex flex-wrap justify-center">
            {influencers.map((influencer) => {
              const editInfluencer = (
                <EditInfluencer
                  id={influencer.id}
                  name={influencer.name}
                  role={influencer.role}
                  updateInfluencer={updateInfluencer}
                />
              );
              return (
                <Influencer
                  key={influencer.id}
                  id={influencer.id}
                  name={influencer.name}
                  role={influencer.role}
                  img={influencer.img}
                  editInfluencer={editInfluencer}
                />
              );
            })}
          </div>
          <Addfluencer addInfluencer={addInfluencer} />
        </div>
      ) : (
        <p>Influencers hidden</p>
      )}
    </div>
  );
}

export default Influencers;
