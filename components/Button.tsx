"use client";

type ButtonType = {
  text: String;
  callback: Function;
};

export default function Button({ text, callback }: ButtonType) {
  return (
    <button
      onClick={callback()}
      className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      {text}
    </button>
  );
}
