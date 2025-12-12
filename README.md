# Next.js Movie Platform

A complete movie platform built with Next.js.  
The project includes a public UI, a protected admin dashboard, and multiple rendering methods used in real production workflows.

---

## Table of Contents

- Overview  
- Features  
- Rendering Strategy  
- Public UI  
- Admin Dashboard  
- Core Logic  
- Tech Stack  
- Project Structure  
- Installation  
- Environment Variables  
- Future Enhancements  
- Project Purpose  

---

## Overview

This project delivers a movie platform with:

- A cinematic public interface  
- A secure admin dashboard  
- CRUD operations for movies  
- Multiple rendering techniques in Next.js  

The structure is clean, scalable, and optimized for real-world use.

---

## Features

### Public Interface
- Featured movies  
- Movie details page  
- Instant search in the Home page  
- TMDB search with API queries  
- Wishlist page  
- Loading and error handling  
- Image optimization  

### Admin Dashboard

Admin-only access using a simple session system.

```
Email: admin@movie.app
Password: admin123
```

Admin abilities:
- Add movie  
- Edit movie  
- Delete movie  
- Search movies  
- View movies in a responsive table  
- Logout  

---

## Rendering Strategy

| Feature | Method | Why |
|--------|--------|------|
| Home Page | SSG | Faster static delivery |
| Movies List | ISR | Auto-refresh pages |
| Movie Details | ISR / SSR | Dynamic content |
| Search Page | CSR | Instant updates |
| Dashboard | CSR | Protected area |
| Server Actions | Server | Secure operations |

---

## Public UI

- Movie grid with dynamic data  
- Movie details layout  
- Search that updates instantly  
- TMDB API integration  
- Fully responsive design  
- Image optimization using `next/image`  

---

## Admin Dashboard

The dashboard simulates a real production admin panel.

- Login system  
- Role-based access  
- Local session stored in browser  
- Protected routes  
- CRUD operations  
- Error and validation handling  
- Responsive tables  

---

## Core Logic

- Local filtering for fast search  
- URL-based TMDB search  
- ISR caching for movie details  
- Secure server actions  
- Protected routes using redirects  
- Modular structure for reusability  

---

## Tech Stack

- Next.js 14  
- React  
- TailwindCSS  
- TMDB API  
- Next Image Optimization  

---

## Project Structure

```
src/
 ├── app/
 │   ├── components/
 │   │   ├── Navbar.jsx
 │   │   ├── MovieCard.jsx
 │   │   ├── Footer.jsx
 │   ├── login/
 │   ├── dashboard/
 │   │   ├── add/
 │   │   ├── edit/[id]/
 │   ├── movies/
 │   │   ├── [movieid]/
 │   ├── api/
 │   │   ├── admin/movies/
 │   │   │   ├── route.js
 │   │   ├── admin/movies/[id]/
 ├── lib/
 │   ├── config.js
 │   ├── moviesDB.js
```

---

## Installation

```bash
npm install
npm run dev
```

---

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_TMDB_API_KEY=YOUR_KEY
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMG=https://image.tmdb.org/t/p/w500
```

---

## Future Enhancements

- Real authentication  
- User accounts and favorites  
- Genre filtering  
- Infinite scroll  

---

## Project Purpose

This project demonstrates:

- Building a full platform from scratch  
- Controlling different rendering methods in Next.js  
- Admin dashboard implementation  
- API integration  
- Clean and scalable folder structure  
- Production-style workflows  

It is a strong portfolio project for frontend roles.
## 🔗 Live Demo

You can view the live version of the project here:

👉 **https://nextjs-movie-platform.vercel.app/**
