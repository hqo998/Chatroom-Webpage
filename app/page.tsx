import { LoginForm } from "@/ui/loginForm";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
    
  );
}