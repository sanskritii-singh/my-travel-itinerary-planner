# 🌍 Itnify — Your AI-Powered Travel Itinerary Planner

*Plan. Explore. Experience.*  
Itnify transforms the way people plan their journeys. Using the power of AI, it generates personalized, day-by-day itineraries based on your destination, duration, and group size — all within seconds.

---

## ✨ What is Itnify?

**Itnify** is an intelligent web application that simplifies travel planning. Gone are the days of scouring through blogs, YouTube videos, and Reddit threads. With just a few clicks, Itnify delivers a curated itinerary tailored to your preferences — powered by **Google Gemini AI** and backed by **Firebase**.

---

## 💡 Why Itnify?

> **“Planning a trip should feel like the beginning of an adventure — not a chore.”**

Modern travelers crave personalization, speed, and intelligence. Itnify bridges that gap using AI-driven prompt engineering, real-time database storage, and a modern UI — giving users a delightful and reliable trip-planning experience.

---

## 🧠 Powered by AI

At the heart of Itnify lies **Google's Gemini API**, which takes contextual prompts like:

> *"Plan a 7-day trip to Switzerland for 3 people. Include major landmarks, travel-friendly schedules, cultural experiences, and realistic commute durations."*

The response? A beautiful, structured day-by-day plan that feels human-curated, yet is entirely AI-generated.

---

## 🔍 Core Features

- 🧳 **Instant Itinerary Generation**  
  Enter your destination, number of days, and group size — get a personalized plan in seconds.

- 🧠 **Gemini AI Integration**  
  Prompts are custom-generated and parsed for realistic outputs — not generic lists.

- 🔐 **Firebase Authentication **  
  Let users sign in and save their travel itineraries.

- 📂 **Real-Time Itinerary Storage**  
  All plans are saved using **Firebase Firestore**, enabling future retrieval and editing.

- 🎨 **Responsive UI**  
  Clean, modern design using **TailwindCSS** and **React.js** for smooth interaction across devices.

---

## 🏗️ Tech Stack

| Layer            | Tools Used                                 |
|------------------|---------------------------------------------|
| Frontend         | React.js, TailwindCSS                      |
| AI               | Google Gemini API                          |
| Backend / DB     | Firebase Firestore                         |
| Authentication   | Firebase Auth                              |
               |

---

🛠️ How It Works (Under the Hood)
User Input
Destination, trip duration, and group size are collected via a clean form.

Prompt Construction
Based on inputs, a detailed prompt is generated dynamically.

AI Request
Prompt is sent to Gemini API using the @google/generative-ai SDK.

Parsing AI Response
The AI returns a formatted Markdown-like or text-based itinerary — parsed and displayed beautifully.

Saving Itinerary
The itinerary is saved in Firestore, enabling users to revisit it later.



