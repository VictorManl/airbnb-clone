import { useMemo } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

import { SafeUser } from "../types";
import useLoginModal from "./UseLoginModal";

interface Props {
  listingId: string;
  currentUser: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
