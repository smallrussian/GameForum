// components/GameSubMenu.tsx
import React from 'react';

type Game = {
  id: string;
  name: string;
  items: { title: string; link: string }[];
};

type GameSubMenuProps = {
  game: Game;
};

const GameSubMenu: React.FC<GameSubMenuProps> = ({ game }) => {
  return (
    <div className="bg-slate-700 shadow rounded p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">{game.name}</h2>
      <ul>
        {game.items.map((item) => (
          <li key={item.link} className="mb-2">
            <a href={item.link} className="text-blue-600">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameSubMenu;
