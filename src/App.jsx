import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [petsData, setPetsData] = useState([]);

  //connect to api
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/pets");

        //update use state with sorted pet data
        setPetsData(
          data.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  const petList = petsData?.map((pet) => {
    return (
      <div key={pet.id} className="petsDiv">
        <p>{pet.id}</p>
        {/* highlight favorite pet */}
        <p className={pet.is_favourite ? "highlight" : "normal"}>{pet.name}</p>
      </div>
    );
  });

  return (
    <>
      <h1>Pet finder [{petsData.length}]<sup className="count">Count</sup> - Fullstack flow</h1>
      {/* display error message */}
      {petsData.length <= 0 ? (
        <p className="errorMessage">There are no pets to display.</p>
      ) : (
        ""
      )}
      <div className="petListContainer">
        <p className="message">Favorite pets are highlighted.</p>
        <div className="petListHeader">
          <p>PetId</p>
          <p>PetName</p>
        </div>
        {petList}
      </div>
    </>
  );
}

export default App;
