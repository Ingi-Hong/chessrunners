"use client";

import { useState } from "react";

type RadioGroupProps = {
  items: { label: string; value: string }[];
  handleClick: (s: string) => void;
};

export default function RadioGroup({ items, handleClick }: RadioGroupProps) {
  const [activeItem, setActiveItem] = useState<string>("both");

  return (
    <div className="font-base">
      {items.map((item) => {
        const isChecked = activeItem === item.value;

        return (
          <button
            onClick={() => {
              handleClick(item.value);
              setActiveItem(item.value);
            }}
            className="my-2 flex items-center"
            role="radio"
            aria-checked={isChecked}
            key={item.value}
          >
            <div className="mr-2.5 h-5 w-5 rounded-full bg-white p-1 outline outline-2 outline-black">
              {isChecked && (
                <div className="h-full w-full rounded-full bg-black"></div>
              )}
            </div>
            <p>{item.label}</p>
          </button>
        );
      })}
    </div>
  );
}
