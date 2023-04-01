"use client";

import { useState } from "react";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import { AiOutlineMenu, AiOutlineUserAdd } from "react-icons/ai";
import {
  BiBuildingHouse,
  BiTrip,
  BiLogOutCircle,
  BiLogInCircle,
} from "react-icons/bi";
import { BsHouseAdd } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { UseLoginModal, UseRegisterModal } from "@/app/hooks";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface Props {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<Props> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = UseRegisterModal();
  const loginModal = UseLoginModal();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
          Pon tu espacio en Airbnb
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition-colors"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar currentUser={currentUser} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {}}
                  label="Mis propiedades"
                  icon={BiBuildingHouse}
                />
                <MenuItem onClick={() => {}} label="Mis viajes" icon={BiTrip} />
                <MenuItem
                  onClick={() => {}}
                  label="Mis favoritos"
                  icon={MdOutlineFavoriteBorder}
                />
                <MenuItem
                  onClick={() => {}}
                  label="Mis reservaciones"
                  icon={IoTicketOutline}
                />
                <MenuItem
                  onClick={() => {}}
                  label="Mi espacio en Airbnb"
                  icon={BsHouseAdd}
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label="Cerrar sesión"
                  icon={BiLogOutCircle}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={registerModal.onOpen}
                  label="Regístrate"
                  icon={AiOutlineUserAdd}
                />
                <MenuItem
                  onClick={loginModal.onOpen}
                  label="Inicia sesión"
                  icon={BiLogInCircle}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
