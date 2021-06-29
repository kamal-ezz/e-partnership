import React from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  faFileSignature,
  faIdBadge,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function Sidebar() {
  const history = useHistory();

  const disconnect = (e) => {
    localStorage.removeItem("loginToken");
    alert("Vous êtes déconncté");
    history.push("/");
  };

  return (
    <div>
      <ProSidebar style={{ height: "100vh", width: "20%" }}>
        <Menu iconShape="square">
          <MenuItem>
            <Button style={{ backgroundColor: "deeppink", border: "none" }}>
              <Link to="/new-convention">Nouvelle Convention</Link>
            </Button>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faFileSignature} />}>
            <Link to="/conventions">Mes Conventions</Link>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faClock} />}>
            <Link to="/activities">Mes Activités</Link>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faNewspaper} />}>
            <Link to="/deadline">Délais</Link>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faIdBadge} />}>
            <Link to="/profile">Mon Profile</Link>
          </MenuItem>
          <MenuItem
            onClick={disconnect}
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
          >
            Se déconnecter
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
