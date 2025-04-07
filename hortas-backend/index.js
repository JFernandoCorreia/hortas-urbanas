require("dotenv").config();
const express = require("express");
const helmet = require("helmet");

const userRoutes = require("./src/routes/userRoutes");
const hortaRoutes = require("./src/routes/hortaRoutes");
const tarefaRoutes = require("./src/routes/tarefaRoutes");
const plantaRoutes = require("./src/routes/plantaRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

// Configurações globais
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api", userRoutes);
app.use("/api", hortaRoutes);
app.use("/api", tarefaRoutes);
app.use("/api", plantaRoutes);
app.use("/api/auth", authRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

// Porta do frontend
const cors = require("cors");
app.use(
  cors({
    origin: '*', // Alterar se necessário
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
