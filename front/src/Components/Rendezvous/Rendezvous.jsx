import React, { useEffect, useState } from "react";
import "./Rendezvous.css";
import Setting from "../Setting/Setting";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function Rendezvous() {
  const [loggeduserid] = useState(localStorage.getItem("userId") || "");
  const [role] = useState(localStorage.getItem("role") || "");
  const [listrdv, setlistrdv] = useState([]);

  const fetchRdv = async () => {
    if (!loggeduserid) {
      console.log("UserId is required");
      return;
    }
    try {
      let response;
      if (role === "client") {
        response = await axios.get(
          `http://localhost:4000/getLoggedRdv?loggeduserid=${loggeduserid}`
        );
      } else {
        response = await axios.get(
          `http://localhost:4000/getProfRdv?loggeduserid=${loggeduserid}`
        );
      }
      const data = response.data;
      if (data && data.length > 0) {
        setlistrdv(data);
      } else {
        console.log("Aucun Rendez-vous");
        setlistrdv([]);
      }
    } catch (error) {
      console.error("Error fetching rendezvous:", error);
    }
  };

  useEffect(() => {
    fetchRdv();
  }, [loggeduserid, role]);

  const DeleteRdv = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/deleteRdv/${id}`
      );
      if (response.status === 200) {
        fetchRdv();
      }
    } catch (error) {
      console.error("Error deleting rendezvous:", error);
    }
  };
  return (
    <div className="profil-content">
      <div>
        <Setting />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nom Client</th>
              <th>Prénom Client</th>
              <th>Nom Profesionnel</th>
              <th>Prénom Profesionnel</th>
              <th>Profession</th>
              <th>Date RDV</th>
              <th>Heure RDV</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listrdv && listrdv.length > 0 ? (
              listrdv.map((item, index) => (
                <tr key={index}>
                  <td>{item.clientNom}</td>
                  <td>{item.clientprenom}</td>
                  <td>{item.professionalNom}</td>
                  <td>{item.professionalPrenom}</td>
                  <td>{item.professionalMetier}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td className="removebtn">
                    <MdDelete
                      color="red"
                      size={"30px"}
                      onClick={() => DeleteRdv(item._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
