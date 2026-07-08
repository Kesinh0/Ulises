import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import cookies from "js-cookie";
import admin from "../assets/Admin.png";
import ProfeManager from "../components/ProfeManager";
import VehiculoManager from "../components/VehiculoManager";

const TABS = [
  { 
    id: "profes", 
    label: "Administracion Profesores", 
    component: ProfeManager },
  {
    id: "vehiculos",
    label: "Administracion Vehiculos",
    component: VehiculoManager,
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(TABS[0].id);

  const TabComponent = TABS.find((t) => t.id === tabActiva)?.component;
  return (
    <div className="right" id="right">
      <h1>Secretaria</h1>

      <div className="Admin">
        <img src={admin} alt="admin" className="admin-image" />
        <p>Bienvenido (admin)</p>
        <div className="tabs-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${tabActiva === tab.id ? "active" : ""}`}
              onClick={() => setTabActiva(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">{TabComponent && <TabComponent />}</div>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default Admin;
