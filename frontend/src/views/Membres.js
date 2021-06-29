import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import axios from "axios";
import Membre from "./Membre";
import { Container } from "react-bootstrap";

function Membres() {
  const [membres, setMembres] = useState([]);

  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);

  useEffect(() => {
    const fetchMembres = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.auth_token}`,
        },
      };

      try {
        const { data } = await axios.get(API_URL + "/auth/users", config);
        setMembres(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMembres();
  }, [API_URL, token]);

  return (
    <Container className="d-flex">
      {membres.length > 0 ? (
        membres.map((membre) => (
          <Membre
            key={membre.id}
            id={membre.id}
            username={membre.username}
            occupation={membre.occupation}
            institution={membre.institution}
          />
        ))
      ) : (
        <p>Pas encore de membres</p>
      )}
    </Container>
  );
}

export default Membres;
