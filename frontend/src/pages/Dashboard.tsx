// src/pages/Dashboard.tsx

import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react'; // Usamos Clerk para obtener la información del usuario
import { Layout } from '../components/Layout';

const Dashboard: React.FC = () => {
  const { user } = useUser(); // Obtener el usuario autenticado desde Clerk

  useEffect(() => {
    if (!user) {
      return; // Si no hay usuario, no hacemos la petición
    }
  }, [user]);

  return (
    <Layout>
      <h1 className='text-3xl'>Role Game Character Configuration</h1>
      <ul className="list bg-base-100 rounded-box shadow-md">
  
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Role Game Logic using Permit IO</li>
        
        <li className="list-row">
          <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
          <div><img className="size-10 rounded-box" src="./role.png"/></div>
          <div className="list-col-grow">
            <div>Characters</div>
            <div className="text-xs font-semibold opacity-60">A character is just an entity like a warrior, wizard, etc, it has different abilities, those abilites came from Permit IO</div>
          </div>
        </li>
        
      </ul>
    </Layout>
  );
};

export default Dashboard;
