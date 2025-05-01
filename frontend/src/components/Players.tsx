// src/pages/CreateContract.tsx
import { useEffect } from 'react';
import { useCreateResource } from '../hooks/useCreateResource';
import { Player } from '../types/players';
import { Layout } from './Layout';
import { Resource, Role, Roles } from '../types/resources';

const Players = () => {
  const { get: getPlayers, loading: loadingPlayers, data: dataPlayers } = useCreateResource('players');
  const { get: getResources, loading: loadingResources, data: dataResources } = useCreateResource('resources');

  useEffect(() => {
    getResources()
    getPlayers();
  }, []);

  const handleResource = (playerId: string) => {
    console.log(playerId);
  }

  let playersData: Player[] = [];
  let resourcesData: Resource[] = [];

  if (dataPlayers) {
    console.log('LA DATA PLAYERS', dataPlayers);
    playersData = dataPlayers.data?.filter((user: Player) => user.attributes?.type === "player");
  }

  if (dataResources) {
    resourcesData = dataResources?.filter((resource: Resource) => resource.name !== "system" && resource.name !== "game");
    console.log('LA DATA RESOURCES', dataResources);
  }
  

  return (
    <Layout>
      <div className="container">
        <h2 className='text-4xl font-bold mb-8'>Resources</h2>
        {loadingResources && <div>Loading Resources...</div>} 
        {resourcesData?.map((resource: Resource) => (
        <div key={resource.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{resource.name}</h2>
          <p className="text-sm text-gray-500">{resource.urn}</p>
          {Object.keys(resource.roles).length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold">Players (Roles in Permit):</h3>
              <ul className="list-disc list-inside">
                {Object.values(resource.roles).map((role) => (
                  <li key={role.id}>
                    {role.name}: can {role.permissions.join(" and ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
        <h2 className='text-4xl font-bold my-8'>Players (Are Roles in Permit IO)</h2>
        {loadingPlayers && <div>Loading Players...</div>}    
      
          {playersData?.map((player: Player) => (
            <div key={player.key}>
              <>
              <h2 className='text-2xl uppercase'>{player.first_name}</h2>
              </>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Players;
