"use client";

import { UseCountries } from "@/app/hooks";
import Select from "react-select";

export type CountrySelect = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface Props {
  value?: CountrySelect;
  onChange: (v: CountrySelect) => void;
}

const CountrySelect: React.FC<Props> = ({ value, onChange }) => {
  const { getAll } = UseCountries();

  return (
    <div>
      <Select
        placeholder="Cualquier lugar"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelect)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
          >
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
