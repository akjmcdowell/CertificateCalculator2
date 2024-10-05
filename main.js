    // Fetch JSON data from GitHub
    fetch('https://raw.githubusercontent.com/akjmcdowell/CertificateCalculator/main/data.json') // Replace with your actual URL
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the JSON data for debugging
        // Call the function to populate the table with the fetched data
        populateTable(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    // Function to populate the table with data
    function populateTable(data) {
        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        
        // Clear existing data
        tableBody.innerHTML = '';

        // Loop through the data and create rows
        data.forEach(item => {
            const row = document.createElement('tr');

            // Create cells for each piece of data
            for (const key in item) {
                const cell = document.createElement('td');
                cell.textContent = item[key]; // Populate cell with data
                row.appendChild(cell); // Append cell to row
            }

            tableBody.appendChild(row); // Append row to table body
        });
    }