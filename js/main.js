document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const campaignSection = document.getElementById("campaign-section");
    const campaignViewSection = document.getElementById("campaign-view-section");
    const campaignTableBody = document.querySelector("#campaign-table tbody");

    // Función para cargar campañas desde el backend
    function loadCampaigns() {
        fetch("http://localhost:5000/campanas")
            .then(response => response.json())
            .then(campanas => {
                campaignTableBody.innerHTML = ""; // Limpiar la tabla
                campanas.forEach(campaign => {
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${campaign.nombre}</td>
                        <td>${campaign.descripcion}</td>
                        <td>${campaign.palabras_clave}</td>
                        <td>${campaign.estado}</td>
                        <td>
                            <button onclick="editCampaign(${campaign.id})">Editar</button>
                            <button onclick="deleteCampaign(${campaign.id})">Eliminar</button>
                        </td>
                    `;

                    campaignTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error al cargar campañas:", error));
    }

    // Función para editar una campaña
    window.editCampaign = function(id) {
        const campaignData = {
            nombre: prompt("Nuevo nombre de la campaña:"),
            descripcion: prompt("Nueva descripción:"),
            palabras_clave: prompt("Nuevas palabras clave:"),
            categoria: prompt("Nueva categoría:"),
            estado: prompt("Nuevo estado:"),
            intervalo: parseInt(prompt("Nuevo intervalo (minutos):"))
        };

        fetch(`http://localhost:5000/campanas/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(campaignData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadCampaigns(); // Recarga las campañas
        })
        .catch(error => console.error("Error al editar la campaña:", error));
    }

    // Función para eliminar una campaña
    window.deleteCampaign = function(id) {
        if (confirm("¿Estás seguro de que deseas eliminar esta campaña?")) {
            fetch(`http://localhost:5000/campanas/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadCampaigns(); // Recarga las campañas
            })
            .catch(error => console.error("Error al eliminar la campaña:", error));
        }
    }

    // Manejador de envío del formulario de inicio de sesión
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita el envío del formulario

        // Simulación del inicio de sesión
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username && password) {
            alert("Inicio de sesión exitoso!");

            // Oculta la sección de inicio de sesión y muestra la sección de campaña
            loginForm.style.display = "none";
            campaignSection.style.display = "block";
            campaignViewSection.style.display = "block"; // Muestra la sección de visualización de campañas

            loadCampaigns(); // Carga las campañas en la tabla
        } else {
            alert("Por favor, ingrese su usuario y contraseña.");
        }
    });

    // Manejador de envío del formulario de configuración de campaña
    const campaignForm = document.getElementById("campaign-form");
    campaignForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Datos de la nueva campaña
        const campaignData = {
            nombre: document.getElementById("campaign-name").value,
            descripcion: document.getElementById("description").value,
            palabras_clave: document.getElementById("keywords").value,
            categoria: document.getElementById("category").value,
            estado: "Pendiente",
            intervalo: parseInt(document.getElementById("interval").value)
        };

        // Enviar la campaña al backend
        fetch("http://localhost:5000/campanas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(campaignData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            campaignForm.reset(); // Reinicia el formulario
            loadCampaigns(); // Recarga la lista de campañas
        })
        .catch(error => console.error("Error al crear la campaña:", error));
    });
});
