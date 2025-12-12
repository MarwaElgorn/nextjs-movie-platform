🎬 Next.js Movie Platform

A complete movie platform built with Next.js.
The project includes a public UI, a protected admin dashboard, and multiple rendering patterns that reflect real production use.

📌 Table of Contents

Overview

Features

Rendering Strategy

Public UI

Admin Dashboard

Core Logic

Tech Stack

Project Structure

Installation

Environment Variables

Future Enhancements

Project Purpose

📝 Overview

This project delivers a full movie platform with:

A cinematic public interface

A secure admin dashboard

CRUD operations for movies

Multiple rendering techniques (SSG, ISR, CSR, SSR)

It showcases clean structure, reusable components, and production-style architecture.

🚀 Features
Public Interface

Featured movies

Movie details

Instant search in Home

Full TMDB search

Wishlist page

Error and loading states

Image optimization

Admin Dashboard

Access is restricted to the admin only.

Email: admin@movie.app
Password: admin123


Admin can:

Add movie

Edit movie

Delete movie

Search inside dashboard

View data in a responsive table

Logout

⚙️ Rendering Strategy

This project uses several rendering methods to show control over Next.js.

Feature	Method	Reason
Home Page	SSG	Fast and static
Movies List	ISR	Periodic updates
Movie Details	ISR / SSR	Dynamic data
Search Page	CSR	Instant search
Dashboard	CSR	Protected route
Server actions	Server	Secure operations
🎨 Public UI

The UI includes:

Movie grid display

Details page with metadata

Client filtering

URL-based TMDB search

Responsive layout

Optimized images

Loading and error handling

🔐 Admin Dashboard

The dashboard is built to simulate real admin systems.

Login with role-based access

Protected routes using local session

CRUD operations fully functional

Live search in the dashboard

Form validation and error handling

Responsive table for movie data

🧩 Core Logic

Key logic implemented in the app:

Local filtering for instant search

Fetch queries for TMDB search

ISR caching for movie details

CRUD operations for admin

Redirects for unauthorized users

Clean modular structure for scalability

🛠 Tech Stack

Next.js 14

React

TailwindCSS

TMDB API

Next Image Optimization

📁 Project Structure
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

📦 Installation
npm install
npm run dev

🔑 Environment Variables

Create .env.local and add the following:

NEXT_PUBLIC_TMDB_API_KEY=YOUR_KEY
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMG=https://image.tmdb.org/t/p/w500

📌 Future Enhancements

Real authentication

User accounts and favorites

Genre filters

Infinite scroll

🎯 Project Purpose

This project shows:

Real experience with Next.js rendering modes

Ability to build a full platform

Strong understanding of UI development

Clean code and modular structure

Dashboard implementation similar to production apps

It works as a strong portfolio piece for frontend job applications.