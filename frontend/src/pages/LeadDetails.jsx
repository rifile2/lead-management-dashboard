import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "./Navbar";


export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    api.get(`/leads/${id}`).then(res => setLead(res.data));
  }, [id]);

  if (!lead) return <p>Loading...</p>;

  return (
    <div>
      <h2>{lead.name}</h2>
      <p>{lead.email}</p>
      <p>{lead.company}</p>
      <p>Status: {lead.status}</p>
    </div>
  );
}
