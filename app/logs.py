import logging
from logging.handlers import RotatingFileHandler

handler = RotatingFileHandler("access.log", maxBytes=1000000, backupCount=3)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[handler]
)

logger = logging.getLogger("auth-api")
logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)

