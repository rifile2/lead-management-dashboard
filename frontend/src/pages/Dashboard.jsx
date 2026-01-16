import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [converted, setConverted] = useState(0);
  const [newLeads, setNewLeads] = useState(0);

  useEffect(() => {
    api.get("/leads").then(res => setTotal(res.data.total));
    api.get("/leads", { params: { status: "converted" } })
      .then(res => setConverted(res.data.total));
    api.get("/leads", { params: { status: "new" } })
      .then(res => setNewLeads(res.data.total));
  }, []);

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Dashboard Overview</h2>

        <div style={styles.cards}>
          <div style={{ ...styles.card, background: "#2563eb" }}>
            <h3>Total Leads</h3>
            <p>{total}</p>
          </div>

          <div style={{ ...styles.card, background: "#16a34a" }}>
            <h3>Converted Leads</h3>
            <p>{converted}</p>
          </div>

          <div style={{ ...styles.card, background: "#f97316" }}>
            <h3>New Leads</h3>
            <p>{newLeads}</p>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "25px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    color: "#1e293b",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
};
