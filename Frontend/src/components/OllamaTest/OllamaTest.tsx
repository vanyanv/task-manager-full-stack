import React, { useState, useEffect } from 'react';
import styles from './OllamaTest.module.css';

const OllamaTest = () => {
  const [status, setStatus] = useState('checking');
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    checkOllamaStatus();
  }, []);

  const checkOllamaStatus = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        setStatus('ready');
        setError(null);
      }
    } catch (error) {
      console.log(error);
      setStatus('not-running');
      setError('Ollama is not running. Please check Windows system tray.');
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'ready':
        return styles.statusConnected;
      case 'not-running':
        return styles.statusDisconnected;
      default:
        return styles.statusChecking;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'ready':
        return 'Connected';
      case 'not-running':
        return 'Not Running';
      default:
        return 'Checking...';
    }
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => error && setShowError(true)}
      onMouseLeave={() => setShowError(false)}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>
          Ollama
          <span className={`${styles.statusIndicator} ${getStatusClass()}`}>
            {getStatusText()}
          </span>
        </h2>
        {showError && error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default OllamaTest;
