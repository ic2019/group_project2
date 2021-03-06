------Create database ----------
create database fortune500_db;

------Create table fortune500 data------
----dropping table if already exists---
drop table fortune500;

------Create table fortune500 data------
create table fortune500 (
	"Rank" int primary key,
	"Title" varchar not null,
	"Employees" int not null,
	"CEO" varchar not null,
	"CEO_Title" varchar not null,
	"Sector" varchar not null,
	"Industry" varchar not null,
	"Years_on_Fortune_500_List" varchar not null,
	"City" varchar not null,
	"State" varchar not null,
	"Latitude" numeric not null,
	"Longitude" numeric not null,
	"Revenues" numeric,
	"Revenue_Change" numeric,
	"Profits" numeric,
	"Profit_Change" numeric,
	"Assets" numeric,
	"Mkt_Value" numeric,
	"Symbol" char(10)
	);

----------------Dropping sector_industry table if already exists----------
drop table sector_industry;

-------------Creating sector_industry table--------------
create table sector_industry (
	    "Id" serial primary key,
		"Sector" varchar not null,
		"Industry" varchar not null,
		"Revenues" numeric not null,
		"Profits" numeric not null,
	    "Revenue_Percent" numeric not null,
	    "Profit_Percent" numeric not null,
	    "Profit_Margin" decimal not null
);






	

