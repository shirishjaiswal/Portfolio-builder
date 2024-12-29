"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import verifyMail from "@/utils/api-connections/auth/verify-mail";
import { toast } from "sonner";
import { useLoadingContext } from "@/context/loading-context";
import Loading from "@/components/loading/loading";

const VerifyMail = () => {
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";

  const router = useRouter();
  const { isLoading, updateIsLoading } = useLoadingContext();

  // Prevent duplicate execution in Strict Mode
  const executedRef = useRef(false);

  useEffect(() => {
    // Skip if already executed (Strict Mode safeguard)
    if (executedRef.current) return;
    executedRef.current = true;

    const verifyEmail = async () => {
      updateIsLoading(true);
      if (email && token) {
        try {
          const response = await verifyMail(email, token);

          if (response === undefined) throw new Error("Something went wrong");
          if (response?.error) throw new Error(response.error);

          toast.success(response.data);
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? "Link is no longer valid"
              : "An unexpected error occurred";
          toast.error(errorMessage);
        } finally {
          updateIsLoading(false);
        }
      }
    };

    verifyEmail();
    router.push("/login");
  }, []);

  return isLoading ? (
    <Loading spinColor="primary" spinSize="lg" label="" labelColor="primary" />
  ) : (
    <></>
  );
};

export default VerifyMail;
