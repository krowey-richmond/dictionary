# Dictionary App

---

## 📌 Overview

<p align="center">
  <a href="https://dictionary-krb.vercel.app//">
    <img src="image\dictionary-krb.vercel.app.webp" height="300" style="border-radius:10px;" />
  </a>
</p>

A responsive dictionary web application built with HTML, CSS, and JavaScript. The project uses a dictionary API to fetch word definitions, pronunciations, examples, synonyms, and antonyms dynamically.


<div align="center">
<a href="https://dictionary-krb.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/Live%20Demo-VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</a>
</div>

## ✨ Features

* Search for words using a dictionary API
* Display word definitions grouped by part of speech
* Display phonetic pronunciation
* Play audio pronunciation
* Display example sentences when available
* Display synonyms and antonyms
* Clickable synonyms and antonyms for quick word searches
* Search history stored in LocalStorage
* Maximum of 6 recent searches
* Prevents duplicate entries in search history
* Clickable search history
* URL-based word searches using query parameters
* Random starter word displayed when the app is first opened
* Error handling for unavailable or invalid words
* Responsive design across mobile, tablet, and desktop

---

## 🛠️ Tech Stack

* HTML5 (semantic structure)
* CSS3 (Flexbox, Grid, variables, media queries)
* JavaScript (DOM manipulation, Fetch API, async/await, LocalStorage)
* English Dictionary API

---

## 📁 Folder Structure

```bash
dictionary-app/
├── index.html
├── styles.css
├── script.js
└── images/
```

---

## 📦 Installation & Run

Follow these steps to set up and run the project:

```bash
# Clone the repository
git clone https://github.com/krowey-richmond/dictionary-app.git

# Move into the project folder
cd dictionary-app

# Open in VS Code
code .
```

If it runs in the browser:

* Open `index.html` directly

---

## 📊 Project Status

* Status: Completed
* Version: 1.0

---

## 🧠 What I Learned

* Working with external APIs using the Fetch API
* Handling asynchronous JavaScript with async/await
* Working with nested API response data
* Dynamically creating and rendering DOM elements
* Using LocalStorage to persist search history
* Managing arrays and preventing duplicate history entries
* Working with URL query parameters
* Creating clickable dynamic links for related searches
* Handling API errors and missing data
* Working with audio files using the JavaScript Audio API

## Notes

This is a frontend-only project. Word data is fetched dynamically from the English Dictionary API. Search history is stored locally in the user's browser using LocalStorage.
