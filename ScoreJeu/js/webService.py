from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

#pip install flask psycopg2 flask-cors

app = Flask(__name__)
CORS(app)  # Enable CORS to allow access from other origins (like your JavaScript frontend)

# PostgreSQL connection details
DB_HOST = "localhost"
DB_NAME = "jeuJavaScores"
DB_USER = "postgres"
DB_PASSWORD = "7412"

# Route to fetch data
@app.route('/api/data', methods=['GET'])
def get_data():
    try:

        carte = request.args.get('nomCarte', None)  # Default to None if not provided

        print(carte)

        # Connect to PostgreSQL
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = conn.cursor()

        # Query the database
        cursor.execute("SELECT nomJoueur, points, s.coderang, libelleniveau, TO_CHAR(temps, 'MM:SS') as temps FROM score s JOIN niveau n on n.idniveau = s.idniveau JOIN rang r on r.coderang = s.coderang WHERE s.idniveau LIKE '%" + carte + "%' Order by points DESC, temps ASC;")
        rows = cursor.fetchall()

        # Format the data as a list of dictionaries
        data = [
            {
                "nomJoueur": row[0],
                "points": row[1],
                "rang": row[2],
                "niveau": row[3],
                "temps": str(row[4]) if row[4] else None  # Convert to string
            } 
            for row in rows
        ]

        # Close the connection
        cursor.close()
        conn.close()

        # Return the data as JSON
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/data/name',methods=['GET'])
def get_data_name():
    try:

        carte = request.args.get('nomCarte', None)  # Default to None if not provided
        name = request.args.get('nomJoueur', None)  # Default to None if not provided

        print(carte)
        print(name)

        # Connect to PostgreSQL
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cursor = conn.cursor()

        # Query the database
        cursor.execute("SELECT nomJoueur, points, s.coderang, libelleniveau, TO_CHAR(temps, 'MM:SS') as temps FROM score s JOIN niveau n on n.idniveau = s.idniveau JOIN rang r on r.coderang = s.coderang WHERE s.idniveau LIKE '%" + carte + "%' AND nomJoueur LIKE '%" + name + "%' Order by points DESC, temps ASC;")
        rows = cursor.fetchall()

        # Format the data as a list of dictionaries
        data = [
            {
                "nomJoueur": row[0],
                "points": row[1],
                "rang": row[2],
                "niveau": row[3],
                "temps": str(row[4]) if row[4] else None  # Convert to string
            } 
            for row in rows
        ]

        # Close the connection
        cursor.close()
        conn.close()

        # Return the data as JSON
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=3000)
