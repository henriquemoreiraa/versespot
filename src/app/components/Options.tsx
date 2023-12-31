import Select from "@/components/Select";
import { enBooksOptions, enVersionsOptions } from "../constants";

export default function Options() {
  return (
    <div className="flex md:flex-row flex-col w-full gap-8">
      <Select options={enVersionsOptions} width="w-full" />
      <Select options={enBooksOptions} width="w-full" search />
    </div>
  );
}
