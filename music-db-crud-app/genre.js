//Jiu Chen
//6/8/2023



// Listen for the form submission event
document.querySelector('#searchGenreForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const genre = formData.get('genre');
    fetch(`/songs/genre/${encodeURIComponent(genre)}`)
    .then(response => response.json())
    .then(songs => {
        const div = document.querySelector('#songs');
        div.innerHTML = '';  
        songs.forEach(song => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>Title:</strong> ${song.title} <br>
                           <strong>Artist:</strong> ${song.artist} <br>
                           <strong>Album:</strong> ${song.album} <br>
                           <strong>Genre:</strong> ${song.genre} <br>
                           <strong>Year:</strong> ${song.year}`;
            div.appendChild(p);
        });
    })
    .catch(error => console.error(error));
});
