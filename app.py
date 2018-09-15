import os
import requests

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


votes={"yesV": 0, "noV": 0, "maybeV": 0}
optionMap = {"yes": "yesV", "no": "noV", "maybe": "maybeV"}

@app.route("/")
def index():
    return render_template("index.html", votes=votes)

@socketio.on("submit vote")
def vote(data):
    chosenOption = data["clicked"]
    votes[optionMap[chosenOption]]=votes[optionMap[chosenOption]]+1
    emit("announce vote", votes, broadcast=True)