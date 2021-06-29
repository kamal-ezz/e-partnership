import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useStoreState } from "easy-peasy";
import axios from "axios";

function Deadline() {
  const [conventions, setConventions] = useState([
    /*
    {
      id: 1,
      titre: "Exemple 1",
      avec: "Kamal Souidiri",
      deadline: "Aujourdui",
    },
    {
      id: 2,
      titre: "Exemple 1",
      avec: "Kamal Souidiri",
      deadline: "Aujourdui",
    },
    {
      id: 3,
      titre: "Exemple 1",
      avec: "Kamal Souidiri",
      deadline: "Aujourdui",
    },*/
  ]);

  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);

  useEffect(() => {
    const fetchConventions = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.auth_token}`,
        },
      };

      try {
        const { data } = await axios.get(API_URL + "/api/conventions/", config);
        setConventions(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchConventions();
  }, [API_URL, token]);

  return (
    <Table
      striped
      bordered
      hover
      responsive
      className="mt-5"
      style={{ width: "90%" }}
    >
      <thead>
        <tr>
          <th>Titre</th>
          <th>Avec</th>
          <th>Deadline</th>
        </tr>
      </thead>
      <tbody>
        {conventions.map((convention) => (
          <tr key={convention.id}>
            <td>{convention.titre}</td>
            <td>{convention.institution_b}</td>
            <td>{convention.date_fin}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Deadline;
