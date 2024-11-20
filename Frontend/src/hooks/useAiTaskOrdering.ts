import { useState } from 'react';
import { Todo } from '../types/todos.types';

interface PrioritizedTodo extends Todo {
  priority: number;
  estimatedHours: number;
  reasoning: string;
}

interface LlamaResponse {
  response: string;
}

interface ReorderedResponse {
  reordered_todos: PrioritizedTodo[];
}

export const useAITaskOrdering = () => {
  const [orderedTasks, setOrderedTasks] = useState<PrioritizedTodo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAIOrderedTasks = async (todos: Todo[]) => {
    if (!todos.length) {
      setError('No todos provided');
      return;
    }

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
          prompt: `Given this array of todos:
${JSON.stringify(todos, null, 2)}

Analyze each task and reorder them based on priority. Consider:
- Task urgency and importance
- Task complexity
- Dependencies between tasks
- Time sensitivity

For each task provide:
1. Priority level (1-5, where 1 is highest priority)
2. Estimated hours to complete (realistic number)
3. Brief reasoning for the priority level

Return ONLY a valid JSON object in this exact format, with no additional text or markdown:
{
  "reordered_todos": [
    {
      "id": "original-id",
      "title": "task title",
      "completed": boolean,
      "category": "original-category",
      "createdAt": number,
      "updatedAt": number or null,
      "priority": number,
      "estimatedHours": number,
      "reasoning": "brief explanation"
    }
  ]
}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI suggestions');
      }

      const data = (await response.json()) as LlamaResponse;

      // Extract the JSON object from the response
      const jsonMatch = data.response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }

      // Parse the JSON response
      const parsedResponse = JSON.parse(jsonMatch[0]) as ReorderedResponse;

      // Validate and process the todos
      const validatedTodos = parsedResponse.reordered_todos.map((todo) => ({
        ...todo,
        priority: Number(todo.priority),
        estimatedHours: Number(todo.estimatedHours),
        createdAt: Number(todo.createdAt),
        updatedAt: todo.updatedAt ? Number(todo.updatedAt) : null,
      }));

      // Sort by priority
      const sortedTodos = validatedTodos.sort(
        (a, b) => a.priority - b.priority
      );

      setOrderedTasks(sortedTodos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while ordering tasks'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    orderedTasks,
    loading,
    error,
    getAIOrderedTasks,
  };
};
