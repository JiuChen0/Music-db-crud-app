//Jiu Chen
//6/8/2023



// Add an event listener to the form with id 'addSongForm'
document.querySelector('#addSongForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // Send a POST request to the /songs endpoint with the form data
    fetch('/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Convert the form data object to a JSON string
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});
// Add an event listener to the button with id 'getSongs'
document.querySelector('#getSongs').addEventListener('click', function() {
    // Send a GET request to the /songs endpoint
  fetch('/songs')
  .then(response => response.json())
  .then(songs => {
    const tbody = document.querySelector('#songsTable tbody');
    tbody.innerHTML = '';
    // Iterate over each song in the response
    songs.forEach(song => {
        const tr = document.createElement('tr');
        // Set the inner HTML of the row to the song data
        tr.innerHTML = `
        <td>${song.title}</td>
        <td>${song.artist}</td>
        <td>${song.album}</td>
        <td>${song.genre}</td>
        <td>${song.year}</td>
        `;
        tbody.appendChild(tr);
        });
  })
  .catch(error => console.error(error));
});