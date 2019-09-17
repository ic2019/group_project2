------Create database ----------
create database fortune500_db;

------Create table fortune500 data------
----dropping table if already exists---
drop table fortune500;

------Create table fortune500 data------
create table fortune500 (
	"Rank" int not null,
	"Title" varchar not null,
	"Employees" int not null,
	"CEO" varchar not null,
	"CEO Title" varchar not null,
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
	"Mkt_Value_as_of_3/29/18" numeric,
	"Symbol" char(10)
	);

----------Drop table if already exists----
drop table sector_revenues;
drop table sector_profits;
drop table industry_revenues;
drop table industry_profits;

------Creating table for aggregate revenue values sector wise----
create table sector_revenues (
	"Sector" varchar not null,
	"Revenues" numeric not null
);

----------Creating table for aggregate profit values sector wise----
create table sector_profits (
	"Sector" varchar not null,
	"Profits" numeric not null
);

------Creating table for aggregate revenue values industry wise----
create table industry_revenues (
	"Industry" varchar not null,
	"Revenues" numeric not null
);

----------Creating table for aggregate profit values industry wise----
create table industry_profits (
	"Industry" varchar not null,
	"Profits" numeric not null
);
	
	

