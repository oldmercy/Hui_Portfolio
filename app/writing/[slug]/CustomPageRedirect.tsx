"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/writing/gender-gap-math");
  }, [router]);

  return null;
}
