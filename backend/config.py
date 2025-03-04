import os
from dotenv import load_dotenv


load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")

# Other global configurations can be added here
