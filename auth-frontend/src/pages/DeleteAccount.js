import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DeleteAccount() {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado para excluir a conta.");
      return;
    }

    try {
      await axios.delete("http://localhost:8000/auth/delete-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Conta excluída com sucesso.");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      alert("Erro ao excluir conta: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Tem certeza que deseja excluir sua conta?</h2>
        <button onClick={handleDelete} style={styles.buttonRed}>
          Sim, excluir
        </button>
        <button onClick={() => navigate("/")} style={styles.button}>
          Cancelar
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
    fontSize: "20px",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "10px",
  },
  buttonRed: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "10px",
  },
};
