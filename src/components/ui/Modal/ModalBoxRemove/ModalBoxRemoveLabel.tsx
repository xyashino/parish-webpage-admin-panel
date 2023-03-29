import React, {
    ChangeEvent, Dispatch,
    SetStateAction,
} from "react";

interface Props {
  inputValue: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const ModalBoxRemoveLabel = ({ inputValue, setValue }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value.trim());
  };
  return (
    <label className="p-2 text-xl">
      <input
        type="text"
        placeholder="Type here"
        className="input"
        value={inputValue}
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};
