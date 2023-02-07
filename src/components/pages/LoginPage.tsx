import { LoginForm } from "@components/Login/LoginForm";
import { LoginCard } from "@components/Login/LoginCard";

export const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-base-200">
      <LoginCard
        title="Witamy ponownie"
        text="Na stronie Parafi Gruszów Wielki !!"
      >
        <LoginForm />
      </LoginCard>
    </div>
  );
};
