// src/pages/CreateContract.tsx
import { useState } from 'react';
import { useCreateResource } from '../hooks/useCreateResource';
import { Layout } from './Layout';

const CreateCharacter = () => {
  const [key, setKey] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { create, loading } = useCreateResource('characters');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    create({ key, name, description });
  };

  return (
    <Layout>
      <div className="container">
        <h2>Create new Character</h2>
        <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Character ID (no spaces)</legend>
          <input
              type="text"
              value={key}
              onChange={e => setKey(e.target.value)}
              required
              className='input'
              placeholder='Character key'
            />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Character name (ex: Orc)</legend>
          <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder='Character name'
              className='input'
            />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              placeholder='Character Description'
              className='input'
            />
        </fieldset>
          <button type="submit" disabled={loading} className='btn btn-primary mt-4'>
            {loading ? 'Creating...' : 'Create Character'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCharacter;
