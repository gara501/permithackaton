import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Players from "./components/Players";
import { Nav } from '../src/components/Nav';
import CreateCharacter from "./components/CreateCharacter";
import CreateActions from "./components/CreateActions";
import Game from "./components/Game";

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

function App() {
  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <SignedIn>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/players" element={<Players />} />
            <Route path="/game" element={<Game />} />
            <Route path="/characters" element={<CreateCharacter />} />
            <Route path="/actions" element={<CreateActions />} />
          </Routes>
        </Router>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
