import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, exc
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template, url_for, abort
from flask_sqlalchemy import SQLAlchemy
import etl
import json
import requests
from models import db,Fortune500, Sector_Industry
from config import SQLALCHEMY_DATABASE_URI, apiKey

#Initializing app

app = Flask(__name__, static_url_path= "/static", static_folder="static")
db.init_app(app)
###########################
# Database Setup
###########################

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


@app.before_first_request
def setup():
	# etl.init()
   print("Data processing temporarily suspended")

@app.route("/")
def index():
    """Return the homepage"""
    print(f"Data Loaded to the database!")
    return render_template('index.html')

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
       results = db.session.query(Sector_Industry.Sector, Sector_Industry.Industry, \
          Sector_Industry.Revenue_Percent, Sector_Industry.Profit_Percent).all()
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
       return render_template('pie.html', data = sectorData)
   except exc.NoResultFound:
        abort(404)

@app.route('/bar')
def bar():
    return render_template('bar.html')

@app.route('/bar_pe')
def bar_pe():
    return render_template('bar_pe.html')


@app.route("/api/fortune500")
def sampleData():
   try:
      results = Fortune500.query.all() #.first()
      sampleData = [{
         "Rank" : results.Rank,
         "Title": results.Title,
         "Employees": results.Employees,
         "CEO": results.CEO,
         "CEO_Title": results.CEO_Title,
         "Sector": results.Sector,
         "Industry": results.Industry,
         "Years_on_Fortune_500_List": results.Years_on_Fortune_500_List,
         "City": results.City,
         "State": results.State,
         "Latitude":results.Latitude,
         "Longitude":results.Latitude,
         "Revenues": results.Revenues,
         "Revenue_Change": results.Revenues,
         "Profits": results.Profits,
         "Profit_Change": results.Profit_Change,
         "Assets": results.Assets,
         "Mkt_Value": results.Mkt_Value,
         "Symbol": results.Symbol
      }]
      return jsonify(sampleData)
   except exc.NoResultFound:
      abort(404)

@app.route("/api/bar")
def barData():
   try:
      results = db.session.query(Fortune500.Symbol,Fortune500.Revenues, Fortune500.Profits,\
               Fortune500.Employees, Fortune500.Latitude, Fortune500.Longitude,\
                  Fortune500.Rank,Fortune500.Title).filter(func.length(Fortune500.Symbol) > 0).limit(10)
      barData = pd.DataFrame(results, columns=['ticks', 'revenue', 'profit', 'emp_cnt', 'lat', 'long','rank','comp'])
      barData['revenue_pe'] = barData['revenue'] / barData['emp_cnt']
      barData['profit_pe'] = barData['profit'] / barData['emp_cnt']
      barData['profitmgn'] = barData['profit'] / barData['revenue']
      barData.column =  ['ticks', 'revenue', 'profit', 'revenue_pe', 'profit_pe' ,'emp_cnt', 'lat', 'long','rank','comp','profitmgn']
      return jsonify(barData.to_dict(orient="records"))

   except exc.NoResultFound:
      abort(404)

@app.route("/map")
def mapData():
   try:
      # results = db.session.query(Fortune500.Symbol,Fortune500.Revenues, Fortune500.Profits,\
      #          Fortune500.Employees, Fortune500.Latitude, Fortune500.Longitude,\
      #             Fortune500.Rank,Fortune500.Title,Fortune500.Sector).all()
      # mapData = pd.DataFrame(results, columns=['ticks', 'revenue', 'profit', 'emp_cnt', 'lat', 'long','rank','comp','sector'])
      # mapData['revenue_pe'] = mapData['revenue'] / mapData['emp_cnt']
      # mapData['profit_pe'] = mapData['profit'] / mapData['emp_cnt']
      # mapData.column =  ['ticks', 'revenue', 'profit', 'revenue_pe', 'profit_pe' ,'emp_cnt', 'lat', 'long','rank','comp','sector']
      # return jsonify(mapData.to_dict(orient="records"))
      
      # return render_template('map.html')
      return render_template('maps.html')
      
   except exc.NoResultFound:
      abort(404)

@app.route("/map/data")
def mapforData():
   try:
      results = db.session.query(Fortune500.Symbol,Fortune500.Revenues, Fortune500.Profits,\
               Fortune500.Employees, Fortune500.Latitude, Fortune500.Longitude,\
                  Fortune500.Rank,Fortune500.Title,Fortune500.Sector).all()
      mapData = pd.DataFrame(results, columns=['ticks', 'revenue', 'profit', 'emp_cnt', 'lat', 'long','rank','comp','sector'])
      mapData['revenue_pe'] = mapData['revenue'] / mapData['emp_cnt']
      mapData['profit_pe'] = mapData['profit'] / mapData['emp_cnt']
      mapData.column =  ['ticks', 'revenue', 'profit', 'revenue_pe', 'profit_pe' ,'emp_cnt', 'lat', 'long','rank','comp','sector']
      return jsonify(mapData.to_dict(orient="records"))
      
      # return render_template('map.html')
      
   except exc.NoResultFound:
      abort(404)

@app.route("/api/pie")
def pieData():
   try:
      results = db.session.query(Sector_Industry.Sector, Sector_Industry.Industry, Sector_Industry.Revenue_Percent, Sector_Industry.Profit_Percent).all()
      pieData = pd.DataFrame(results, columns= ['Sector', 'Industry', 'Revenue_Percent', 'Profit_Percent'])
      return jsonify(pieData.to_dict(orient="records"))
   except exc.NoResultFound:
      abort(404)
      
@app.route("/api/timesrs")
def timeData():
   try:
      results = db.session.query(Fortune500.Rank, Fortune500.Title, Fortune500.Symbol).filter(Fortune500.Symbol.in_(['AMZN']))
      timeData = pd.DataFrame(results, columns = ['Rank', 'Title', 'Symbol'])
      # Retriving data from quandl
      stock1 = timeData['Symbol'][0].strip()
      url1 = f'https://www.quandl.com/api/v3/datasets/WIKI/{stock1}.json?start_date=2018-01-01&end_date=2018-01-31&api_key={apiKey}'
      response = requests.get(url1)
      return response.json()
   except:
      abort(404)

@app.route("/meta")
def metData():
   try:
       return render_template("meta.html")
   except:
      abort(404)
@app.route("/logdia")
def logDia():
   try:
      return render_template("logdia.html")
   except:
      abort(404)
   
@app.errorhandler(404)
def page_not_found(error):
	return render_template('404.html'), 404  


if __name__ == "__main__":
    app.run(debug=True)
