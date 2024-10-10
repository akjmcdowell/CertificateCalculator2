import requests
from bs4 import BeautifulSoup

# Define the URL for exporting the XLSX file
export_url = "https://www.veu-registry.vic.gov.au/Public/ProductRegistrySearch.aspx"

# Start a session
session = requests.Session()

# First, get the main page to retrieve VIEWSTATE and other necessary values
response = session.get(export_url)
soup = BeautifulSoup(response.text, 'html.parser')

# Prepare the payload for the export action
payload = {
    "__EVENTTARGET": "ContentPlaceHolder1_btnExportXLSX_CD",  # Simulate clicking the export button
    "__EVENTARGUMENT": "",
    "__VIEWSTATE": soup.find(id="__VIEWSTATE")['value'],
    "__VIEWSTATEGENERATOR": soup.find(id="__VIEWSTATEGENERATOR")['value'],
    "__EVENTVALIDATION": soup.find(id="__EVENTVALIDATION")['value'],
    "ContentPlaceHolder1_ddlProducts": "1D(18) & 3C - Water heater - Heat pump",  # Product selection
    "ContentPlaceHolder1_ddlStatus": "Approved"  # Status selection
}

# Send the POST request to export the XLSX
response = session.post(export_url, data=payload)

# Check if the response is successful and if the content is an Excel file
#if response.headers['Content-Type'] == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    # Save the downloaded file
with open('veu_products.xlsx', 'wb') as f:
    f.write(response.content)
print("Data has been exported to veu_products.xlsx.")
#else:
 #   print("Failed to download the file. Status Code:", response.status_code)
