// src/pages/CreateContract.tsx
import { useEffect, useState } from 'react';
import { useCreateResource } from '../hooks/useCreateResource';
import { Layout } from './Layout';
import { Player } from '../types/players';
import { Resource } from '../types/resources';

const CreateActions = () => {
  const [roleId, setRoleId] = useState<string>('');
  const [resource, setResource] = useState<string>('');
  const [actions, setActions] = useState<string[]>([]);
  const { create, loading } = useCreateResource('actions');

  const { get: getPlayers, loading: loadingPlayers, data: dataPlayers } = useCreateResource('players');
  const { get: getResources, loading: loadingResources, data: dataResources } = useCreateResource('resources');

  useEffect(() => {
    getResources()
    getPlayers();
  }, []);

  let playersData: Player[] = [];
  let resourcesData: Resource[] = [];

  if (dataPlayers) {
    playersData = dataPlayers?.filter((user: Player) => user.name !== "admin");
  }

  if (dataResources) {
    resourcesData = dataResources?.filter((resource: Resource) => resource.name !== "system" && resource.name !== "game");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const permissions = actions.map((action: string) => {
      return `${resource}:${action}`
    })
    create({ roleId, name, description: '', permissions });
  };

  return (
    <Layout>
      <div className="container">
        <h2>Assign new Action for a Character</h2>
        <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Characters</legend>
          <select defaultValue="Pick a browser" className="select" onChange={e => setRoleId(e.target.value)}>
            <option selected disabled={true}>Select the character</option>
            {playersData.map((player: Player) => (
              <option key={player.key} value={player.key}>
                {player.name}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Resources</legend>
          <select defaultValue="Pick a browser" className="select" onChange={e => setResource(e.target.value)}>
            <option selected disabled={true}>Select the resource</option>
            {resourcesData.map((reso: Resource) => (
              <option key={reso.key} value={reso.key}>
                {reso.name}
              </option>
            ))}
          </select>
          <span className="label">Select the resource that you want to add actions</span>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Actions</legend>
          <input
              type="text"
              value={actions}
              onChange={e => setActions(e.target.value.split(','))}
              required
              placeholder='Actions could be: use, invoke, destroy, etc'
              className='input'
            />
        </fieldset>
          <button type="submit" disabled={loading} className='btn btn-primary mt-4'>
            {loading ? 'Creating...' : 'Assign Actions'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateActions;
