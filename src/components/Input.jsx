import React, { useRef } from 'react';
import { usePeopleStore } from '../store';

export default function Input() {
  const addPerson = usePeopleStore((state) => state.addPerson);
  const inputRef = useRef();

  const add = (e) => {
    e.preventDefault();
    addPerson(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <div>
      <form onSubmit={add}>
        <input type='text' ref={inputRef} />
        <button type='submit'>Add Person</button>
      </form>
    </div>
  );
}
