from flask import Flask, render_template, jsonify
import pandas as pd
import re
import numpy as np
import requests
import json
import quandl
import warnings
from sqlalchemy import create_engine, inspect
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
from config import SQLALCHEMY_DATABASE_URI
#DATABSE_URI=SQLALCHEMY_DATABASE_URI

# from config import passwd
warnings.filterwarnings('ignore')
def init():

# Reading the fortune1000 data into a Pandas dataframe
    original_fortune_data = pd.read_csv("db/fortune1000-final.csv", encoding = "ISO-8859-1")

    # reading the S & P data
    s_and_p_data = pd.read_csv("db/constituents_csv.csv", encoding = "ISO-8859-1")
    s_and_p_data = s_and_p_data[["Symbol", "Name"]][:500]

    # As previous rank is not an import column for our analysis, dropping that column
    original_fortune_data = original_fortune_data.drop('Previous Rank', axis=1)
    original_fortune_data['City'] = original_fortune_data['City'].replace(np.nan, 'New York', regex=True)
    # Converting rank and employees to Integer type
    original_fortune_data["rank"] = original_fortune_data["rank"].apply(lambda x: int(x))
    original_fortune_data["Employees"] = original_fortune_data["Employees"].apply(lambda x: int(re.sub('[^0-9\.]', '', x)))

    #extracting top 500 rank companies
    original_fortune_data = original_fortune_data[original_fortune_data["rank"] < 501]
    
    # Initializing columns that needs to be converted from string to float

    cols_to_be_changed = ["Revenues ($M)","Revenue Change", "Profits ($M)","Profit Change", "Assets ($M)","Mkt Value as of 3/29/18 ($M)"]
    new_cols = ["Revenues($M)","Revenue_Change", "Profits($M)","Profit_Change", "Assets($M)","Mkt_Value_as_of_3/29/18_($M)"]

    # Converting string data to float for data processing
    for index,row in original_fortune_data.iterrows():

        for i in range(len(cols_to_be_changed)):
            try:
                original_fortune_data.loc[index,new_cols[i]] = float(re.sub('[^0-9\.]','',row[cols_to_be_changed[i]]))
            except:
                #print(row[cols_to_be_changed[i]])
                original_fortune_data.loc[index,new_cols[i]] = 0.0

    # dropping original columns

    for i in cols_to_be_changed:
        if i in original_fortune_data.columns:
            original_fortune_data = original_fortune_data.drop(i, axis=1) 

    # Cleaning up common fields from both fortune500 data and s&p symbol data for comparing
    original_fortune_data['title'] = original_fortune_data['title'].apply(lambda x: re.sub('[\-]','',x.lower()))
    s_and_p_data['Name'] = s_and_p_data['Name'].apply(lambda x: re.sub('[\-]','',x.lower()))
    original_fortune_data = original_fortune_data.sort_values(by=['title'])
    s_and_p_data = s_and_p_data.sort_values(by=['Name'])

    #Sorting both datasets and 
    original_fortune_data['Symbol'] = ""
    original_fortune_data = original_fortune_data.sort_values(by=['title'])
    s_and_p_data = s_and_p_data.sort_values(by=['Name'])
    for i,row1 in original_fortune_data.iterrows():
        o_title = re.sub('[\-]','',row1['title'].lower())
        for j,row2 in s_and_p_data.iterrows():
            s_title = re.sub('[\-]','',row2['Name'].lower())
            s_Symbol = row2['Symbol']
            if re.match(o_title,s_title):
                    # print(f"{o_title} {s_title} {s_Symbol}")
                    original_fortune_data.loc[i,"Symbol"] = s_Symbol

    # Re-sort to rank
    original_fortune_data = original_fortune_data.sort_values(by="rank")
    # Coverting title to Title case
    original_fortune_data['title'] = original_fortune_data['title'].apply(lambda x: x.title())
    # Re-naming and re-arranging the columns
    original_fortune_data.columns = ["Rank", "Title","Employees","CEO", "CEO_Title", "Sector", "Industry", "Years_on_Fortune_500_List", "City", "State", "Latitude", "Longitude","Revenues","Revenue_Change","Profits","Profit_Change", "Assets","Mkt_Value","Symbol"]
    fortune500_data = original_fortune_data[["Rank", "Title","Employees","CEO", "CEO_Title", "Sector", "Industry", "Years_on_Fortune_500_List", "City", "State", "Latitude", "Longitude","Revenues","Revenue_Change","Profits","Profit_Change", "Assets","Mkt_Value","Symbol"]]
    
    # Processing data for s_p data
    agg_sector = fortune500_data[["Sector","Industry","Revenues", "Profits"]].groupby(["Sector", "Industry"]).sum().sort_values(by=["Sector", "Industry"]).reset_index()
    sector_gross_revenue_profit = fortune500_data[["Sector", "Revenues", "Profits"]].groupby(["Sector"]).sum().sort_values(by=["Sector"]).reset_index()
    agg_sector["Profit_Margin"] = agg_sector["Profits"] / agg_sector["Revenues"]

    # Calculating Revenue percent and Profit percent
    
    for i, row in sector_gross_revenue_profit.iterrows():
       gross_revenue = row["Revenues"]
       gross_profit = row["Profits"]
       sector = row["Sector"]
       mask = agg_sector["Sector"] == sector
       agg_sector.loc[mask, "Revenue_Percent"] = agg_sector.loc[mask, "Revenues"].apply(lambda x: round(x / gross_revenue * 100,2))
       agg_sector.loc[mask, "Profit_Percent"] = agg_sector.loc[mask, "Profits"].apply(lambda x: round(x / gross_profit * 100,2))

    # Connecting to postgreSQL database
    #DATABASE_URI = f"postgresql://postgres:{passwd}@localhost:5432/fortune500_db"

    engine = create_engine(SQLALCHEMY_DATABASE_URI)

    # Loading fortune500 data into postgreSQL table
    fortune500_data.to_sql(name='fortune500', if_exists='replace', con=engine, index=False)

    # Loading aggregated data into tables
    agg_sector.to_sql(name='sector_industry', if_exists='replace', con=engine, index=False)