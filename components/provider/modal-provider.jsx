"use client";

import { useEffect, useState } from "react";
import { ConfirmEdit } from "../modals/confirm-edit";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <>
      <ConfirmEdit />
    </>
  );
};
