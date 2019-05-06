# Instrucciones para importar CSV

1. Convertir CSV descargado en Json con csv2json (npm module)
2. Importar en coleccion "acciones_condicional"

    Ejemplo:

    mongoimport -d local -c acciones_condicional --jsonArray acciones_condicional_030519.json

# Importar en base de datos de mongolab

mongoimport -h ds253804.mlab.com:53804 -d heroku_kw3v2kjv -c acciones_condicional -u <user> -p <password> --file <input file>

Usuario: test
clave: promptbookuser1
