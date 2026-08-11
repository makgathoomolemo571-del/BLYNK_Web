import { useCallback } from "react";

export default function useToast() {

  const success = useCallback((message) => {
    console.log("✅", message);
  }, []);

  const error = useCallback((message) => {
    console.error("❌", message);
  }, []);

  const warning = useCallback((message) => {
    console.warn("⚠️", message);
  }, []);

  const info = useCallback((message) => {
    console.info("ℹ️", message);
  }, []);

  return {
    success,
    error,
    warning,
    info
  };

}