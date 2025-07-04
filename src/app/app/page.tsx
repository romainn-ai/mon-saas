'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Créer un SaaS avec l’IA</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Décris ton idée de SaaS ici..."
        style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Chargement...' : 'Générer' }
      </button>
      <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
        {result}
      </div>
    </main>
  );
}
