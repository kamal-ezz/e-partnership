import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";

function Membre({ id, username, occupation, institution }) {
  return (
    <Card style={{ width: "16rem", marginTop: 20, marginLeft: 30 }}>
      <Card.Body>
        <Card.Body>
          <div className="d-flex flex-column align-items-center text-center">
            <Image
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="User"
              roundedCircle
              width={150}
            />
            <div className="mt-3">
              <Link
                to={{
                  pathname: "/profile",
                  state: {
                    id,
                  },
                }}
              >
                <h4>{username}</h4>
              </Link>
              <p className="text-secondary mb-1">{occupation}</p>
              <p className="text-muted font-size-sm">{institution}</p>
            </div>
          </div>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}

export default Membre;
