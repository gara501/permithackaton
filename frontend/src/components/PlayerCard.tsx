import React from 'react';
import { Ability } from '../types/players';

type CardProps = {
  title: string;
  description: string;
  image: string;
  abilities: Ability[];
};

const PlayerCard: React.FC<CardProps> = ({ title, description, image, abilities }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md mx-auto mt-8">
      <img src={image} alt='player' />
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <h3 className='text-3xl font-[rpgfont] text-shadow-xl my-4'>Items</h3>
      <ul>
        {abilities?.map((item) => (
          <>
            <p><span>Can: </span>
              {item.actions?.map((action, index) => (
                <span key={action}>{action} {index === item?.actions?.length - 1 ? '' : ','} </span>
              ))}  {item.item}
            </p>
          </>
        ))}
      </ul>
    </div>
  );
};

export default PlayerCard;