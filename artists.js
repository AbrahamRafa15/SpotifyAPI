function addArtistInfo(section, artist) {
    const card = document.createElement("div");
    card.className = "card mb-3 bg-dark text-light";
    card.style.maxWidth = "640px";

    const row = document.createElement("div");
    row.className = "row g-0";

    const cuerpo = document.createElement("div");
    cuerpo.className = "col-md-8";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const nombre = document.createElement("h4");
    nombre.className = "card-title";
    nombre.textContent = artist.name;

    const equalizador = document.createElement("div");
    equalizador.className = "equalizer mb-3";
    equalizador.appendChild(document.createElement("span"));
    equalizador.appendChild(document.createElement("span"));
    equalizador.appendChild(document.createElement("span"));
    equalizador.appendChild(document.createElement("span"));
    equalizador.appendChild(document.createElement("span"));

    const seguidores = document.createElement("p");
    seguidores.className = "card-text";
    seguidores.textContent = `Seguidores: ${artist.followers.total.toLocaleString()}`;

    const genero = document.createElement("p");
    genero.className = "card-text";
    genero.textContent = `Género(s): ${artist.genres.join(", ") || "No disponible"}`;

    const popularidad = document.createElement("p");
    popularidad.className = "card-text";
    popularidad.textContent = `Popularidad: ${artist.popularity}`;

    const externo = document.createElement("a");
    externo.href = artist.external_urls.spotify;
    externo.target = "_blank";
    externo.rel = "noopener noreferrer";
    externo.textContent = "Ver en Spotify";
    externo.className = "btn btn-success mb-2";

    cardBody.appendChild(nombre);
    cardBody.appendChild(equalizador);
    cardBody.appendChild(seguidores);
    cardBody.appendChild(genero);
    cardBody.appendChild(popularidad);
    cardBody.appendChild(externo);
    cuerpo.appendChild(cardBody);
    row.appendChild(cuerpo);
    card.appendChild(row);

    const imagen = document.createElement("div");
    imagen.className = "col-md-4 d-flex align-items-center";
    
    const img = document.createElement("img");
    img.src = artist.images[0]?.url || "";
    img.alt = "Imagen de " + artist.name + " no disponible";
    img.className = "img-fluid rounded-start";
    
    imagen.appendChild(img);
    row.appendChild(imagen);

    section.appendChild(card);
}

document.getElementById("obtener-artista").addEventListener("click", async () => {
    const token = document.getElementById("token").value.trim();
    const artistID = document.getElementById("artist-id").value.trim();

    const section = document.getElementById("artist-info");
    section.innerHTML = "";

    const loading = document.createElement("p");
    loading.textContent = "Cargando...";
    section.appendChild(loading);

    try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const artist = await response.json();
        console.log(artist);
        section.innerHTML = "";
        addArtistInfo(section, artist);

    }
    catch (err) {
        section.innerHTML = "";
        const error = document.createElement("p");
        const aux = err.message;
        error.textContent = "Error al obtener los datos del artista. " + aux;
        error.style.color = "red";
        section.appendChild(error);
        return;
    }
});