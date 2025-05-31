// src/pages/Register.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:8000/auth/register", {
                username,
                email,
                password,
            });
            alert("Usuário registrado com sucesso!");
            navigate("/login");
        } catch (error) {
            alert("Erro no registro: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Registre-se</h2>
                <input
                    type="text"
                    placeholder="Nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleRegister} style={styles.button}>Registrar</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
    },
    card: {
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
    },
    title: {
        marginBottom: "20px",
        textAlign: "center",
        fontSize: "24px",
        color: "#333",
    },
    input: {
        marginBottom: "15px",
        padding: "10px 14px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "12px",
        backgroundColor: "#10b981",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
};
