"use client";

import { categories } from "../Navbar/Categories";
import { useMemo, useState } from "react";
import { UseRentModal } from "@/app/hooks";
import Heading from "../Heading";
import Modal from "./Modal";
import { CategoryInput, Counter, CountrySelect, ImageUpload } from "../inputs";

import { FieldValues, useForm } from "react-hook-form";
import dynamic from "next/dynamic";

enum Steps {
  Category = 0,
  Location = 1,
  Info = 2,
  Images = 3,
  Description = 4,
  Price = 5,
}

const RentModal = () => {
  const rentModal = UseRentModal();

  const [step, setSteps] = useState(Steps.Category);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      invitados: 1,
      habitaciones: 1,
      baños: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("invitados");
  const habitaciones = watch("habitaciones");
  const baños = watch("baños");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setSteps((v) => v - 1);
  };

  const onNext = () => {
    setSteps((v) => v + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === Steps.Price) return "Crear";
    return "Siguiente";
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step === Steps.Category) return undefined;
    return "Atras";
  }, [step]);

  let bodyContet = (
    <div className="flex flex-col gap-4">
      <Heading
        title="¿Cuales de estas describe mejor tu espacio?"
        subtitle="Selecciona una categoria"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto categorias px-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === Steps.Location) {
    bodyContet = (
      <div className="flex flex-col gap-8">
        <Heading
          title="¿Donde esta ubicado tu espacio?"
          subtitle="Ayuda a las personas a conocerte"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === Steps.Info) {
    bodyContet = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Comparte algunas cosas basicas de tu espacio"
          subtitle="Que comodidades tienes ?"
        />
        <Counter
          title="Invitados"
          subtitle="Cuantas personas pueden estar ?"
          value={guestCount}
          onChange={(values) => setCustomValue("invitados", values)}
        />
        <hr />
        <Counter
          title="Habitaciones"
          subtitle="Cuantas habitaciones tiene ?"
          value={habitaciones}
          onChange={(values) => setCustomValue("habitaciones", values)}
        />
        <hr />
        <Counter
          title="Baños"
          subtitle="Cuantas baños tiene ?"
          value={baños}
          onChange={(values) => setCustomValue("baños", values)}
        />
      </div>
    );
  }

  if (step === Steps.Images) {
    bodyContet = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Agrega una foto de tu espacio"
          subtitle="Muestra el lugar para tus invitados"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(v) => setCustomValue("imageSrc", v)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Mi espacio en Airbnb!"
      isOpen={rentModal.isOpen}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryLabel={secondaryAction}
      secondaryAction={step === Steps.Category ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContet}
    />
  );
};

export default RentModal;
