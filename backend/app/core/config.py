from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Vector Store
    vector_store_path: str = "./data/vector_store"
    
    # Document Processing - INCREASED OVERLAP
    chunk_size: int = 500
    chunk_overlap: int = 200  # Increased from 100
    
    upload_folder: str = "./data/documents"
    
    # Voyage AI for embeddings
    voyage_api_key: str = ""
    
    # Groq for LLM (free!)
    groq_api_key: str = ""
    
    # OpenAI (optional fallback)
    openai_api_key: str = ""
    
    # Database
    database_url: str = "sqlite:///./hr_compliance.db"
    
    # Authentication
    secret_key: str = "your-super-secret-jwt-key-change-this-in-production"
    debug: bool = True
    
    # Frontend URL for CORS
    frontend_url: str = "http://localhost:3000"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    
    class Config:
        env_file = ".env"

settings = Settings()
