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
# from config import passwd
warnings.filterwarnings('ignore')

app = Flask(__name__)

@app.route('/')
def index():

    # Reading the fortune1000 data into a Pandas dataframe
    original_fortune_data = pd.read_csv("DataSets/fortune1000-final.csv", encoding = "ISO-8859-1")

    # reading the S & P data
    s_and_p_data = pd.read_csv("DataSets/constituents_csv.csv", encoding = "ISO-8859-1")
    s_and_p_data = s_and_p_data[["Symbol", "Name"]][:500]

    # As previous rank is not an import column for our analysis, dropping that column
    original_fortune_data = original_fortune_data.drop('Previous Rank', axis=1)
    original_fortune_data['City'] = original_fortune_data['City'].replace(np.nan, 'New York', regex=True)
    # Converting rank and employees to Integer type
    original_fortune_data["rank"] = original_fortune_data["rank"].apply(lambda x: int(x))
    original_fortune_data["Employees"] = original_fortune_data["Employees"].apply(lambda x: int(re.sub('[^0-9]', '', x)))

    #extracting top 500 rank companies
    original_fortune_data = original_fortune_data[original_fortune_data["rank"] < 501]

    cols_to_be_changed = ["Revenues ($M)","Revenue Change", "Profits ($M)","Profit Change", "Assets ($M)","Mkt Value as of 3/29/18 ($M)"]
    new_cols = ["Revenues($M)","Revenue_Change", "Profits($M)","Profit_Change", "Assets($M)","Mkt_Value_as_of_3/29/18_($M)"]
    for index,row in original_fortune_data.iterrows():

        for i in range(len(cols_to_be_changed)):
            try:
                original_fortune_data.loc[index,new_cols[i]] = float(re.sub('[^0-9]','',row[cols_to_be_changed[i]]))
            except:
                #print(row[cols_to_be_changed[i]])
                original_fortune_data.loc[index,new_cols[i]] = 0.0


    for i in cols_to_be_changed:
        if i in original_fortune_data.columns:
            original_fortune_data = original_fortune_data.drop(i, axis=1) 

    # Cleaning up common fields for comparing
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

    # Connecting to postgreSQL database
    DATABASE_URI = f"postgresql://postgres:data123@localhost:5432/fortune500_db"

    engine = create_engine(DATABASE_URI)

    # Loading fortune500 data into postgreSQL table
    fortune500_data.to_sql(name='fortune500', if_exists='replace', con=engine, index=False)

    return render_template('index.html')

@app.route('/fortune_api')    
def fortune_api():
    # Connecting to postgreSQL database
    DATABASE_URI = f"postgresql://postgres:data123@localhost:5432/fortune500_db"

    engine = create_engine(DATABASE_URI)

    mydata = pd.read_sql_query('select * from fortune500 where length("Symbol") <> 0 limit 10', con=engine)

    mydata_final = {
        "ticks": mydata["Symbol"].values.tolist(),
        "revenue":mydata["Revenues"].values.tolist(),
        "profit":(mydata["Profits"]/100).values.tolist(),
        "revenue_pe":(mydata["Revenues"].values/mydata["Employees"]).tolist(),
        "profit_pe":((mydata["Profits"].values/100)/mydata["Employees"]).tolist(),
        "emp_cnt":mydata["Employees"].values.tolist(),
        "lat":mydata["Latitude"].values.tolist(),
        "long":mydata["Longitude"].values.tolist(),
        "rank":mydata["Rank"].values.tolist(),
        "comp":mydata["Title"].values.tolist(),
        "profitmgn":((mydata["Profits"].values/100)/mydata["Revenues"]).tolist()
    }

    return jsonify(mydata_final)

@app.route('/bar')
def bar():
    return render_template('bar.html')

@app.route('/bar_pe')
def bar_pe():
    return render_template('bar_pe.html')

@app.route('/pie')
def pie():
    return render_template('pie.html')    

@app.route('/timesrs')
def timsrs():
    return render_template('timesrs.html')

@app.route('/map')
def map():
    return render_template('map.html')

if __name__ == '__main__':
    app.run(debug=True)