import os
import requests

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("submit vote")
def vote(data):
    chosenOption = data["clicked"]
    value = data["value"];
    emit("announce vote", {"returnedOption": chosenOption, "value": value}, broadcast=True)