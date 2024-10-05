let jsonData = []; // Initialize an array to hold the JSON data

    // Fetch JSON data from GitHub
    fetch('https://raw.githubusercontent.com/akjmcdowell/CertificateCalculator/refs/heads/main/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        jsonData = data; // Store the data in the global variable
        console.log(jsonData); // Log the JSON data for debugging
        populateTable(jsonData); // Populate the table initially
        populateBrandFilter(jsonData); // Populate the brand filter
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    // Function to populate the table with data
    function populateTable(data) {
        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear existing data

        data.forEach(item => {
            const row = document.createElement('tr');
            for (const key in item) {
                const cell = document.createElement('td');
                cell.textContent = item[key]; // Populate cell with data
                row.appendChild(cell); // Append cell to row
            }
            tableBody.appendChild(row); // Append row to table body
        });
    }

    // Populate the dropdown with unique brands
    function populateBrandFilter(data) {
        const brandFilter = document.getElementById('brand-filter');
        const brands = [...new Set(data.map(item => item.Brand))]; // Get unique brands

        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option); // Append brand options to the dropdown
        });
    }

    // Filter data based on selected brand
    document.getElementById('brand-filter').addEventListener('change', function() {
        const selectedBrand = this.value;
        const filteredData = selectedBrand === 'all' ? jsonData : jsonData.filter(item => item.Brand === selectedBrand);
        populateTable(filteredData); // Update table with filtered data
    });