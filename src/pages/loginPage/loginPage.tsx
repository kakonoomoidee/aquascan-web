// src/pages/loginPage/loginPage.tsx
import LoginClient from "@src/pages/loginPage/loginClient";

// Metadata halaman
export const loginPageMetadata = {
  title: "Login - AquaScan Admin",
  description: "Halaman login untuk masuk ke dashboard AquaScan Admin",
  route: "/login",
};

// Halaman utama
const LoginPage = () => {
  return <LoginClient />;
};

export default LoginPage;
