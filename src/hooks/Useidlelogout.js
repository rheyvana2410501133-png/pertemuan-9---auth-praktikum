import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useAuth } from '../contexts/Authcontext';

const TIMEOUT = 5 * 60 * 1000;

export function useIdleLogout() {
  const { user, logout } = useAuth();
  const timer = useRef(null);
  const appState = useRef(AppState.currentState);

  const resetTimer = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (user) logout();
    }, TIMEOUT);
  };

  useEffect(() => {
    if (!user) return;

    resetTimer();

    const sub = AppState.addEventListener('change', next => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        resetTimer();
      }
      appState.current = next;
    });

    return () => {
      clearTimeout(timer.current);
      sub.remove();
    };
  }, [user]);

  return { resetTimer };
}