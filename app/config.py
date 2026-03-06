from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
import secrets

class Settings(BaseSettings):
    """
    Application configuration loaded from environment variables.

    Security: SECRET_KEY defaults to a generated value but should be set explicitly in production.
    """
    SECRET_KEY: str = None  # Will be generated if not provided
    DATABASE_URL: str = "sqlite:///./veritas.db"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"

    # Business rules
    MAX_PENDING_PER_USER: int = 3
    GLOBAL_PENDING_CAP: int = 1000
    DEFAULT_PAGE_SIZE: int = 50
    MAX_PAGE_SIZE: int = 100
    SQL_ECHO: bool = False

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
        # Generate SECRET_KEY if not provided
        if not self.SECRET_KEY:
            self.SECRET_KEY = secrets.token_urlsafe(32)
        
        # Validate SECRET_KEY length
        if len(self.SECRET_KEY) < 32:
            raise ValueError(
                "SECRET_KEY must be at least 32 characters. "
                "Generate with: openssl rand -hex 32"
            )

        # Allow both SQLite and PostgreSQL in production
        # Only validate that a database URL is set
        if not self.DATABASE_URL:
            raise ValueError("DATABASE_URL must be set")

        if not (5 <= self.ACCESS_TOKEN_EXPIRE_MINUTES <= 120):
            raise ValueError(
                "ACCESS_TOKEN_EXPIRE_MINUTES must be between 5 and 120"
            )

@lru_cache()
def get_settings() -> Settings:
    """
    Cached settings singleton.
    Why cached: Settings loaded once at startup, reused across requests.
    Prevents re-reading .env on every endpoint call.
    """
    return Settings()

