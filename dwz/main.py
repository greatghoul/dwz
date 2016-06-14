# coding: utf-8

import os
import requests

from flask import Flask
from flask import request
from flask import jsonify
from flask import Response
from flask import render_template
from flask import stream_with_context
from flask_cors.decorator import cross_origin

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/create', methods=['POST'])
@cross_origin()
def create():
    headers = { 'apikey': os.environ['DWZ_TOKEN'] }
    payload = { 'url_long': request.form['url'] }
    api_url = 'http://apis.baidu.com/3023/shorturl/shorten'
    req = requests.get(api_url, params=payload, headers=headers, stream=True)
    return Response(stream_with_context(req.iter_content()), content_type=req.headers['content-type'])
