import React, {
    ChangeEvent, Dispatch,
    SetStateAction,
} from "react";

interface Props {
  inputValue: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const ModalBoxRemoveLabel = ({ inputValue, setValue }: Props) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return (
    <label className="p-2 text-xl">
      <input
        type="text"
        placeholder="Type here"
        className="input"
        value={inputValue}
        onChange={(e) => handleInput(e)}
      />
    </label>
  );
};
