# Permit IO Hackaton

## Getting Started

### Prerequisites

Node.js 22+
Permit.io account and Api Key
Clerk account and Secret and publishable Key.

### Installation

Clone the repository

Install dependencies:

Go to the root path and run:

`npm install`

Go inside "frontend" and "backend" folders and run:

`npm install`

### Set up environment variables

_Create .env files, in backend_:
PORT=3000
PERMIT_API_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

_Create .env file in frontend_:
VITE_CLERK_FRONTEND_API=
VITE_BACKEND_URL=http://localhost:3000

## Running the applications

Go to root path again and run:

`npm run dev`

## Access and functionality

Follow these steps:

- Create a user in (clerk)[https://dashboard.clerk.com/]
- Copy the User ID that Clerk's assign
- Create the user the directory section in Permit IO, assign the User ID as Key.
- Create different roles for each character you will have in the Game, in this case I have 4 (Elf, Wizard, Warrior, Dwarf)
- Create a new resource named "game" with the usual actions: create, read, delete, update.
- Create resources as abilities, for example: weapons.
- Assign actions to this role, a weapon can be: Created, Used, Removed, Improved
- Assign roles to these resources.

Clerk user is necessary to login in the UI, this user is passed to the backend via Permit API.
