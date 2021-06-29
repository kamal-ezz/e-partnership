import React, { useState, useEffect } from "react";
import { Container, Badge, Alert } from "react-bootstrap";
import axios from "axios";
import { useStoreState } from "easy-peasy";

function Activity() {
  const [activities, setActivities] = useState([]);
  const API_URL = "http://localhost:8000";
  const token = useStoreState((state) => state.userToken);

  useEffect(() => {
    const fetchActivities = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.auth_token}`,
        },
      };

      try {
        const { data } = await axios.get(API_URL + "/api/activities", config);
        console.log(data);
        //setConventions(data);
      } catch (err) {
        console.log(err);
      }
    };
  }, [API_URL, token]);

  return (
    <Container className="mt-5">
      {/*<Badge pill variant="info" className="p-2 mt-4">
        Lundi Juin, 16
      </Badge>
      <Alert variant="warning" className="mt-4 w-75">
        2.26 pm Kamal a signé un document
      </Alert>
      <Alert variant="warning" className="mt-4 w-75">
        2.26 pm Kamal a crée un document
  </Alert>*/}

      {activities.length > 0 ? (
        activities.map((activity, index) => (
          <div key={index}>
            <Badge pill variant="info" className="p-2 mt-4">
              {activity.date}
            </Badge>
            <Alert variant="warning" className="mt-4 w-75">
              {activity.type}
            </Alert>
          </div>
        ))
      ) : (
        <p>Pas encore d'activitiés</p>
      )}
    </Container>
  );
}

export default Activity;
