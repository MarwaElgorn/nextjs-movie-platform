# Next.js Movie App - Complete Refactoring Guide

## PHASE 1: Consolidated Components ✅ COMPLETED

All home page components have been moved from `src/app/components/` to `src/components/`:

- ✅ Hero.jsx
- ✅ CategorySection.jsx
- ✅ DevicesSection.jsx
- ✅ FAQSection.jsx
- ✅ PlansSection.jsx
- ✅ TrialSection.jsx
- ✅ Navbar.jsx
- ✅ Footer.jsx

Existing components already in `src/components/`:

- ✅ MovieCard.jsx (duplicated - kept src/components version)
- ✅ Toast.jsx
- ✅ ConfirmModal.jsx

## PHASE 2: Import Path Updates ✅ COMPLETED

Files already updated:

- ✅ src/app/page.jsx - Home page imports from @/components
- ✅ src/app/layout.js - Layout imports from @/components

## PHASE 3: Files Still Needing Update

The following files import from `./components/` or need rendering strategy updates:

### Dashboard Pages

- src/app/dashboard/page.jsx - Already correct (uses @/components)
- src/app/dashboard/add/page.jsx - Check imports
- src/app/dashboard/edit/[id]/EditForm.jsx - Check imports

### Movies Pages

- src/app/movies/page.jsx - Check imports
- src/app/movies/[movieid]/page.jsx - Check imports + needs SSR/ISR decision
- src/app/movies/error.jsx - Check imports
- src/app/movies/loading.jsx - Check imports

### Search Page

- src/app/Search/page.jsx - CSR page (already correct)

### Wishlist Page

- src/app/wishlist/page.jsx - CSR page

## PHASE 4: Rendering Strategies to Apply

### Home Page (src/app/page.jsx)

**Current:** `export const dynamic = "force-static"`
**Strategy:** SSG (Static Site Generation)
**Reason:** Content is static and doesn't change frequently. Homepage content comes from static assets.
**Directives:** Keep `force-static` ✅

### Movies List Page (src/app/movies/page.jsx)

**Strategy:** ISR (Incremental Static Regeneration)  
**Reason:** Movies data from TMDB API is relatively stable but needs periodic refresh. Cache for 1 hour then revalidate.
**Directives:** Add `export const revalidate = 3600;`

### Single Movie Page (src/app/movies/[movieid]/page.jsx)

**Strategy:** ISR (Incremental Static Regeneration)
**Reason:** Individual movie data is mostly stable. Use ISR with `generateStaticParams` for popular movies and fallback to dynamic for others.
**Current Implementation:** Already has `generateStaticParams` ✅
**Directives:** Add `export const revalidate = 1800;` (30 mins)

### Dashboard (src/app/dashboard/page.jsx)

**Current:** `"use client"`
**Strategy:** CSR (Client-Side Rendering)
**Reason:** Dashboard requires state management, modals, forms, and CRUD operations. All interaction-heavy.
**Directives:** Keep `"use client"` ✅

### Add Movie Page (src/app/dashboard/add/page.jsx)

**Strategy:** CSR (Client-Side Rendering)
**Reason:** Form submission and state management needed.
**Directives:** Ensure `"use client"` directive

### Edit Movie Page (src/app/dashboard/edit/[id]/page.jsx)

**Strategy:** Hybrid - Server component for fetching, client for form
**Reason:** Fetch movie data server-side, render form client-side
**Directives:**

- Keep page async (server)
- Move EditForm to client with `"use client"`

### Search Page (src/app/Search/page.jsx)

**Current:** `"use client"`
**Strategy:** CSR (Client-Side Rendering)
**Reason:** Debounced search input and live results require client-side state.
**Directives:** Keep `"use client"` ✅

### Wishlist Page (src/app/wishlist/page.jsx)

**Strategy:** CSR (Client-Side Rendering)
**Reason:** Uses localStorage for persistence. State-dependent on user interactions.
**Directives:** Ensure `"use client"` directive

### API Routes (src/app/api/\*\*)

**Directives:**

- ❌ NO `"use client"` directives
- ✅ Only server-side code
- ✅ Proper error handling with HTTP status codes

## PHASE 5: Folder Structure - FINAL

```
src/
├── app/
│   ├── api/
│   │   └── admin/
│   │       └── movies/
│   │           ├── route.js          (GET all, POST new)
│   │           └── [id]/
│   │               └── route.js      (GET one, PUT update, DELETE)
│   ├── dashboard/
│   │   ├── page.jsx                  (CSR - Admin interface)
│   │   ├── add/
│   │   │   └── page.jsx              (CSR - Add movie form)
│   │   └── edit/
│   │       └── [id]/
│   │           ├── page.jsx          (Server - Fetch data)
│   │           └── EditForm.jsx      (CSR - Edit form)
│   ├── movies/
│   │   ├── page.jsx                  (ISR - Movie list)
│   │   ├── [movieid]/
│   │   │   ├── page.jsx              (ISR - Movie detail)
│   │   │   ├── loading.jsx
│   │   │   └── error.jsx
│   │   ├── loading.jsx
│   │   └── error.jsx
│   ├── Search/
│   │   └── page.jsx                  (CSR - Search with debounce)
│   ├── wishlist/
│   │   └── page.jsx                  (CSR - Wishlist with localStorage)
│   ├── globals.css                   (Minimal Tailwind setup)
│   ├── layout.js                     (Root layout - Server)
│   ├── page.jsx                      (SSG - Home page)
│   ├── global-error.jsx
│   └── not-found.jsx
│
├── components/          ← ★ UNIFIED COMPONENTS FOLDER ★
│   ├── Navbar.jsx                    (CSR - Mobile menu state)
│   ├── Footer.jsx                    (Server - Static footer)
│   ├── Hero.jsx                      (Server - Static hero)
│   ├── CategorySection.jsx           (CSR - Interactive cards)
│   ├── DevicesSection.jsx            (Server - Static list)
│   ├── FAQSection.jsx                (CSR - Accordion state)
│   ├── PlansSection.jsx              (CSR - Toggle state)
│   ├── TrialSection.jsx              (Server - Static CTA)
│   ├── MovieCard.jsx                 (CSR - Reusable card)
│   ├── Toast.jsx                     (CSR - Global notifications)
│   └── ConfirmModal.jsx              (CSR - Delete confirmation)
│
├── data/
│   └── movies.json                   (Local movie storage)
│
├── hooks/
│   └── useDebouncedSearch.js         (Custom search hook)
│
├── lib/
│   ├── config.js                     (API keys, constants)
│   ├── moviesDB.js                   (Database abstraction)
│   ├── constants.js                  (App constants)
│   └── helpers.js                    (Utility functions)
│
└── utils/
    └── api.js                        (API client functions)

public/
├── action.svg
├── adventure.svg
├── ...svg files
└── other assets
```

## PHASE 6: Rendering Strategy Summary

| Page          | Strategy | Use Client | Revalidate | Reason                           |
| ------------- | -------- | ---------- | ---------- | -------------------------------- |
| Home (/)      | SSG      | No         | Never      | Static landing page              |
| Movies Browse | ISR      | No         | 3600s      | TMDB data cached 1 hour          |
| Single Movie  | ISR      | No         | 1800s      | Detailed data, 30 min revalidate |
| Dashboard     | CSR      | Yes        | -          | Admin CRUD with state            |
| Add Movie     | CSR      | Yes        | -          | Form submission & feedback       |
| Edit Movie    | Hybrid   | Yes (form) | -          | Server fetch + client form       |
| Search        | CSR      | Yes        | -          | Debounced search input           |
| Wishlist      | CSR      | Yes        | -          | localStorage dependent           |
| API Routes    | N/A      | Never      | -          | Pure server functions            |

## PHASE 7: Key Fixes to Apply

1. **Remove duplicate MovieCard** - Keep only `src/components/MovieCard.jsx`
2. **Add rendering directives** to all pages
3. **Ensure no "use client"** in API routes
4. **Check for uncontrolled inputs** - Add defaultValue or state
5. **Remove console.logs** - Debug code cleanup
6. **Verify import paths** - All use `@/` absolute imports
7. **Check for dead code** - Unused variables, imports
8. **Validate CRUD operations** - Test add/edit/delete flows

## Next Steps

All components have been consolidated and import paths updated for the home page and layout. The rendering strategies are documented above and ready to apply.

To complete the refactoring:

1. Apply rendering directives to all remaining pages
2. Update remaining import paths
3. Remove duplicate components from src/app/components/
4. Test all CRUD operations
5. Verify no "use client" in API routes
6. Clean up console logs and dead code
