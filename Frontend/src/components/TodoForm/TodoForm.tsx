import React, { useState } from 'react';
import styles from './TodoForm.module.css';
import { useTodos } from '../../hooks/useTodos';
import { todoCategories } from '../../constants/categories';
import OllamaTest from '../OllamaTest/OllamaTest';

export default function TodoForm() {
  const { addTodo } = useTodos();
  const [errors, setError] = useState<{ input: string; category: string }>({
    input: '',
    category: '',
  });

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setError({ input: '', category: '' });
    const formData = new FormData(event.currentTarget);
    const todo = formData.get('todo') as string;
    const category = formData.get('category') as string;

    if (!todo) {
      setError({ ...errors, input: 'Please enter a todo' });
      return;
    }
    if (!category) {
      setError({ ...errors, category: 'Please select a category' });
      return;
    }

    addTodo(todo, category);
    event.currentTarget.reset();
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <OllamaTest />
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor='todo' className={styles.label}>
            Enter A Todo
          </label>
          <input
            id='todo'
            type='text'
            name='todo'
            placeholder='What needs to be done?'
            className={styles.input}
          />
          {errors.input && (
            <p className={styles.errorMessage}>{errors.input}</p>
          )}
        </div>

        <div className={`${styles.inputGroup} ${styles.selectWrapper}`}>
          <label htmlFor='categories'>Categories:</label>
          <select id='categories' name='category' className={styles.select}>
            <option value=''>Select a Category</option>
            {todoCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className={styles.errorMessage}>{errors.category}</p>
          )}
        </div>

        <button type='submit' className={styles.button}>
          Add Todo
        </button>
      </form>
    </div>
  );
}
