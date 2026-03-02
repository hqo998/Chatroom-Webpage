import { RegisterForm } from "@/ui/registerForm";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense >
      <RegisterForm />
    </Suspense>
    
  );
}