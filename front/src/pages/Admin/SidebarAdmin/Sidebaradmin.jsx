import React from "react";
import "./Sidebaradmin.css";
import { Link } from "react-router-dom";
import clients from "../../../Assets/clients.png";
import profs from "../../../Assets/profs.png";

export default function Sidebaradmin() {
  return (
    <div className="sidebar">
      <Link to="/ListProfs">
        <div className="sidebar-item">
          <img src={profs} alt="" />
          <p>Profesionnels</p>
        </div>
      </Link>
      <Link to="/ListClients">
        <div className="sidebar-item">
          <img src={clients} alt="" />
          <p>Clients</p>
        </div>
      </Link>
    </div>
  );
}