import { useState } from 'react';
import styles from './AiSuggestions.module.css';
import { useAISuggestions } from '../../hooks/useGetAiSuggestions';

interface AISuggestionsProps {
  todoTitle: string;
}

export default function AISuggestions({ todoTitle }: AISuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, loading, getAISuggestions } = useAISuggestions();

  const handleToggleSuggestions = () => {
    if (!suggestions?.length && !loading) {
      getAISuggestions(todoTitle);
    }
    setShowSuggestions((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.suggestionToggle} ${
          showSuggestions ? styles.expanded : ''
        } 
          ${suggestions?.length > 0 ? styles.hasNewSuggestions : ''}`}
        onClick={handleToggleSuggestions}
        aria-label={showSuggestions ? 'Hide suggestions' : 'Show suggestions'}
      >
        <span className={styles.expandIcon} />
      </button>

      {showSuggestions && (
        <div className={styles.suggestionsWrapper}>
          {loading ? (
            <div className={styles.loadingWrapper}>
              <span className={styles.loadingDots}>Getting AI suggestions</span>
            </div>
          ) : suggestions?.length > 0 ? (
            <div className={styles.suggestionsList}>
              {suggestions.map((text: string, index: number) => (
                <div
                  key={index}
                  className={styles.suggestion}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
