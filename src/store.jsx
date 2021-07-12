import create from 'zustand';
import { devtools } from 'zustand/middleware'; // we can easy use Redux toolkit extension for work with Zustand
import { persist } from 'zustand/middleware'; // with this we can save our state in storage

let settingsStore = (set) => ({
  darkTheme: false,
  toggleDarkMode: () =>
    set((state) => ({
      darkTheme: !state.darkTheme,
    })),
});
settingsStore = devtools(settingsStore);
settingsStore = persist(settingsStore, { name: 'user_settings' }); // save to local storage

let peopleStore = (set) => ({
  people: ['John Doe', 'Jane Doe'],
  addPerson: (person) =>
    set((state) => ({ people: [...state.people, person] })),
});
peopleStore = devtools(peopleStore);
peopleStore = persist(peopleStore, { name: 'user_data' });

export const useSettingsStore = create(settingsStore);
export const usePeopleStore = create(peopleStore);
