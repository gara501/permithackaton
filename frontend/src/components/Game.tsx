import React, { useEffect } from 'react';
import { Resource } from '../types/resources';
import { Abilities, Ability } from '../types/players';
import { useCreateResource } from '../hooks/useCreateResource';
import wizard from '../assets/game/wizard.jpg';
import elf from '../assets/game/elf.jpg';
import dwarf from '../assets/game/dwarf.jpg';
import warrior from '../assets/game/warrior.jpg';
import PlayerCard from './PlayerCard';

const Game: React.FC = () => {
  const { get: getResources, loading: loadingResources, data: dataResources } = useCreateResource('resources');
  let resourcesData: Resource[] = [];

  useEffect(() => {
    getResources()
  }, []);

  const abilitiesByPlayer = (playerName: string) => {
    const abilities: Ability[] = [];

    {resourcesData?.map((resource: Resource) => {
      const filteredByRole = Object.values(resource.roles).filter(role => role.name === playerName)[0];
      if (filteredByRole?.permissions.length > 0) {
        const ability: Ability = {
          item: resource.name,
          actions: filteredByRole?.permissions
        }
        abilities.push(ability);
      }

    })}
    return abilities;
  }

  if (dataResources) {
    resourcesData = dataResources?.filter((resource: Resource) => resource.name !== "system" && resource.name !== "game");
    const abilityByPlayer = abilitiesByPlayer('wizard');
    console.log('ABILITY', abilityByPlayer)
  }

  return (
    <div className='container mx-auto w-full'>
      <h2 className='text-5xl font-[rpgfont] my-4 text-shadow-xl'>RPG Permit Game</h2>
      <h3 className='text-3xl font-[rpgfont] text-shadow-xl'>Select player</h3>
      <div className='flex gap-2'>

        <div className='flex-1/4'>
          <PlayerCard title="Wizard" description="A great wizard can use magic to fight." image={wizard} abilities={abilitiesByPlayer('wizard')} />
        </div>
        <div className='flex-1/4'>
          <PlayerCard title="Elf" description="A strong and skilled Elf, can use weapons and magic." image={elf} abilities={abilitiesByPlayer('elf')} />
        </div>
        <div className='flex-1/4'>
          <PlayerCard title="Dwarf" description="A strong dwarf, he can create weapons and use armors." image={dwarf} abilities={abilitiesByPlayer('dwarf')} />
        </div>
        <div className='flex-1/4'>
          <PlayerCard title="Warrior" description="A brave warrior, can use armor and weapons." image={warrior} abilities={abilitiesByPlayer('warrior')} />
        </div>
      </div>
    </div>
  );
};

export default Game;