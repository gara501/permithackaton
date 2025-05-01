// src/pages/CreateContract.tsx
import { useState } from 'react';
import { useCreateResource } from '../hooks/useCreateResource';
import { Layout } from './Layout';

const CreateResource = () => {
  const [key, setKey] = useState('');
  const [name, setName] = useState(['']);
  const [usedBy, setUsedBy] = useState<string[]>([]);
  const { create, loading } = useCreateResource('resources');

  const handleSubmit = async (e: React.FormEvent) => {
    create({ key, name, usedBy });
  };

  return (
    <Layout>
      <div className="container">
        <h2>Create new Resource</h2>
        <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Resource Id (ex: Hability)</legend>
          <input
              type="text"
              value={key}
              onChange={e => setKey(e.target.value)}
              required
              className='input'
              placeholder='Resource key'
            />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Resource name (could be the same as the key)</legend>
          <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value.split(','))}
              required
              placeholder='Resource name'
              className='input'
            />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Used By (wizard, warrior, etc)</legend>
          <input
              type="text"
              value={usedBy}
              onChange={e => setUsedBy(e.target.value.split(','))}
              required
              placeholder='Resource actions'
              className='input'
            />
        </fieldset>
          <button type="submit" disabled={loading} className='btn btn-primary'>
            {loading ? 'Creating...' : 'Create Resource'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateResource;
