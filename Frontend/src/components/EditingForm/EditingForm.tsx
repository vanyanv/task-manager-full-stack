// EditingForm.tsx
import React, { useRef, useEffect } from 'react';
import styles from './EditingForm.module.css';
import { useTodos } from '../../hooks/useTodos';

type EditingFormProps = {
  title: string;
  id: string;
  setEditing: (input: boolean) => void;
};

export default function EditingForm({
  title,
  id,
  setEditing,
}: EditingFormProps) {
  const { editTodo } = useTodos();
  const inputRef = useRef<HTMLInputElement>(null);

  //using ref to select the input field
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submitEdit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTodo = formData.get('edit') as string;
    if (newTodo.trim() === '') return;
    editTodo(newTodo.trim(), id);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setEditing(false);
    }
  }

  return (
    <div className={styles.editingWrapper}>
      <form onSubmit={submitEdit} className={styles.editingForm}>
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type='text'
            name='edit'
            defaultValue={title}
            className={styles.input}
            onKeyDown={handleKeyDown}
            placeholder='Update your todo...'
            aria-label='Edit todo'
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type='submit' className={styles.actionButton}>
            Save
          </button>
          <button
            type='button'
            className={`${styles.actionButton} ${styles.cancelButton}`}
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
