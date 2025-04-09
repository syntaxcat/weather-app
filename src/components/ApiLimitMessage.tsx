import React from 'react';
import { useApiLimit } from '../context/ApiLimitContext';

const ApiLimitMessage: React.FC = () => {
  const { apiLimitReached } = useApiLimit();

  if (!apiLimitReached) return null; // Hide if limit is not reached

  return (
    <div style={{ background: 'orange', color: 'white', padding: '1rem', textAlign: 'center' }}>
      <strong>API limit reached. Please refresh later (Free plan ❤️).</strong>
    </div>
  );
};

export default ApiLimitMessage;