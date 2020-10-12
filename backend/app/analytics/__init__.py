from flask import Blueprint,request, jsonify
from config import Config
from sqlalchemy import text
import cx_Oracle
import oci
import json
import random
from math import pi
from app.errors import *
from app.db import db_session

from bokeh.plotting import Figure
# from bokeh.resources import CDN
from bokeh.palettes import Spectral11, d3
from bokeh.transform import factor_cmap
from bokeh.embed import json_item
from bokeh.layouts import column
from bokeh.models import ColumnDataSource, LinearAxis,Range1d,HoverTool
from bokeh.transform import cumsum
# from bokeh.sampledata.autompg import autompg

from numpy import cos, linspace
import pandas as pd

analytics_blueprint = Blueprint('analytics', __name__,url_prefix='/api/v0/analytics/')

oracle_config = oci.config.from_file(Config.ORACLE_CONFIG,"BGLIN")

data = [{'date':'2020-05-01','product_id':'BGB-US-001','page_views': 150,'total_sale':980},
        {'date':'2020-05-01','product_id':'BGB-US-002','page_views': 200,'total_sale':1000},
        {'date':'2020-05-01','product_id':'BGB-US-003','page_views': 400,'total_sale':800},
        {'date':'2020-05-01','product_id':'BGB-US-004','page_views': 25,'total_sale':125},
        {'date':'2020-05-01','product_id':'BGB-US-005','page_views': 122,'total_sale':300},
        {'date':'2020-05-01','product_id':'BGB-US-006','page_views': 170,'total_sale':320},
        {'date':'2020-05-01','product_id':'BGB-US-007','page_views': 80,'total_sale':600},
        {'date':'2020-05-02','product_id':'BGB-US-001','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-02','product_id':'BGB-US-002','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-02','product_id':'BGB-US-003','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-02','product_id':'BGB-US-004','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-02','product_id':'BGB-US-005','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-02','product_id':'BGB-US-006','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-02','product_id':'BGB-US-007','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-03','product_id':'BGB-US-001','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-03','product_id':'BGB-US-002','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-03','product_id':'BGB-US-003','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-03','product_id':'BGB-US-004','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-03','product_id':'BGB-US-005','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-03','product_id':'BGB-US-006','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-03','product_id':'BGB-US-007','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-04','product_id':'BGB-US-001','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-04','product_id':'BGB-US-002','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-04','product_id':'BGB-US-003','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-04','product_id':'BGB-US-004','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-04','product_id':'BGB-US-005','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-04','product_id':'BGB-US-006','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-04','product_id':'BGB-US-007','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-05','product_id':'BGB-US-001','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-05','product_id':'BGB-US-002','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-05','product_id':'BGB-US-003','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-05','product_id':'BGB-US-004','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-05','product_id':'BGB-US-005','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-05','product_id':'BGB-US-006','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-05','product_id':'BGB-US-007','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-06','product_id':'BGB-US-001','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-06','product_id':'BGB-US-002','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-06','product_id':'BGB-US-003','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-06','product_id':'BGB-US-004','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-06','product_id':'BGB-US-005','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-06','product_id':'BGB-US-006','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-06','product_id':'BGB-US-007','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-07','product_id':'BGB-US-001','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-07','product_id':'BGB-US-002','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-07','product_id':'BGB-US-003','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-07','product_id':'BGB-US-004','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-07','product_id':'BGB-US-005','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-07','product_id':'BGB-US-006','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)},
        {'date':'2020-05-07','product_id':'BGB-US-007','page_views': random.randint(100,1000),'total_sale':random.randint(100,1000)}]


@analytics_blueprint.route('/upload/', methods = ['POST'])
def upload():

    if 'filepond' not in request.files:
            response =jsonify({'message':'No File Part.Please try Again.'})
            return(response)


    file = request.files['filepond']

    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
        response =jsonify({'message':'No Selected File. Please Try Again.'})
        return(response)


    if file:
        object_storage = oci.object_storage.ObjectStorageClient(oracle_config)
        print('File Upload Initiated')
        namespace = object_storage.get_namespace().data
        bucket_name = Config.BUCKET_NAME
        object_name = "test_data.json"

        object_storage.put_object(namespace, bucket_name, object_name, file)

        response = jsonify({'message': 'File Succesfully Uploaded!'})
        return(response)

@analytics_blueprint.route('/data/sales', methods = ['GET'])
def total_sales():
    # result is list of tuples
    result = db_session.execute('''SELECT * FROM product_sales''' ).fetchall()
    formatted_result = [{'date':item[0],'product_id':item[1],'total_sales':str(item[2])} for item in result]
    return (jsonify(formatted_result))


@analytics_blueprint.route('/data/page-views', methods = ['GET'])
def total_views():

    sample_data = [{'ga_date':'2020-05-01','product_id':'BGB-US-001','page_views': 150},
                {'ga_date':'2020-05-01','product_id':'BGB-US-002','page_views': 200},
                {'ga_date':'2020-05-01','product_id':'BGB-US-003','page_views': 400},
                {'ga_date':'2020-05-01','product_id':'BGB-US-004','page_views': 25},
                {'ga_date':'2020-05-01','product_id':'BGB-US-005','page_views': 122},
                {'ga_date':'2020-05-01','product_id':'BGB-US-006','page_views': 170},
                {'ga_date':'2020-05-01','product_id':'BGB-US-007','page_views': 80}]

    # result is list of tuples
    # result = db_session.execute('''SELECT * FROM GA_SINK''' ).fetchall()
    formatted_result = [{'date':item[0],'product_id':item[1],'page_views':str(item[2])} for item in result]
    # return (jsonify(formatted_result))
    return (jsonify(sample_data))

@analytics_blueprint.route('/custom-reports/<report_id>', methods = ['GET'])
def custom_reports(report_id):

    if report_id == 'A':

        result = db_session.execute('''select ga_date,sum(page_views),floor(dbms_random.value(2000, 6000)) as sales
                                       from ga_sink
                                       group by ga_date''' ).fetchall()


        print(result)


        test = pd.DataFrame(result ,columns =['date', 'page_views','total_sale'])
        test['date']=pd.to_datetime(test['date'])
        test.set_index(keys=['date'],inplace=True)
        test.sort_index(inplace=True)

        cds = ColumnDataSource(test)


        p = Figure(plot_width=1000, plot_height=500,title = "Sales Vs Views", y_range=Range1d(start=0,end=6000),x_axis_type='datetime',x_axis_label='Date',y_axis_label='Revenue($)')
        l1=p.line('date','page_views',  source=cds, line_color=d3['Category10'][10][0],line_width=5,legend="Page Views")
        l2=p.line('date','total_sale',  source=cds, line_color=d3['Category10'][10][1],line_width=5,legend="Revenue")
        p.extra_y_ranges = {"foo": Range1d(start=0, end=6000)}
        p.add_layout(LinearAxis(y_range_name='foo',axis_label="Number of Views"), 'right')
        p.legend.location = "bottom_right"
        p.background_fill_color = "beige"
        p.background_fill_alpha = 0.5
        p.border_fill_color = "#F8F8FF"

        p.add_tools(HoverTool(
        renderers=[l1],
        tooltips=[
            ( 'date',   '@date{%F}'            ), # use @{ } for field names with spaces
            ( 'views', '@page_views'      ),
        ],

        formatters={
            'date'      : 'datetime', # use 'datetime' formatter for 'date' field
                                      # use default 'numeral' formatter for other fields
        },

        # display a tooltip whenever the cursor is vertically in line with a glyph
        mode='vline'
        ))

        p.add_tools(HoverTool(
        renderers=[l2],
        tooltips=[
            # ( 'date',   '@date{%F}'            ),
            ( 'revenue',  '$@{total_sale}' ), # use @{ } for field names with spaces
        ],

        formatters={
            # 'date'      : 'datetime', # use 'datetime' formatter for 'date' field
            'revenue' : 'printf',   # use 'printf' formatter for 'adj close' field
                                      # use default 'numeral' formatter for other fields
        },

        # display a tooltip whenever the cursor is vertically in line with a glyph
        mode='vline'
        ))

        return json.dumps(json_item(p))

    if report_id == "B":
        result = db_session.execute('''select product_id,sum(page_views) as views
                                       from ga_sink
                                       group by product_id
                                       order by views desc ''' ).fetchall()

        test = pd.DataFrame(result ,columns =['product_id', 'page_views'])
        test.set_index(keys=['product_id'],inplace=True)

        cds = ColumnDataSource(test)

        p = Figure(x_range=cds.data['product_id'], plot_height=350, title="Top Products by Views",tools="")

        p.vbar(x='product_id',top='page_views',source=cds,width=0.9,fill_color=factor_cmap(field_name='product_id',palette=d3['Category10'][10],factors=cds.data['product_id']))
        p.xgrid.grid_line_color = None
        p.y_range.start = 0
        p.background_fill_color = "beige"
        p.background_fill_alpha = 0.5
        p.border_fill_color = "#F8F8FF"

        return json.dumps(json_item(p))
    if report_id == "C":
        cdata= [{'product_id':'BGB-US-001','total_sale': random.randint(1000,8000)},
                    {'product_id':'BGB-US-002','total_sale': random.randint(1000,8000)},
                    {'product_id':'BGB-US-003','total_sale': random.randint(1000,8000)},
                    {'product_id':'BGB-US-004','total_sale': random.randint(1000,8000)},
                    {'product_id':'BGB-US-005','total_sale': random.randint(1000,8000)},
                    {'product_id':'BGB-US-006','total_sale': random.randint(1000,8000)},
                    {'product_id':'BGB-US-007','total_sale': random.randint(1000,8000)}]

        c=pd.DataFrame(cdata)
        c.set_index(keys=['product_id'],inplace=True)
        c['angle'] = c['total_sale']/c['total_sale'].sum() * 2*pi
        c['color'] = d3['Category10'][10][len(c)-1::-1]
        c['percent']=round(c['total_sale']/c['total_sale'].sum() * 100,0)

        cds=ColumnDataSource(c)


        p = Figure(plot_height=350, title="Revenue Breakdown by Product",tools="hover", tooltips="@product_id: @percent %",x_range=(-0.5, 1.0))

        p.wedge(x=0, y=1, radius=0.4,
                start_angle=cumsum('angle', include_zero=True), end_angle=cumsum('angle'),
                line_color="white", fill_color='color', legend='product_id', source=cds)

        p.axis.axis_label=None
        p.axis.visible=False
        p.grid.grid_line_color = None
        p.background_fill_color = "beige"
        p.background_fill_alpha = 0.5
        p.border_fill_color = "#F8F8FF"

        return json.dumps(json_item(p))
