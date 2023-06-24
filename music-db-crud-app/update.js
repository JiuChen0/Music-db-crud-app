//Jiu Chen
//6/8/2023



// Add an event listener to the form to run when it is submitted
document.querySelector('#updateSongForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target); // Grab the data from the form
    const data = Object.fromEntries(formData); // Convert the form data to an object
    const id = data.id; // Grab the song ID from the data
    delete data.id;
    // Send a PUT request to the server to update the song
    fetch(`/songs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(song => console.log(song)) // Log the response to the console
    .catch(error => console.error(error)); // Log any errors to the console
});


// Add an event listener to the button to run when it is clicked
document.querySelector('#getSongs').addEventListener('click', getSongList);

// Define a function to get the list of songs from the server and update the table
function getSongList() {
    // Send a GET request to the server for the song list
    fetch('/songs')
    .then(response => response.json())
    .then(songs => {
      const tbody = document.querySelector('#songsTable tbody');
      tbody.innerHTML = '';
      songs.forEach(song => {// For each song in the song list
        const tr = document.createElement('tr');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {// Add an event listener to the button to run when it is clicked
            fetch(`/songs/${song._id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                getSongList();
            })
            .catch(error => console.error(error));
        });

        tr.innerHTML = `
            <td>${song._id}</td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.album}</td>
            <td>${song.genre}</td>
            <td>${song.year}</td>
        `;
        tr.appendChild(deleteButton);// Add the delete button to the row
        tbody.appendChild(tr);
      });
    })
    .catch(error => console.error(error));
}
// Get the song list when the page loads
getSongList();
