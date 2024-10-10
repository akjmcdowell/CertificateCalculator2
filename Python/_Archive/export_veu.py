from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Set up the WebDriver (Change the path to where your WebDriver is located)
driver = webdriver.Chrome()  # Update path

# Step 1: Go to the VEU registry
driver.get("https://www.veu-registry.vic.gov.au/Public/ProductRegistrySearch.aspx")

# # Wait until the page is fully loaded
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "ContentPlaceHolder1_btnExportXLSX")))

# # Step 2: Select "1D(18) & 3C - Water heater - Heat pump"
product_dropdown = driver.find_element(By.ID, "ContentPlaceHolder1_ActivityCMB_B-1")
product_dropdown.click()
time.sleep(1000)  # Wait for dropdown options to appear
# Wait for the option to be present, then click the desired option
product_option = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//option[text()='1D(18) & 3C - Water heater - Heat pump']")))
product_option.click()

# # Step 3: Select status "approved"
# status_dropdown = driver.find_element(By.ID, "ContentPlaceHolder1_ddlStatus")
# status_dropdown.click()
# time.sleep(10)  # Wait for dropdown options to appear
# approved_option = driver.find_element(By.XPATH, "//option[text()='Approved']")
# approved_option.click()

# Step 4: Click "Export to XLSX"
#export_button = driver.find_element(By.ID, "ContentPlaceHolder1_btnExportXLSX")
#export_button.click()

# Optional: Wait a few seconds to ensure the file is downloaded
time.sleep(10)
