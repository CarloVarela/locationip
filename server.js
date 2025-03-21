const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Sirve archivos estáticos

// Ruta para escanear con Nmap
app.post("/scan", (req, res) => {
    const { target, ports } = req.body;

    if (!target || !ports) {
        return res.status(400).json({ error: "Debes proporcionar un objetivo y puertos." });
    }

    console.log(`📡 Escaneando ${target} en puertos: ${ports}...`);

    exec(`nmap -sS -p ${ports} ${target}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            return res.status(500).json({ error: stderr });
        }
        res.json({ result: stdout });
    });
});

// Página de inicio
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
