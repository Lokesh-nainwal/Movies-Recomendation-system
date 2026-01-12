#  Movie Recommendation System

A Movie Recommendation System built using Machine Learning that recommends movies based on similarity between movie content. This project uses content-based filtering techniques to provide personalized movie suggestions.

---

##  Project Overview

This project recommends movies to users by analyzing movie features such as genres, overview, keywords, cast, and crew. Instead of relying on user ratings, the system focuses on **movie-to-movie similarity**, making it efficient and suitable even when user data is limited.

---

##   Features

- Content-based movie recommendations
- Uses text-based similarity for accurate results
- No dependency on user ratings
- Handles cold start problem for new users
- Simple and scalable design
- Easy to integrate with web applications

---

##  Recommendation Technique

### Content-Based Filtering

- Recommends movies similar to a selected movie
- Uses movie metadata:
  - Genres
  - Overview / Description
  - Keywords
  - Cast
  - Crew
- Converts text data into vectors
- Measures similarity using cosine similarity

---

##  Tech Stack

- **Language:** Python  
- **Libraries:**
  - pandas
  - numpy
  - scikit-learn
  - nltk (optional)
- **Machine Learning Concepts:**
  - TF-IDF / Count Vectorizer
  - Cosine Similarity

---

##  Workflow

1. Load the movie dataset
2. Clean and preprocess data
3. Combine important features into a single text field
4. Convert text into numerical vectors
5. Calculate similarity scores
6. Recommend top similar movies

---



###  Clone the repository
```bash
git clone https://github.com/Lokesh_Nainwal/Movie-Recommendation-System.git


