# MovieMate

## Course Information
Course: Electronic Business Development (BINF 503)  
Semester: Winter 2025  
Instructor: Dr. Nourhan Hamdi  
Teaching Assistants: Mr. Nour Gaser, Mr. Omar Alaa  

---

## 1. Team Members

| Name          | Student ID | Tutorial Group | GitHub Username        |
|---------------|-----------:|----------------|-------------------------|
| Moustafa Amer | 13001482   | T4             | @mosamer5267-code      |
| Fares Shady   | 13005225   | T4             | @faresshady7-code      |
| Farida Adham  | 14001732   | T#             | @username              |
| Israa Haggag  | 13004569   | T2             | @israahaggag           |
| Nadine Ghazy  | 13002308   | T2             | @nadineghazy           |
| Vania Ahmed   | 13007464   | T2             | @vaniaabdelghafar      |

---

## 2. Project Description

MovieMate is a personalized recommendation app that helps users instantly discover new movies based on titles they already enjoy.

### Problem

Users waste time scrolling through endless movie options, not knowing what to choose.

### Solution

MovieMate analyzes  
- genres  
- keywords  
- description  

and returns similar movies that match the user’s preferences.

---

## 3. Feature Breakdown

### 3.1 Full Product Vision (Future Scope)

- Movie search  
- Personalized recommendations  
- User profiles  
- Watchlist (saved movies)  
- Rating system  
- Trending movies  
- Genre filtering  
- Detailed movie info page  
- History tracking  
- Web and mobile support  

---

### 3.2 MVP Features (Course Scope)

1. User Authentication (Registration/Login)  
2. Search for a Movie  
3. View Movie Details  
4. Get Similar Movie Recommendations  
5. Save a Movie to Favorites  
6. View User’s Favorite Movies List  

---

## 4. Feature Assignments

| Team Member   | Assigned Feature                 | Responsibilities                                       |
|---------------|----------------------------------|--------------------------------------------------------|
| Farida Adham  | User Authentication              | Registration, login, JWT handling, password hashing    |
| Moustafa Amer | Search for a Movie               | Search endpoint and DB query                           |
| Nadine Ghazy  | View Movie Details               | Retrieve and return full movie information             |
| Vania Ahmed   | Get Similar Recommendations      | Implement similarity logic and connect to frontend     |
| Fares Shady   | Save Movie to Favorites          | Add movie to favorites and update user document        |
| Israa Haggag  | View User’s Favorite Movies List | Fetch and display user’s saved favorites from MongoDB  |

---

## 5. Data Model (Initial Schemas)

### 5.1 User Schema

```js
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});
```

### 5.2 Movie Schema
```js
const MovieSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  year:        Number,
  genres:      [String],
  description: String,
  posterURL:   String,
  keywords:    [String],
  rating:      Number
});
```

