import { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import styles from './Todo.module.css';
import EditingForm from '../EditingForm/EditingForm';
import CategoryBadge from '../CategoryBadge/CategoryBadge';
import AISuggestions from '../AiSuggestions/AiSuggestions';
import AISuggestionsInfo from '../AISuggestionInfo/AiSuggestionInfo';
import { Check, Edit2, Trash2 } from 'lucide-react';

type TodoPropTypes = {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  createdAt: number;
};

export default function TodoComponent({
  id,
  title,
  category,
  completed,
  createdAt,
}: TodoPropTypes) {
  const [editing, setEditing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { completeTodo, deleteTodo } = useTodos();

  const formatDateTime = (date: number): string => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return formatter.format(date);
  };

  return (
    <div className={styles.container}>
      <li
        className={`${styles.todo} ${completed ? styles.completed : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {editing ? (
          <EditingForm id={id} title={title} setEditing={setEditing} />
        ) : (
          <div className={styles.todoWrapper}>
            <div className={styles.mainContent}>
              <div className={styles.checkboxWrapper}>
                <input
                  type='checkbox'
                  checked={completed}
                  onChange={() => completeTodo(id)}
                  className={styles.checkbox}
                  id={`todo-${id}`}
                  aria-label={`Mark ${title} as ${
                    completed ? 'incomplete' : 'complete'
                  }`}
                />
                <div className={styles.checkmarkWrapper}>
                  <div className={styles.checkmark}>
                    <Check className={styles.checkIcon} size={14} />
                  </div>
                </div>
              </div>

              <div className={styles.todoInfo}>
                <span className={styles.title}>{title}</span>
                <div className={styles.metaInfo}>
                  <CategoryBadge category={category} />
                  <time
                    className={styles.createdAt}
                    dateTime={new Date(createdAt).toISOString()}
                  >
                    {formatDateTime(createdAt)}
                  </time>
                </div>
              </div>
            </div>

            <div
              className={`${styles.actions} ${isHovered ? styles.visible : ''}`}
            >
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => setEditing(true)}
                aria-label='Edit todo'
              >
                <Edit2 size={14} className={styles.buttonIcon} />
                <span>Edit</span>
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => deleteTodo(id)}
                aria-label='Delete todo'
              >
                <Trash2 size={14} className={styles.buttonIcon} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
        <div className={styles.suggestionIndicator} />
      </li>
      <div className={styles.suggestionsContainer}>
        <AISuggestionsInfo />
        <AISuggestions todoTitle={title} />
      </div>
    </div>
  );
}
