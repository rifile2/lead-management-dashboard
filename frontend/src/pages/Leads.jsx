import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 10;

  const fetchLeads = async () => {
    const res = await api.get("/leads", {
      params: { search, status, page, limit },
    });
    setLeads(res.data.leads);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Leads</h2>

        {/* 🔍 Search & Filter */}
        <div style={styles.filters}>
          <input
            style={styles.input}
            placeholder="Search name, email or company"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          <select
            style={styles.select}
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* 📋 Table */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((l) => (
                <tr key={l._id}>
                  <td>{l.name}</td>
                  <td>{l.email}</td>
                  <td>{l.company}</td>
                  <td>
                    <span style={{ ...styles.badge, ...statusColor[l.status] }}>
                      {l.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/leads/${l._id}`} style={styles.viewBtn}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📄 Pagination */}
        <div style={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

const statusColor = {
  new: { background: "#2563eb" },
  contacted: { background: "#f59e0b" },
  converted: { background: "#16a34a" },
  lost: { background: "#dc2626" },
};

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
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    padding: "8px",
    width: "250px",
  },
  select: {
    padding: "8px",
  },
  tableWrapper: {
    background: "#fff",
    borderRadius: "8px",
    overflowX: "auto",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  badge: {
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    textTransform: "capitalize",
  },
  viewBtn: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "500",
  },
  pagination: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
};
