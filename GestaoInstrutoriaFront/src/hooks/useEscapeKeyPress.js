import { useEffect } from 'react';

const useEscapeKeyPress = (callback, dependencies = []) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, dependencies);
};

export default useEscapeKeyPress;
