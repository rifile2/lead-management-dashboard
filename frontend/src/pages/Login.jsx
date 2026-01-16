import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ ANY EMAIL + PASSWORD ALLOWED
    if (email.trim() && password.trim()) {
      navigate("/dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="title">Lead Management Dashboard</h2>
        <p className="subtitle">Demo Login (Any credentials allowed)</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="demo">
          You can enter <b>any email & password</b>
        </p>
      </form>

      {/* Inline CSS */}
      <style>{`
        .login-container {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e3a8a, #0f172a);
        }

        .login-card {
          background: #ffffff;
          padding: 35px;
          width: 340px;
          border-radius: 12px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .title {
          text-align: center;
          margin-bottom: 6px;
          color: #1e293b;
        }

        .subtitle {
          text-align: center;
          margin-bottom: 20px;
          font-size: 14px;
          color: #64748b;
        }

        input {
          width: 100%;
          padding: 11px;
          margin-bottom: 14px;
          border: 1px solid #cbd5f5;
          border-radius: 6px;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #2563eb;
        }

        button {
          width: 100%;
          padding: 11px;
          background: #2563eb;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          cursor: pointer;
        }

        button:hover {
          background: #1d4ed8;
        }

        .demo {
          margin-top: 14px;
          font-size: 12px;
          text-align: center;
          color: #475569;
        }
      `}</style>
    </div>
  );
}
