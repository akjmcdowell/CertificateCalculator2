    // Fetch JSON data from GitHub
    fetch('https://raw.githubusercontent.com/akjmcdowell/CertificateCalculator/refs/heads/main/data.json') // Replace with your actual URL
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the JSON data for debugging
        // Call the function to populate the table with the fetched data
        populateTable(data); // Populate the table initially
        populateBrandFilter(data); // Populate the brand filter
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

    // Populate the dropdown with unique brands
    function populateBrandFilter(data) {
        const brandFilter = document.getElementById('brand-filter');
        const brands = [...new Set(data.map(item => item.Brand))];

        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
    }

    // Function to populate the table with data
    function populateTable(data) {
        const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear existing data

        data.forEach(item => {
            const row = document.createElement('tr');
            for (const key in item) {
                const cell = document.createElement('td');
                cell.textContent = item[key];
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        });
    }

    // Filter data based on selected brand
    document.getElementById('brand-filter').addEventListener('change', function() {
        const selectedBrand = this.value;
        const filteredData = selectedBrand === 'all' ? jsonData : jsonData.filter(item => item.Brand === selectedBrand);
        populateTable(filteredData);
    });

