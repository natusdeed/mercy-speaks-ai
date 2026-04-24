import { useEffect, useState } from "react";

const AdminGate = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("msd_admin_auth");
    if (storedAuth === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem("msd_admin_auth", "true");
      setIsAuthorized(true);
      setShowError(false);
      return;
    }

    setShowError(true);
  };

  if (isAuthorized) {
    return children;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#080b12",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#0d1117",
          border: "1px solid #1e293b",
          borderRadius: "12px",
          padding: "48px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#e2e8f0",
            fontSize: "16px",
            fontWeight: 800,
            letterSpacing: "2px",
            textAlign: "center",
          }}
        >
          MERCY SPEAKS DIGITAL
        </h1>

        <p
          style={{
            marginTop: "12px",
            marginBottom: "24px",
            color: "#6b7280",
            fontSize: "11px",
            letterSpacing: "1.5px",
            textAlign: "center",
          }}
        >
          Internal Agency Tool — Authorized Access Only
        </p>

        <input
          type="password"
          placeholder="Enter access code"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (showError) {
              setShowError(false);
            }
          }}
          style={{
            width: "100%",
            background: "#080b12",
            border: "1px solid #1e293b",
            color: "#e2e8f0",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "12px",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #00d4ff, #0ea5e9)",
            color: "#0a0a0f",
            fontWeight: 800,
            letterSpacing: "2px",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ENTER
        </button>

        {showError && (
          <p
            style={{
              marginTop: "12px",
              marginBottom: 0,
              color: "#ef4444",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Access denied. Try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminGate;
