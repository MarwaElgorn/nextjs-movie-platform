A complete movie platform built with Next.js.
The project includes a public website and a protected admin dashboard.
The code uses multiple rendering methods to match real production behavior.
The structure is simple, clean, and ready to scale.

Main Features
Public Website

Featured movies

Movie details

Instant client search

Full TMDB search

Wishlist page

Loading and error states

Image optimization

Admin Dashboard

Access is restricted to admin only.

Email: admin@movie.app
Password: admin123


Admin can:

Add movie

Edit movie

Delete movie

Search movies

View movies in a responsive table

Logout

Rendering Methods

The project uses several rendering techniques to show control over Next.js.

SSG for the Home page

ISR for movie list updates

SSR or ISR for movie details

CSR for dashboard and search

Server actions for secure operations

Each page uses the rendering mode suitable for its purpose.

Core Logic

Local filtering for instant search

TMDB search using URL queries

Controlled data fetching

ISR cache for movie details

Protected routes for admin

CRUD operations for movies

Tech Stack

Next.js 14

React

TailwindCSS

TMDB API

Next Image optimization

Project Purpose

This project demonstrates:

Ability to build a full platform

Understanding of rendering strategies

Real dashboard experience

API integration

Clean and organized code

Production-style architecture

It works as a portfolio project for frontend development.

Installation
npm install
npm run dev

Environment Variables

Create a .env.local file:

NEXT_PUBLIC_TMDB_API_KEY=YOUR_KEY
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMG=https://image.tmdb.org/t/p/w500

Future Enhancements

Real authentication

User accounts

Movie filters by genre

Infinite scroll