import { useState, useEffect } from 'react';

export function useLocalStorage(key) {
  const [state, setstate] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? []
  );

  // add localStorage contacts
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setstate];
}
export default useLocalStorage;
