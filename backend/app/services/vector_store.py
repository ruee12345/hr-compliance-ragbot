import os
import pickle
import numpy as np
from typing import List, Dict, Any
import voyageai
from app.core.config import settings

class VectorStore:
    _instance = None
    _initialized = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(VectorStore, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        # Prevent re-initialization
        if self._initialized:
            return
            
        print(f"DEBUG: Initializing VectorStore with Voyage AI API")
        
        # Initialize Voyage AI client
        self.voyage_client = voyageai.Client(api_key=settings.voyage_api_key)
        
        self.vector_store_path = settings.vector_store_path
        self.documents = []  # Store document chunks
        self.embeddings = []  # Store embeddings
        
        # Create vector store directory if it doesn't exist
        os.makedirs(self.vector_store_path, exist_ok=True)
        print(f"DEBUG: Vector store path: {self.vector_store_path}")
        
        # Try to load existing data
        self.load_index()
        
        self._initialized = True
    
    def create_embeddings(self, texts: List[str]) -> np.ndarray:
        """Create embeddings using Voyage AI API"""
        print(f"DEBUG: Creating embeddings for {len(texts)} texts using Voyage AI")
        
        if not texts:
            return np.array([])
        
        try:
            # Use Voyage AI API
            result = self.voyage_client.embed(
                texts=texts,
                model="voyage-2",
                input_type="document"
            )
            embeddings = np.array(result.embeddings, dtype=np.float32)
            print(f"DEBUG: Voyage AI embeddings shape: {embeddings.shape}")
            return embeddings
            
        except Exception as e:
            print(f"DEBUG ERROR: Voyage AI embedding failed: {e}")
            # Fallback to random embeddings
            dimension = 1024  # voyage-2 dimension
            return np.random.randn(len(texts), dimension).astype(np.float32)
    
    def add_documents(self, documents: List[Dict[str, Any]]):
        """Add documents to vector store"""
        if not documents:
            print("DEBUG: No documents to add")
            return
        
        print(f"DEBUG: Adding {len(documents)} documents to vector store")
        
        # Extract texts
        texts = [doc["text"] for doc in documents]
        print(f"DEBUG: First text sample: {texts[0][:100]}...")
        
        # Create embeddings using Voyage AI
        new_embeddings = self.create_embeddings(texts)
        print(f"DEBUG: Created embeddings shape: {new_embeddings.shape}")
        
        # Store documents and embeddings
        self.documents.extend(documents)
        if len(self.embeddings) == 0:
            self.embeddings = new_embeddings
        else:
            self.embeddings = np.vstack([self.embeddings, new_embeddings])
        
        print(f"DEBUG: Now have {len(self.documents)} total documents")
        
        # Save
        self.save_index()
        print(f"DEBUG: Saved to {self.vector_store_path}")
    
    def search(self, query: str, k: int = 10) -> List[Dict[str, Any]]:
        """Search for similar documents using cosine similarity"""
        print(f"DEBUG: Searching for query: '{query}'")
        
        if len(self.documents) == 0:
            print("DEBUG: No documents in store, returning empty results")
            return []
        
        print(f"DEBUG: Store has {len(self.documents)} documents")
        
        # Create query embedding using Voyage AI
        try:
            result = self.voyage_client.embed(
                texts=[query],
                model="voyage-2",
                input_type="query"
            )
            query_embedding = np.array(result.embeddings[0], dtype=np.float32)
        except Exception as e:
            print(f"DEBUG ERROR: Query embedding failed: {e}")
            return []
        
        # Calculate cosine similarity
        # Normalize embeddings
        query_norm = query_embedding / (np.linalg.norm(query_embedding) + 1e-8)
        doc_norms = self.embeddings / (np.linalg.norm(self.embeddings, axis=1, keepdims=True) + 1e-8)
        
        # Compute similarities
        similarities = np.dot(doc_norms, query_norm)
        
        # Get top k indices
        top_k = min(k, len(similarities))
        top_indices = np.argsort(similarities)[::-1][:top_k]
        
        # Prepare results
        results = []
        for i, idx in enumerate(top_indices):
            results.append({
                "document": self.documents[idx],
                "metadata": self.documents[idx],
                "score": float(similarities[idx]),
                "rank": i + 1
            })
            print(f"DEBUG: Result {i+1}: idx={idx}, similarity={similarities[idx]:.4f}")
        
        print(f"DEBUG: Returning {len(results)} results")
        return results
    
    def save_index(self):
        """Save documents and embeddings to disk"""
        print(f"DEBUG: Saving {len(self.documents)} documents")
        
        # Save documents
        docs_path = os.path.join(self.vector_store_path, "documents.pkl")
        try:
            with open(docs_path, "wb") as f:
                pickle.dump(self.documents, f)
            print(f"DEBUG: Saved documents to {docs_path}")
        except Exception as e:
            print(f"DEBUG ERROR: Failed to save documents: {e}")
        
        # Save embeddings
        emb_path = os.path.join(self.vector_store_path, "embeddings.npy")
        try:
            np.save(emb_path, self.embeddings)
            print(f"DEBUG: Saved embeddings to {emb_path}")
        except Exception as e:
            print(f"DEBUG ERROR: Failed to save embeddings: {e}")
    
    def load_index(self):
        """Load documents and embeddings from disk"""
        docs_path = os.path.join(self.vector_store_path, "documents.pkl")
        emb_path = os.path.join(self.vector_store_path, "embeddings.npy")
        
        print(f"DEBUG: Checking for existing data at {docs_path}")
        
        if os.path.exists(docs_path) and os.path.exists(emb_path):
            try:
                print(f"DEBUG: Loading existing data...")
                with open(docs_path, "rb") as f:
                    self.documents = pickle.load(f)
                self.embeddings = np.load(emb_path)
                print(f"DEBUG: Loaded {len(self.documents)} documents")
            except Exception as e:
                print(f"DEBUG ERROR: Error loading data: {e}")
                self.documents = []
                self.embeddings = np.array([])
        else:
            print(f"DEBUG: No existing data found")
            self.embeddings = np.array([])

    def remove_document(self, filename: str) -> bool:
        """Remove all chunks for a specific document"""
        print(f"DEBUG: Removing document: {filename}")
        
        if not self.documents:
            print(f"DEBUG: No documents to remove")
            return False
        
        # Find indices to keep
        keep_indices = []
        for i, doc in enumerate(self.documents):
            if doc.get("filename") != filename:
                keep_indices.append(i)
        
        if len(keep_indices) == len(self.documents):
            print(f"DEBUG: Document '{filename}' not found")
            return False
        
        print(f"DEBUG: Keeping {len(keep_indices)} chunks")
        
        # Keep only selected documents and embeddings
        self.documents = [self.documents[i] for i in keep_indices]
        if len(self.embeddings) > 0:
            self.embeddings = self.embeddings[keep_indices]
        
        # Save
        self.save_index()
        print(f"DEBUG: Successfully removed document '{filename}'")
        return True

    def clear(self):
        """Clear vector store"""
        print(f"DEBUG: Clearing vector store")
        self.documents = []
        self.embeddings = np.array([])
        
        # Delete saved files
        for filename in ["documents.pkl", "embeddings.npy"]:
            filepath = os.path.join(self.vector_store_path, filename)
            if os.path.exists(filepath):
                os.remove(filepath)
                print(f"DEBUG: Removed {filepath}")
        
        self._initialized = False
