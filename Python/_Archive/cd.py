from selenium import webdriver

# Specify the path to ChromeDriver if not in PATH
driver = webdriver.Chrome()  # Make sure this path is correct


# Open a webpage
driver.get('https://www.facebook.com')

