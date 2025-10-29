from flask import Flask, request, send_file, jsonify
from lxml import etree
import os, io, zipfile
from flask_cors import CORS
from config import REQUIRED_FIELDS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
CLEANED_FOLDER = "cleaned"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CLEANED_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return jsonify({"message": "Flookup XML Cleaner API Running 🚀"})

@app.route("/upload", methods=["POST"])
def upload_folder():
    files = request.files.getlist("files")
    cleaned_files = []

    for file in files:
        if not file.filename.endswith('.xml'):
            continue

        xml_data = file.read()
        try:
            root = etree.fromstring(xml_data)

            for elem in root.iter():
                if elem.text is None or elem.text.strip() == "":
                    if elem.tag in REQUIRED_FIELDS:
                        elem.text = "N/A"
                    else:
                        elem.text = ""

            cleaned_path = os.path.join(CLEANED_FOLDER, f"cleaned_{os.path.basename(file.filename)}")
            with open(cleaned_path, 'wb') as f:
                f.write(etree.tostring(root, pretty_print=True, encoding='utf-8'))
            cleaned_files.append(cleaned_path)

        except Exception as e:
            print(f"Error in {file.filename}: {e}")

    if not cleaned_files:
        return jsonify({"error": "No valid XML files found"}), 400

    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w') as zipf:
        for path in cleaned_files:
            zipf.write(path, os.path.basename(path))
    zip_buffer.seek(0)

    return send_file(zip_buffer, mimetype='application/zip',
                     as_attachment=True, download_name='cleaned_xmls.zip')

if __name__ == "__main__":
    app.run(debug=True, port=5000)
