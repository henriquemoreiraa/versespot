"use client";

import { useOptionsContext } from "@/contexts/OptionsContext";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface SelectProps {
  width?: string;
  search?: boolean;
  defaultSelected?: {
    value: string;
    label: string;
    image?: StaticImageData;
  };
  options: {
    type: string;
    data: {
      value: string;
      label: string;
      image?: StaticImageData;
    }[];
  };
}

export default function Select({
  options,
  width,
  search,
  defaultSelected,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(options.data[0]?.label);
  const { selected, setSelected } = useOptionsContext();
  const { image, label } = selected[options.type] || defaultSelected || {};

  const searchFiltered = search
    ? options.data
        .filter((s) =>
          s.label.toLowerCase().includes(searchInput.toLowerCase())
        )
        .splice(0, 6)
    : options.data;

  return (
    <>
      {isOpen && (
        <div
          className="absolute w-full h-full top-0 left-0"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`relative ${width} ${!image && "text-lg"}`}
        title={
          options.type === "abbrev"
            ? `Only avaiable when searching for a random verse`
            : ""
        }
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`appearance-none border border-yellow-1 w-full px-1 pl-2  relative ${
            isOpen ? "rounded-t-md" : "rounded-md"
          } flex flex-row justify-between items-center bg-white ${
            !image && "py-3 px-4 pl-4"
          }`}
        >
          <div className="flex items-center gap-1 w-full">
            {image && <Image src={image} width={20} alt="usa" />}
            {search ? (
              <input
                className="outline-none w-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            ) : (
              <p>{label}</p>
            )}
          </div>
          <IoIosArrowDown
            size={20}
            color="#FFA800"
            className={` transition duration-200 ${
              !isOpen ? " rotate-180" : "rotate-0"
            }`}
          />
        </button>
        <ul
          className={`bg-white absolute ${
            !image ? "top-12" : "top-5"
          }  border-yellow-1 w-full mt-1 pt-1 rounded-b-md shadow-1 transition duration-150 
            ${isOpen ? "opacity-100 border-b border-l border-r" : "opacity-0"}
            `}
        >
          {isOpen &&
            searchFiltered.map(({ value, label, image }, idx) => (
              <li
                className={`border-t border-gray-100 flex items-center gap-1 pl-2 cursor-pointer ${
                  image && idx === 0 && "hidden"
                } ${selected[options.type]?.image && "pl-4 py-1"} ${
                  selected[options.type]?.value === value ? "bg-gray-100" : ""
                }`}
                key={value}
                value={value}
                onClick={() => {
                  setSelected({
                    ...selected,
                    [options.type]: { value, label, image },
                  });
                  setSearchInput(label);
                }}
              >
                {image ? (
                  idx > 0 && (
                    <>
                      <Image src={image} width={20} alt="usa" />
                      <p>{label}</p>
                    </>
                  )
                ) : (
                  <p>{label}</p>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
