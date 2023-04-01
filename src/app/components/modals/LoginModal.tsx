"use client";

import { useState } from "react";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { UseRegisterModal, UseLoginModal } from "@/app/hooks";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = UseRegisterModal();
  const loginModal = UseLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((res) => {
      setIsLoading(false);

      if (res?.ok) {
        router.refresh();
        loginModal.onClose();
      }

      if (res?.error) {
        loginModal.onClose();
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bienvenido devuelta a Airbnb"
        subtitle="Inicia sesión con tu cuenta"
        center
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Contraseña"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <Button
        outline
        label="Continua con Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continua con Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-3">
          <div>Ya tienes una cuenta ?</div>
          <div
            onClick={loginModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Iniciar sesión
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Iniciar sesión"
      actionLabel="Iniciar sesión"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
