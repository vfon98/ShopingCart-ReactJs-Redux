import { useState } from "react";

const useInput = (initialState = '') => {
  const [value, setValue] = useState(initialState);
  const bindInput = {
    value,
    onChange: e => setValue(e.target.value)
  };

  return [value, bindInput];
};

export default useInput;
