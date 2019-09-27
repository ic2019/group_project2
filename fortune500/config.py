import os

# Initializing all database variables

db_host = os.environ.get('DB_HOST', default='localhost')
db_name = os.environ.get('DB_NAME', default='fortune500_db')
db_password = os.environ.get('DB_PASSWORD', default='password')
db_port = os.environ.get('DB_PORT', default='5432')
db_user = os.environ.get('DB_USERNAME', default='postgres')

SQLALCHEMY_DATABASE_URI = f"postgres://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

# Initializing quandl api key
apiKey = "4CVJgYzyLyypcSqr9Ckc"
