import React, { useState } from 'react';

const LABELS = {
  fold: 'Se coucher',
  check: 'Check',
  call: 'Suivre',
  raise: 'Relancer',
};

const PlayerAction = ({ actions, onAction, loading }) => {
  const [amount, setAmount] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const handleClick = async (action) => {
    setActionLoading(action);
    await onAction(action, action === 'raise' ? Number(amount) : undefined);
    setActionLoading(null);
    if (action === 'raise') setAmount('');
  };

  if (!actions || actions.length === 0) return null;

  return (
    <div className="bg-black text-white rounded shadow p-4 flex flex-col items-center my-4 w-full max-w-md mx-auto">
      <div className="mb-2 font-bold text-lg">Actions disponibles</div>
      <div className="flex flex-wrap gap-3 justify-center">
        {actions.map((action) => (
          action === 'raise' ? (
            <form key={action} className="flex gap-2 items-center" onSubmit={e => { e.preventDefault(); handleClick('raise'); }}>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="bg-gray-900 text-white border border-gray-700 rounded px-2 py-1 w-20 text-sm"
                placeholder="Montant"
                disabled={loading || actionLoading === 'raise'}
                required
              />
              <button
                type="submit"
                className="bg-poker-gold text-black font-bold px-3 py-1 rounded disabled:opacity-50"
                disabled={loading || actionLoading === 'raise' || !amount}
              >
                {LABELS[action] || action}
              </button>
            </form>
          ) : (
            <button
              key={action}
              className="bg-poker-gold text-black font-bold px-3 py-1 rounded disabled:opacity-50"
              onClick={() => handleClick(action)}
              disabled={loading || actionLoading === action}
            >
              {LABELS[action] || action}
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default PlayerAction; 