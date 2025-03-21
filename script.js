async function getIPInfo() {
    const ip = document.getElementById("target").value;
    if (!ip) {
        alert("Introduce una IP.");
        return;
    }

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();

        if (data.status === "fail") {
            document.getElementById("result").innerText = "Error: " + data.message;
            return;
        }

        // Mostrar datos
        document.getElementById("result").innerHTML = `
            <strong>IP:</strong> ${data.query} <br>
            <strong>País:</strong> ${data.country} <br>
            <strong>Región:</strong> ${data.regionName} <br>
            <strong>Ciudad:</strong> ${data.city} <br>
            <strong>ISP:</strong> ${data.isp} <br>
            <strong>Latitud:</strong> ${data.lat} | <strong>Longitud:</strong> ${data.lon}
        `;

        // Mostrar mapa con ubicación
        const map = L.map('map').setView([data.lat, data.lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([data.lat, data.lon]).addTo(map)
            .bindPopup(`Ubicación de ${data.query}`)
            .openPopup();

    } catch (error) {
        document.getElementById("result").innerText = "Error en la consulta.";
    }
}
