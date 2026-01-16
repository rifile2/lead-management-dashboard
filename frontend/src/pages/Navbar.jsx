import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <div style={styles.navbar}>
      <h3 style={styles.logo}>Lead CRM</h3>

      <div style={styles.links}>
        <Link style={styles.link} to="/dashboard">Dashboard</Link>
        <Link style={styles.link} to="/leads">Leads</Link>
        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "#0f172a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    marginRight: "15px",
    textDecoration: "none",
    fontSize: "15px",
  },
  logout: {
    background: "#ef4444",
    border: "none",
    padding: "6px 12px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
