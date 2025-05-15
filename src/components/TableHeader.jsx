import React from 'react';

const TableHeader = ({ name, status, round, turn }) => {
  return (
    <div className="p-4 bg-poker-black text-white rounded mb-4">
      <h2 className="text-2xl font-bold mb-2 text-white">{name}</h2>
      <div className="text-lg flex flex-col gap-4">
        <span>Statut : <b>{status}</b></span>
        <span>Round : <b>{round}</b></span>
        <span>Tour : <b>{turn}</b></span>
      </div>
    </div>
  );
};

export default TableHeader; 