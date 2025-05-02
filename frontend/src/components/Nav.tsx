import { useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export function Nav() {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Game Characters Manager</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/players">Config</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/characters">Create Character</Link></li>
          <li><Link to="/actions">Create Actions</Link></li>
          <li>
            <details>
              <summary>User</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
}
