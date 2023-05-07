import { LoginForm } from "@components/login/LoginForm";
import { LoginCard } from "@components/login/LoginCard";

export const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-base-200">
      <LoginCard
        title="Witamy ponownie"
        description="Na stronie Parafi Gruszów Wielki !!"
      >
        <LoginForm />
      </LoginCard>
    </div>
  );
};
