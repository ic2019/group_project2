## Data Visualization project.

## US Fortune 500 Financial Data Analysis.

![cover](fortune500/static/img/cover.png)

## Background

In this project, we have created a web application using Flask, Python, PostgreSQL  and different JavaScript libraries to render various visualizations and interactive charts, that would allow individuals visiting our website the opportunity to analyze US Fortune 500 companies, their stock price, and the financials associated with them. We hope that our website arms potential investors with the data they need to make financial investment decisions.

#### Following analysis are done.

  - Are companies making bigger revenue makes bigger profits? Correlation between Revenue Vs Profit and Profit Margin (Top 10 Fortune 500)
  - Correlation between Per employee Revenue and Profit. ((Top 10 Fortune 500))
  - Findinging the profit margin (  Profit / Revenue). (Top 10 Fortune 500)
  - Percentage of revenue and profit of each industry per sector.
  - Stock trend /correlation analysis.
  - Using map to represent all Fortune 500 companies and their key financial data.

  ## Tasks
  ### Extract / Transform / Load

  #### Extract
  
  We have used Fortune 1000 dataset from [Kaggle](https://www.kaggle.com/Eruditepanda/fortune-1000-2018) to perform the analysis.

  ### Transform

  We decided to extract first 500 records only based on ranking and then using S&P dataset from [DataPub](https://datahub.io/core/s-and-p-500-companies), updated the dataset with stock ticker info so that stock analysis can also be performed. Also performed cleaning and transforming like removing null values, converting string objects to float objects etc..

  Also created an new table for storing the aggregated data of revenue and profit percentages per sector for all industries.

  **Original Data Schema**
   
  ![original_schema](fortune500/static/img/etl/original_schema.png)

  **New Data Schema**
  
  
  ![new_schema](fortune500/static/img/etl/new_schema.png)

  ### Load

  **PostgreSQL tables created**

  _[SQL Schema](fortune500/misc/Scripts/schema.sql)_ for schema creation.

  ### Logical Diagram

  ![logdia](fortune500/static/img/logical.png)

  All the etl process has been added to [etl.py](fortune500/etl.py) and this script will be called in app.py under _before_first_request_ route so that data is written to the database before any web page is rendered.

  ### Home Page

  ![home](fortune500/static/img/home.png)

  ### Charts/Visualization

  **Languages/Libraries used**

  _Flask, Python, JavaScript, D3.js, Plotly, Chart.js, JQuery_

  1. Revenue / Profit Analysis ( Top 10 Fortune 500 Companies)

  ![bar](fortune500/static/img/bar.gif)

  ![bar_pm](fortune500/static/img/bar_pm.gif)

  2. Revenue / Profit Analysis Per employee ( Top 10 Fortune 500 Companies)

  ![bar_pe](fortune500/static/img/bar_pe.gif)

  3. Sector Analysis

  ![sector](fortune500/static/img/sector.gif)

  4. Stock Trend Analysis

  ![stock](fortune500/static/img/stock.gif)

  5. Map of US with all Fortune 500 companies and their financial data.

  ![map](fortune500/static/img/map.gif)

  ### Resources

  [Kaggle](https://www.kaggle.com/Eruditepanda/fortune-1000-2018)

  [Quandl](https://www.quandl.com/)

  [DataPub](https://datahub.io/core/s-and-p-500-companies)

  ### How to use this app.

  1. Clone this repo.

  2. activate your python virtual enviornement or create a new one. Install all dependencies using _pip install -r requirements.txt_

  3. Create a local postgresql database named _fortune500_db_ and run [SQL Schema](fortune500/misc/Scripts/schema.sql) to create a schema for this project.

  4. Change to project folder _cd group2_project\fortune500_

  6. Update _config.py_  with your Quandl API key and postgres local username and password.

  7. Update _static\js\config.js_ with your Quandl API key and Mapbox API Key.

  8. Run _python app.py_
 

  

  
  







  











  





