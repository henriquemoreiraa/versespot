"use client";

import Button from "@/components/Button";
import { useOptionsContext } from "@/contexts/OptionsContext";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { selected } = useOptionsContext();
  const router = useRouter();

  const search = (random?: boolean) => {
    const inputValue = inputRef.current !== null && inputRef.current.value;

    if (random) {
      router.push(
        `/verses/?verse=random&version=${selected.version.value}&abbrev=${selected.abbrev?.value}`
      );
      return;
    }
    if (!inputValue) {
      alert("Verse input cannot be empty!");
      return;
    }
    router.push(
      `/verses/?verse=${inputValue}&version=${selected.version.value}`
    );
  };

  return (
    <div className="max-w-1012 w-full flex flex-col gap-7">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          autoFocus
          placeholder="Type a verse"
          ref={inputRef}
          onKeyDown={(e) => e.key === "Enter" && search()}
          className="border border-yellow-1 rounded-lg p-4 outline-none text-lg w-full w-"
        />
        <Button
          onClick={() => search()}
          color="yellow"
          width="md:w-3/12 w-full"
        >
          SEARCH VERSE
        </Button>
      </div>
      <p className="font-manrope font-bold text-center before:w-1/4 before:h-1px before:bg-black-1 before:inline-block after:w-1/4 after:h-1px after:bg-black-1 after:inline-block flex items-center justify-center gap-3">
        OR
      </p>
      <Button onClick={() => search(true)} color="blue" width="w-full">
        SEARCH RANDOM VERSE
      </Button>
    </div>
  );
}
