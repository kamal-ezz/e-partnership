import React, { useState, useEffect } from "react";
import { Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import axios from "axios";

function Convention({ match }) {
  const [conventions, setConventions] = useState([
    /*
     {
      id: 1,
      titre: "Exemple 1",
      etat: "signé",
      avec: "Kamal Souidiri",
      dernier_modification: "Aujourdui",
    },
    {
      id: 2,
      titre: "Exemple 1",
      etat: "signé",
      avec: "Kamal Souidiri",
      dernier_modification: "Aujourdui",
    },
    {
      id: 3,
      titre: "Exemple 1",
      etat: "signé",
      avec: "Kamal Souidiri",
      dernier_modification: "Aujourdui",
    },*/
  ]);

  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);
  const keyword = match.params.keyword;

  useEffect(() => {
    const fetchConventions = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.auth_token}`,
        },
      };

      try {
        if (keyword) {
          const { data } = await axios.get(
            API_URL + `/api/search?keyword=${keyword}`,
            config
          );
          setConventions(data);
        } else {
          const { data } = await axios.get(
            API_URL + `/api/conventions`,
            config
          );
          setConventions(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchConventions();
  }, [API_URL, token]);

  const formatDate = (date) => {
    const a = date.split("T")[0];
    const b = date.split("T")[1].slice(0, 5);
    return `${a}  ${b}`;
  };

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
          <th>Etat</th>
          <th>Avec</th>
          <th>Dernier modification</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {conventions.map((convention) => (
          <tr key={convention.id}>
            <td>
              <Link to={`/convention/${convention.id}`}>
                {convention.titre}{" "}
              </Link>
            </td>
            <td>
              <Badge variant="primary">{convention.etat}</Badge>
            </td>
            <td>{convention.institution_b}</td>
            <td>{formatDate(convention.dernier_modification)}</td>
            <td>
              <Link to={`/edit-convention/${convention.id}`}>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="ml-3"
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Convention;
