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

## Implementation Details - Backend

I made an API using NodeJS and Express, calls looks like this one:

```javascript
router.get("/", checkPermission("read", "game"), async (req, res) => {
  try {
    const resources = await permit.api.resources.list();
    res.json(resources);
  } catch (error) {
    console.error("Error getting resources:", error);
    res.status(500).json({ error: `Can't load resources ${error}` });
  }
});
```

I created a middleware to validate the permissions using PermitIO.

```javascript
function checkPermission(action, resourceType, resourceIdParam = null) {
  return async (req, res, next) => {
    try {
      // Obtener el usuario directamente del request
      const auth = req.auth;
      const userId = auth?.userId;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized: no user" });
      }

      // Definir resourceId
      const resource = {
        type: resourceType,
        id: resourceIdParam ? req.params[resourceIdParam] : undefined,
      };

      // Verificar permiso en Permit
      const isAllowed = await permit.check(userId, action, resource);

      if (!isAllowed) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient permissions" });
      }

      // Si pasa, continuar
      next();
    } catch (error) {
      console.error("Error checking permission:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
```

After that, I exposed the different endpoints to be consumed by the UI.

### Implementation Details - FrontEnd

- I used React, Typescript and Tailwind to create the frontend that consumes this API, I made the login using Clerk as Auth manager.
- I created some custom hooks to call the api functions.

```javascript
const create = async (bodyData: unknown) => {
  setLoading(true);

  try {
    const token = await getToken();
    const response = await fetch(`http://localhost:3000/api/${apiname}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (response.ok) {
      // navigate("/");
    } else {
      console.error(`Error creating ${apiname}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
};
```
