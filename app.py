from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Configuración de la conexión a MySQL
db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'database': 'sistema_campanas'
}

# Endpoint para obtener todas las campañas
@app.route('/campanas', methods=['GET'])
def obtener_campanas():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM campanas")
    campanas = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(campanas)

# Endpoint para agregar una nueva campaña
@app.route('/campanas', methods=['POST'])
def agregar_campana():
    data = request.get_json()
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    query = """
        INSERT INTO campanas (nombre, descripcion, palabras_clave, categoria, estado, intervalo)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        data['nombre'], 
        data['descripcion'], 
        data['palabras_clave'], 
        data.get('categoria', ''), 
        data.get('estado', 'Pendiente'), 
        data.get('intervalo', 5)
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Campaña creada exitosamente"}), 201

# Endpoint para actualizar una campaña
@app.route('/campanas/<int:id>', methods=['PUT'])
def actualizar_campana(id):
    data = request.get_json()
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    query = """
        UPDATE campanas 
        SET nombre = %s, descripcion = %s, palabras_clave = %s, categoria = %s, estado = %s, intervalo = %s
        WHERE id = %s
    """
    cursor.execute(query, (
        data['nombre'],
        data['descripcion'],
        data['palabras_clave'],
        data.get('categoria', ''),
        data.get('estado', 'Pendiente'),
        data.get('intervalo', 5),
        id
    ))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Campaña actualizada exitosamente"}), 200

# Endpoint para eliminar una campaña
@app.route('/campanas/<int:id>', methods=['DELETE'])
def eliminar_campana(id):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    query = "DELETE FROM campanas WHERE id = %s"
    cursor.execute(query, (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Campaña eliminada exitosamente"}), 200

if __name__ == '__main__':
    app.run(debug=True)
