import { useState } from 'react';

const useToggle = (initial: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState(initial);
  const toggle = () => setState(s => !s);
  return [state, toggle];
};

export default useToggle;