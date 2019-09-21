import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import main



app = Flask(__name__)


###########################
# Database Setup
###########################

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:password@localhost:5432/fortune500_db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

#from models import Fortune500, Sector_Industry
class Fortune500(db.Model):
	__tablename__ = 'fortune500'

	Rank = db.Column(db.Integer, primary_key=True)
	Title = db.Column(db.String(250))
	Employees = db.Column(db.Integer)
	CEO = db.Column(db.String(250))
	CEO_Title = db.Column(db.String(300))
	Sector = db.Column(db.String(300))
	Industry = db.Column(db.String(300))
	Years_on_Fortune_500_List = db.Column(db.String(5))
	City = db.Column(db.String(100))
	State = db.Column(db.String(100))
	Latitude = db.Column(db.Float)
	Longitude = db.Column(db.Float)
	Revenues = db.Column(db.Float)
	Revenue_Change = db.Column(db.Float)
	Profits = db.Column(db.Float)
	Profit_Change = db.Column(db.Float)
	Assets = db.Column(db.Float)
	Mkt_Value = db.Column(db.Float)
	Symbol = db.Column(db.String(10))

class Sector_Industry(db.Model):
    __tablename__ = 'sector_industry'

    Sector = db.Column(db.String(300), primary_key=True)
    Industry = db.Column(db.String(300))
    Revenues = db.Column(db.Float)
    Profits = db.Column(db.Float)
    Revenue_Percent = db.Column(db.Float)
    Profit_Percent = db.Column(db.Float)
    Profit_Margin = db.Column(db.Float)



@app.before_first_request
def setup():
	main.init()




@app.route("/")
def index():
    """Return the homepage"""
    return render_template("indu.html")

@app.route("/timeseries")
def timeseries():
    """Return fortune500 companies tick symbols for Time Series chart"""
    results = db.session.query(Fortune500.Rank, Fortune500.Title, Fortune500.Symbol).all()

    stockData = []
    for row in results:
       stockData.append(f'{list(row)[0]} : {list(row)[1]} : {list(row)[2]}')    
    return render_template('visualization/time.html', data = stockData)
	
@app.errorhandler(404)
def page_not_found(error):
	return render_template('404.html'), 404
    


if __name__ == "__main__":
    app.run(debug=True)
