from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route('/')
def mainmenu():
    return render_template('mainmenu.html')

@app.route('/file/<path:path>')
def file(path):
    return send_file('./files/'+path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999, debug=True)