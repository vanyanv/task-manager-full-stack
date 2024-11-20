import { useState } from 'react';
import extractNumberedItems from '../libs/extractNumberedItems';

export const useAISuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAISuggestions = async (task: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2',
          prompt: `Provide 3 practical suggestions for completing this task: "${task}"
              Format as a numbered list.`,
          stream: false,
        }),
      });

      if (!response.ok) throw new Error('Failed to get suggestions');

      const data = await response.json();
      setSuggestions(extractNumberedItems(data.response));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { suggestions, loading, error, getAISuggestions };
};
