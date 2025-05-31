// src/pages/Home.js
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("Sessão encerrada com sucesso");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Bem-vindo!</h1>

        <button
          onClick={() => navigate("/login")}
          style={{
            ...styles.button,
            backgroundColor: isLoggedIn ? "#cbd5e1" : "#6366f1",
            cursor: isLoggedIn ? "not-allowed" : "pointer",
          }}
          disabled={isLoggedIn}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            ...styles.button,
            backgroundColor: isLoggedIn ? "#cbd5e1" : "#10b981",
            cursor: isLoggedIn ? "not-allowed" : "pointer",
          }}
          disabled={isLoggedIn}
        >
          Registre-se
        </button>

        <button
          onClick={() => navigate("/delete")}
          style={{
            ...styles.button,
            backgroundColor: isLoggedIn ? "#f59e0b" : "#cbd5e1",
            cursor: isLoggedIn ? "pointer" : "not-allowed",
          }}
          disabled={!isLoggedIn}
        >
          Excluir minha conta
        </button>

        <button
          onClick={handleLogout}
          style={{
            ...styles.button,
            backgroundColor: isLoggedIn ? "#ef4444" : "#cbd5e1",
            cursor: isLoggedIn ? "pointer" : "not-allowed",
          }}
          disabled={!isLoggedIn}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f6",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
  },
  button: {
    display: "block",
    width: "200px",
    padding: "12px",
    margin: "10px auto",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    color: "white",
  },
};
