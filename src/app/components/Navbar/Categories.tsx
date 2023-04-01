import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import CategorieBox from "./CategorieBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Playa",
    icon: TbBeach,
    description: "Esta propiedad esta cerca a la playa!",
  },
  {
    label: "Molinos de viento",
    icon: GiWindmill,
    description: "Esta propiedad es un molino de viento!",
  },
  {
    label: "Moderna",
    icon: MdOutlineVilla,
    description: "Esta propiedad es moderna!",
  },
  {
    label: "Escalar",
    icon: TbMountain,
    description: "Esta propiedad es un cabaña!",
  },
  {
    label: "Piscinas",
    icon: TbPool,
    description: "Esta propiedad tiene una hermosa piscina!",
  },
  {
    label: "Islas",
    icon: GiIsland,
    description: "Esta propiedad es una isla!",
  },
  {
    label: "Lagos",
    icon: GiBoatFishing,
    description: "Esta propiedad esta cerca al lago!",
  },
  {
    label: "Esquiar",
    icon: FaSkiing,
    description: "En esta propiedad se puede esquiar!",
  },
  {
    label: "Castillos",
    icon: GiCastle,
    description: "Esta propiedad es un castillo antiguo",
  },
  {
    label: "Cuevas",
    icon: GiCaveEntrance,
    description: "Esta propiedad tiene cuevas!",
  },
  {
    label: "Acampar",
    icon: GiForestCamp,
    description: "Esta propiedad se puede acampar!",
  },
  {
    label: "Fria",
    icon: BsSnow,
    description: "Esta Propiedad es fria!",
  },
  {
    label: "Desierto",
    icon: GiCactus,
    description: "Esta propiedad esta en el desierto!",
  },
  {
    label: "Granja",
    icon: GiBarn,
    description: "Esta propiedad es una granja!",
  },
  {
    label: "Lujosa",
    icon: IoDiamond,
    description: "Esta propiedad es lujosa!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-2 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategorieBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
