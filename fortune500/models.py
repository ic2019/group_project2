from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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

	def __init__(lat, lng):
		self.Latitude = lat
		self.Longitude = lng
	
	def __repr__(self):
		return "Lat %s Lng %s>" % (self.Latitude, self.Longitude)

class Sector_Industry(db.Model):
    __tablename__ = 'sector_industry'

    Sector = db.Column(db.String(300), primary_key=True)
    Industry = db.Column(db.String(300))
    Revenues = db.Column(db.Float)
    Profits = db.Column(db.Float)
    Revenue_Percent = db.Column(db.Float)
    Profit_Percent = db.Column(db.Float)
    Profit_Margin = db.Column(db.Float)



