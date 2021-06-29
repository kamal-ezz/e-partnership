import React, { useState, useEffect } from "react";
import { Table, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

function Convention() {
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

  const download = () => {
    /*let doc = new jsPDF("p", "pt");
    doc.setFontType("bold");
    doc.text(20, 20, context.title);
    doc.setFontType("normal");
    doc.text(20, 30, context.context);

    articles.forEach((article, index) => {
      let i = index + 40;
      doc.setFontType("bold");
      doc.text(20, i, article.title);
      doc.setFontType("noraml");
      doc.text(20, i + 20, article.content);
    });

    doc.save("convention.pdf");*/
  };

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
            <td>{convention.titre}</td>
            <td>
              <Badge variant="primary">{convention.etat}</Badge>
            </td>
            <td>{convention.institution_b}</td>
            <td>{formatDate(convention.dernier_modification)}</td>
            <td>
              <FontAwesomeIcon
                onClick={download}
                icon={faDownload}
                style={{ cursor: "pointer" }}
              />
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
