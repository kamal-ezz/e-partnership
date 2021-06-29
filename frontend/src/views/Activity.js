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
        const { data } = await axios.get(API_URL + "/api/activities/", config);
        console.log(data);
        setActivities(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchActivities();
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
        <Badge
          pill
          variant="info"
          className="px-3 py-2 mt-4"
          style={{ fontSize: 15 }}
        >
          {activities[0].date.split("T")[0]}
        </Badge>
      ) : (
        ""
      )}

      {activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id}>
            <Alert variant="warning" className="mt-4 w-75">
              {activity.type === "creation"
                ? `${activity.date
                    .split("T")[1]
                    .slice(0, 5)} Vous avez créer une convention`
                : ""}
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
