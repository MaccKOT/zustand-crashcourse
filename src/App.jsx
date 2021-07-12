import React, { useEffect } from 'react';
import { useSettingsStore } from './store';
import People from './components/People';
import Input from './components/Input';

function App() {
  const toggleDarkMode = useSettingsStore((state) => state.toggleDarkMode);
  const darkTheme = useSettingsStore((state) => state.darkTheme);

  useEffect(() => {
    if (darkTheme) {
      document.querySelector('body').classList.add('dark');
    } else {
      document.querySelector('body').classList.remove('dark');
    }
  }, [darkTheme]);

  return (
    <div>
      <header className='App-header'>
        <p>Hello Vite + React + Zustand!</p>
        <hr />
        <button type='button' onClick={toggleDarkMode}>
          Toggle Dark Theme
        </button>
        <Input />
        <People />
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'>
            Learn React
          </a>
          {' | '}
          <a
            className='App-link'
            href='https://vitejs.dev/guide/features.html'
            target='_blank'
            rel='noopener noreferrer'>
            Vite Docs
          </a>
          {' | '}
          <a
            className='App-link'
            href='https://github.com/pmndrs/zustand'
            target='_blank'
            rel='noopener noreferrer'>
            Zustand State Manager
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
