import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, exc
from sqlalchemy import create_engine, inspect

from flask import Flask, jsonify, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
import etl
import json
from models import db,Fortune500, Sector_Industry
from config import SQLALCHEMY_DATABASE_URI

#Initializing app

app = Flask(__name__)
db.init_app(app)
###########################
# Database Setup
###########################

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


@app.before_first_request
def setup():
	etl.init()

@app.route("/")
def index():
    """Return the homepage"""
    print(f"Data Loaded to the database!")
    return render_template("index.html")

@app.route("/timesrs")
def timeseries():
    """Return fortune500 companies tick symbols for Time Series chart"""
    try:
      results = db.session.query(Fortune500.Rank, Fortune500.Title, Fortune500.Symbol).all()

      stockData = []
      for row in results:
         stockData.append(f'{list(row)[1]} : {list(row)[2]} : {list(row)[0]}')    
      return render_template('timesrs.html', data = stockData)
    except exc.NoResultFound:
      abort(404)

@app.route("/gauge")
def gauge():
	"""Calculate industry wise profit margin"""

@app.route("/pie")
def pie():
   #Return sector analysis by revenue and profit
   try:
       results = db.session.query(Sector_Industry.Sector, Sector_Industry.Industry, Sector_Industry.Revenue_Percent, Sector_Industry.Profit_Percent).all()
       sectorData = {}
       Sector = []
       Industry = []
       Profit_Percent = []
       Revenue_Percent = []
       for row in results:
          Sector.append(list(row)[0])
          Industry.append(list(row)[1])
          Revenue_Percent.append(list(row)[2])
          Profit_Percent.append(list(row)[3])
       sectorData = pd.DataFrame({
		 "Sector": Sector,
		 "Industry": Industry,
		 "Revenue_Percent": Revenue_Percent,
		 "Profit_Percent": Profit_Percent
		
	  })
   except exc.NoResultFound:
        abort(404)
   
   
   return render_template('pie.html', data = sectorData)

@app.route("/profitmargin")
def profitmargin():
	results  = db.session.query(Fortune500.Title,Fortune500.Profits,Fortune500.Revenues).limit(5)
	pf_rev_data = {}
	for result in results:
		pf_rev_data["Title"] = result[0]
		pf_rev_data["Profits"] = result[1]
		pf_rev_data["Revenues"] = result[2]
		
	return jsonify(pf_rev_data)

@app.route("/api/bar")
def barData():
   try:
      results = db.session.query(Fortune500.Symbol, Fortune500.Revenues).limit(10)
      mydata_final = pd.DataFrame(results, columns=['ticks', 'revenue'])

      return jsonify(mydata_final.to_dict(orient="records"))

   except exc.NoResultFound:
      abort(404)

@app.route("/api/map")
def map():

   results = db.session.query(Fortune500.Symbol,Fortune500.Revenues, Fortune500.Profits,\
               Fortune500.Employees, Fortune500.Latitude, Fortune.Longitude,\
                  Fortune500.Rank,Fortune500.Title,Fortune500.Sector).all()
   mydata_final = pd.DataFrame(results, columns=['ticks', 'revenue', 'profit', 'emp_cnt', 'lat', 'long','rank','comp','sector'])
   mydata_final['revenue_pe'] = mydata_final['revenue'] / mydata_final['emp_cnt']
   mydata_final['profit_pe'] = mydata_final['profit'] / mydata_final['emp_cnt']
   mydata_final.column =  ['ticks', 'revenue', 'profit', 'revenue_pe', 'profit_pe' ,'emp_cnt', 'lat', 'long','rank','comp','sector']

   return jsonify(mydata_final.to_dict(orient="records"))

@app.route("/api/pie")
@app.errorhandler(404)
def page_not_found(error):
	return render_template('404.html'), 404
    


if __name__ == "__main__":
    app.run(debug=True)
