"use client";

import { IconType } from "react-icons";

interface Props {
  onClick: () => void;
  label: string;
  icon: IconType;
}

const MenuItem: React.FC<Props> = ({ onClick, label, icon: Icon }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 font-semibold flex items-center gap-2"
    >
      <Icon size={20} />
      {label}
    </div>
  );
};

export default MenuItem;
