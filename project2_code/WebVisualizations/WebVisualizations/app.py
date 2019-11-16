import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///output_data/airquality2.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table

for x in Base.classes:
    print(x)


bc_US = Base.classes.bc
co_US = Base.classes.co
no2_US = Base.classes.no2
o3_US = Base.classes.o3
pm10_US = Base.classes.pm10
pm25_US = Base.classes.pm25
so2_US = Base.classes.so2


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


# @app.route("/cities")
# def names():
#     """Return a list of sample names."""

#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(list(df.columns)[2:])


@app.route("/metadata/bc")
def bc():

    # """Return the MetaData for a given sample."""
    sel = [
        bc_US.location,
        bc_US.parameter,
        bc_US.unit,
        bc_US.country,
        bc_US.city,
        bc_US.coordinates_latitude,
        bc_US.coordinates_longitude,
        bc_US.avgvalue,
    ]

    results = db.session.query(*sel).all()
    print(results)

    # Create a dictionary entry for each row of metadata information
    airquality_bc = []
    
    for result in results:
        airquality = {}
        airquality["location"] = result[0]
        airquality["parameter"] = result[1]
        airquality["unit"] = result[2].decode('utf-8')
        airquality["country"] = result[3]
        airquality["city"] = result[4]
        airquality["coordinates_latitude"] = result[5]
        airquality["coordinates_longitude"] = result[6]
        airquality["avgvalue"] = result[7]
        airquality_bc.append(airquality)


    print(airquality_bc)
    return jsonify(airquality_bc)

@app.route("/metadata/co")
def co():

    # """Return the MetaData for a given sample."""
    sel = [
        co_US.location,
        co_US.parameter,
        co_US.unit,
        co_US.country,
        co_US.city,
        co_US.coordinates_latitude,
        co_US.coordinates_longitude,
        co_US.avgvalue,
    ]

    results = db.session.query(*sel).all()
    print(results)

    # Create a dictionary entry for each row of metadata information
    airquality_co = []
    
    for result in results:
        airquality = {}
        airquality["location"] = result[0]
        airquality["parameter"] = result[1]
        airquality["unit"] = result[2]
        airquality["country"] = result[3]
        airquality["city"] = result[4]
        airquality["coordinates_latitude"] = result[5]
        airquality["coordinates_longitude"] = result[6]
        airquality["avgvalue"] = result[7]
        airquality_co.append(airquality)


    print(airquality_co)
    return jsonify(airquality_co)

@app.route("/metadata/no2")
def no2():

    # """Return the MetaData for a given sample."""
    sel = [
        no2_US.location,
        no2_US.parameter,
        no2_US.unit,
        no2_US.country,
        no2_US.city,
        no2_US.coordinates_latitude,
        no2_US.coordinates_longitude,
        no2_US.avgvalue,
    ]

    results = db.session.query(*sel).all()
    print(results)

    # Create a dictionary entry for each row of metadata information
    airquality_no2 = []
    
    for result in results:
        airquality = {}
        airquality["location"] = result[0]
        airquality["parameter"] = result[1]
        airquality["unit"] = result[2]
        airquality["country"] = result[3]
        airquality["city"] = result[4]
        airquality["coordinates_latitude"] = result[5]
        airquality["coordinates_longitude"] = result[6]
        airquality["avgvalue"] = result[7]
        airquality_no2.append(airquality)


    print(airquality_no2)
    return jsonify(airquality_no2)    


@app.route("/metadata/pm25")
def pm25():

    # """Return the MetaData for a given sample."""
    sel = [
        pm25_US.location,
        pm25_US.parameter,
        pm25_US.unit,
        pm25_US.country,
        pm25_US.city,
        pm25_US.coordinates_latitude,
        pm25_US.coordinates_longitude,
        pm25_US.avgvalue,
    ]

    results = db.session.query(*sel).all()
    print(results)

    # Create a dictionary entry for each row of metadata information
    airquality_pm25 = []
    
    for result in results:
        airquality = {}
        airquality["location"] = result[0]
        airquality["parameter"] = result[1]
        airquality["unit"] = result[2].decode('utf-8')
        airquality["country"] = result[3]
        airquality["city"] = result[4]
        airquality["coordinates_latitude"] = result[5]
        airquality["coordinates_longitude"] = result[6]
        airquality["avgvalue"] = result[7]
        airquality_pm25.append(airquality)


    print(airquality_pm25)
    return jsonify(airquality_pm25)

@app.route("/metadata/pm10")
def pm10():

    # """Return the MetaData for a given sample."""
    sel = [
        pm10_US.location,
        pm10_US.parameter,
        pm10_US.unit,
        pm10_US.country,
        pm10_US.city,
        pm10_US.coordinates_latitude,
        pm10_US.coordinates_longitude,
        pm10_US.avgvalue,
    ]

    results = db.session.query(*sel).all()
    print(results)

    # Create a dictionary entry for each row of metadata information
    airquality_pm10 = []
    
    for result in results:
        airquality = {}
        airquality["location"] = result[0]
        airquality["parameter"] = result[1]
        airquality["unit"] = result[2].decode('utf-8')
        airquality["country"] = result[3]
        airquality["city"] = result[4]
        airquality["coordinates_latitude"] = result[5]
        airquality["coordinates_longitude"] = result[6]
        airquality["avgvalue"] = result[7]
        airquality_pm10.append(airquality)


    print(airquality_pm10)
    return jsonify(airquality_pm10)

@app.route("/metadata/o3")
def o3():

    # """Return the MetaData for a given sample."""
    sel = [
        o3_US.location,
        o3_US.parameter,
        o3_US.unit,
        o3_US.country,
        o3_US.city,
        o3_US.coordinates_latitude,
        o3_US.coordinates_longitude,
        o3_US.avgvalue,
    ]

    results = db.session.query(*sel).all()
    print(results)

    # Create a dictionary entry for each row of metadata information
    airquality_o3 = []
    
    for result in results:
        airquality = {}
        airquality["location"] = result[0]
        airquality["parameter"] = result[1]
        airquality["unit"] = result[2]
        airquality["country"] = result[3]
        airquality["city"] = result[4]
        airquality["coordinates_latitude"] = result[5]
        airquality["coordinates_longitude"] = result[6]
        airquality["avgvalue"] = result[7]
        airquality_o3.append(airquality)


    print(airquality_o3)
    return jsonify(airquality_o3)   

@app.route("/metadata/so2")
def so2():

    # """Return the MetaData for a given sample."""
    sel = [
        so2_US.location,
        so2_US.parameter,
        so2_US.unit,
        so2_US.country,
        so2_US.city,
        so2_US.coordinates_latitude,
        so2_US.coordinates_longitude,
        so2_US.avgvalue,
    ]

    results = db.session.query(*sel).all()
    print(results)

    # Create a dictionary entry for each row of metadata information
    airquality_so2 = []
    
    for result in results:
        airquality = {}
        airquality["location"] = result[0]
        airquality["parameter"] = result[1]
        airquality["unit"] = result[2]
        airquality["country"] = result[3]
        airquality["city"] = result[4]
        airquality["coordinates_latitude"] = result[5]
        airquality["coordinates_longitude"] = result[6]
        airquality["avgvalue"] = result[7]
        airquality_so2.append(airquality)


    print(airquality_so2)
    return jsonify(airquality_so2)  

# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]

#     # Sort by sample
#     sample_data.sort_values(by=sample, ascending=False, inplace=True)

#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()
