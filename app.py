from flask import Flask, render_template, request, redirect, url_for
import os

app = Flask(__name__)

# Folder to store notes
NOTE_FOLDER = 'notes'
if not os.path.exists(NOTE_FOLDER):
    os.makedirs(NOTE_FOLDER)

@app.route('/')
def index():
    notes = os.listdir(NOTE_FOLDER)
    return render_template('index.html', notes=notes)

@app.route('/create', methods=['POST'])
def create_note():
    note_name = request.form['note_name']
    note_content = request.form['note_content']
    
    if note_name:
        with open(os.path.join(NOTE_FOLDER, note_name + '.txt'), 'w') as f:
            f.write(note_content)
    return redirect(url_for('index'))

@app.route('/edit/<note_name>', methods=['GET', 'POST'])
def edit_note(note_name):
    note_path = os.path.join(NOTE_FOLDER, note_name + '.txt')
    
    if request.method == 'POST':
        new_content = request.form['note_content']
        with open(note_path, 'w') as f:
            f.write(new_content)
        return redirect(url_for('index'))

    with open(note_path, 'r') as f:
        content = f.read()
    
    return render_template('edit_note.html', note_name=note_name, content=content)

@app.route('/delete/<note_name>')
def delete_note(note_name):
    note_path = os.path.join(NOTE_FOLDER, note_name + '.txt')
    if os.path.exists(note_path):
        os.remove(note_path)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
