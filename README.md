# Permit IO Hackaton

## Getting Started

## Prerequisites

- Node.js 22+
- Permit.io account and Api Key
- Clerk account and Secret and publishable Key.

## Installation

- Clone the repository `git clone https://github.com/gara501/permithackaton.git`

- Install dependencies:

  - Go to the root path and run: `npm install`

## Set up environment variables

- Create .env files, in backend:

```
PORT=3000
PERMIT_API_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

- Create .env file in frontend:

```
VITE_CLERK_FRONTEND_API=
VITE_BACKEND_URL=http://localhost:3000
```

## Running the applications

- Go to root path again and run: `npm run dev`

## Access and functionality

Follow these steps:

- Create a user in (clerk)[https://dashboard.clerk.com/]
- Copy the User ID that Clerk's assign
- Create the user the directory section in Permit IO, assign the User ID as Key.
- Create different roles for each character you will have in the Game, in this case I have 4 (Elf, Wizard, Warrior, Dwarf), you could create them using the UI or using Permit IO.
- Create a new resource named "game" with the usual actions: create, read, delete, update.
- Create resources as abilities, for example: weapons, magic, etc.
- Assign actions to each resource, example: use, invoke, etc.
- Assign roles to these resources, you can do it using the UI too.

Clerk user is necessary to login in the UI, this user is passed to the backend via Permit API too
