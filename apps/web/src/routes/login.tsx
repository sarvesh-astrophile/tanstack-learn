import { createFileRoute } from '@tanstack/react-router'
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { useState } from "react";

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <div>
      {
        showSignIn ? 
          <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} /> 
          : <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
      }
    </div>
  )
}
