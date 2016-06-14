# coding: utf-8

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
    req = requests.post('http://dwz.cn/create.php', data=request.form, stream=True)
    return Response(stream_with_context(req.iter_content()), content_type=req.headers['content-type'])
