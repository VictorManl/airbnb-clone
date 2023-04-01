"use client";

import Image from "next/image";
import { SafeUser } from "../types";

interface Props {
  currentUser?: SafeUser | null;
}

const Avatar: React.FC<Props> = ({ currentUser }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={currentUser?.image ? currentUser.image : "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
