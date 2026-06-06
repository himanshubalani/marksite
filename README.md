# ![Marksite Logo](public\icon1.png) MarkSite

## Project Overview
MarkSite is a highly utilitarian, distraction-free bookmark and link manager. It allows users to save, tag, and organize useful links with automatic metadata fetching. It features a curated UI where cards act as "living tabs" with color accents derived from the saved domains, complete with real-time search, tag filtering, and automatic favicon fetching.

## Tech Stack Used
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Base UI (shadcn)
- **Database**: MongoDB + Mongoose
- **Icons**: Lucide React
- **Metadata Fetching**: Microlink API

## Features Implemented
- Complete CRUD API functionality for bookmarks.
- Automatic URL metadata fetching (Title, Description, and Favicons).
- Interactive Sidebar with dynamic tag population.
- Real-time Search and Tag filtering via URL parameters.
- Public vs Private bookmark visibility filtering.
- Domain-based color accents for visual organization.
- Real-time dashboard statistics.

## How to Run Locally

### Prerequisites
- Node.js 18+
- MongoDB Database URI

### 1. Clone & Install
\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables Required
Create a `.env` file in the root directory (you can copy the provided `.env.example`) and add your MongoDB connection string:
\`\`\`env
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/marksite"
\`\`\`

### 3. Database Setup Instructions
No manual schema creation is required! Mongoose will automatically create the `bookmarks` collection inside your MongoDB database upon the first connection and document insertion. Just ensure your `DATABASE_URL` is correct and allows connections from your IP.

### 4. Start Development Server
\`\`\`bash
npm run dev
\`\`\`
The app will be running at [http://localhost:3000](http://localhost:3000).

---

## Routes & Pages Included
- `/` - Landing Page (SSG)
- `/dashboard` - Personal Link Dashboard with Search & Filtering (SSR)
- `/explore` - Public Community Links (ISR)

## API Routes Included
- `GET /api/bookmarks` - Fetches all bookmarks.
- `POST /api/bookmarks` - Creates a new bookmark programmatically.
- `PUT /api/bookmarks/[id]` - Updates an existing bookmark.
- `DELETE /api/bookmarks/[id]` - Removes a specific bookmark.

## Server Actions Used
- `saveBookmark(formData)`: Next.js Server Action used by the Add Bookmark Modal. It safely parses form data, fetches metadata via Microlink, inserts the record into MongoDB, and calls `revalidatePath('/', 'layout')` to instantly update the UI cache without needing a page reload.

## Rendering Strategies Used
This project carefully selects Next.js rendering strategies based on data freshness requirements to demonstrate a deep understanding of the App Router:

1. **SSG (Static Site Generation)**: 
   - **Where**: The Landing Page (`app/page.tsx`). 
   - **Why**: Because the content is entirely static marketing text and visuals, it is rendered at build time to provide instant load speeds and perfect SEO with zero server overhead.
2. **SSR (Server-Side Rendering)**: 
   - **Where**: The Dashboard (`app/dashboard/page.tsx`). 
   - **Why**: Using `force-dynamic`, this ensures that when a user interacts with their personal links (adding, deleting, searching), they are *always* guaranteed to see the most accurate, real-time database state. Search parameters are resolved dynamically on the server.
3. **ISR (Incremental Static Regeneration)**: 
   - **Where**: The Explore page (`app/explore/page.tsx`). 
   - **Why**: Since public bookmarks are updated occasionally but heavily viewed by the public, `revalidate = 60` was used. This gives the page the lightning-fast speed of SSG, while rebuilding in the background every minute to keep data fresh without overloading the database.

## Assumptions & Limitations
- Authentication is currently mocked. The "Dashboard" currently acts as a single-user view for demonstration purposes. OAuth integration is planned for later.
- The Microlink API is used for metadata scraping; heavily rate-limited usage may result in fallback to raw URLs without descriptions or favicons.

## Future Roadmap
While this MVP focuses on core Next.js rendering strategies and clean routing, MarkSite is architected to scale into a fully-featured bookmark website. Some planned features include:

- [ ] **Authentication**: Google OAuth Login or custom OIDC integration to support multiple users.
- [ ] **AI-Powered Organization**: Adding AI to auto-generate tags, perform sentiment analysis, and index links for semantic/faster search.
- [ ] **Smart Homepage Experience**: Providing a dedicated view designed to be set as a Chrome Homepage, featuring custom backgrounds, a Google Search bar, and AI-suggested bookmarks based on frequency of use.
- [ ] **Import/Export**: Chrome-style bookmark importing and exporting for seamless onboarding.
- [ ] **Advanced Views**: A horizontal carousel UI for rapid visual browsing of link cards.