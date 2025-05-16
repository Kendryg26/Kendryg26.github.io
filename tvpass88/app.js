
async function cargarEventos() {
    const container = document.getElementById('eventos-container');
    try {
        const res = await fetch('eventos.json');
        const data = await res.json();

        container.innerHTML = '';
        data.forEach(dia => {
            const fechaTitulo = document.createElement('h2');
            fechaTitulo.textContent = dia.fecha;
            container.appendChild(fechaTitulo);

            dia.eventos.forEach(evento => {
                const div = document.createElement('div');
                div.className = 'evento';
                div.innerHTML = `<strong>${evento.nombre}</strong><br>Hora: ${evento.hora}<br>
                    <a href="${evento.enlaces.español}" target="_blank">Ver en Español</a>`;
                container.appendChild(div);
            });
        });
    } catch (error) {
        container.innerHTML = '<p>Error al cargar la cartelera.</p>';
    }
}
window.onload = cargarEventos;
