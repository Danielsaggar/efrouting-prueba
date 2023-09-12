import json
import requests
import pymysql
import os

# Obtener la clave API de CoinMarketCap desde una variable de entorno
api_key = os.environ['CMC_API_KEY']

# Definir los parámetros para la llamada a la API
url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
headers = {'X-CMC_PRO_API_KEY': api_key}
params = {'symbol': 'BTC,ETH'}

# Definir los datos de conexión a la base de datos desde variables de entorno
db_host = os.environ['DB_HOST']
db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']

# Definir la función principal que se ejecutará cuando se invoque la función Lambda
def lambda_handler(event, context):
  # Hacer la llamada a la API y obtener la respuesta en formato JSON
  response = requests.get(url, headers=headers, params=params)
  data = response.json()
  
  # Extraer los precios y los timestamps de BTC y ETH
  btc_price = data['data']['BTC']['quote']['USD']['price']
  btc_timestamp = data['data']['BTC']['quote']['USD']['last_updated']
  eth_price = data['data']['ETH']['quote']['USD']['price']
  eth_timestamp = data['data']['ETH']['quote']['USD']['last_updated']
  
  # Conectar a la base de datos
  connection = pymysql.connect(host=db_host,
                               user=db_user,
                               password=db_password,
                               database=db_name)
  
  # Crear un cursor para ejecutar consultas SQL
  cursor = connection.cursor()
  
  # Definir la consulta SQL para insertar los precios en la tabla
  sql = "INSERT INTO cryptos (symbol, name, price, timestamp) VALUES (%s, %s, %s, %s)"
  
  # Ejecutar la consulta para BTC y ETH con sus respectivos valores
  cursor.execute(sql, ('BTC', 'Bitcoin', btc_price, btc_timestamp))
  cursor.execute(sql, ('ETH', 'Ethereum', eth_price, eth_timestamp))
  
  # Confirmar los cambios en la base de datos
  connection.commit()
  
  # Cerrar la conexión a la base de datos
  connection.close()
  
  # Devolver un mensaje de éxito en formato JSON
  return {
    'statusCode': 200,
    'body': 'Los precios de BTC y ETH se han insertado correctamente en la base de datos.'
  }
