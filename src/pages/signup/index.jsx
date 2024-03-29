import FormSignUp from "./formSignUp";
import Logo from "../../components/Logo";

export default function SignUp() {
  return (
    <section className="">
      <div className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
        <Logo />
        <h3 className="text-2xl text-black dark:text-white text-center">
          Sign Up
        </h3>
        {/* {passwordMatchError && (
          <p className="text-center text-red-400">
            Passwords do not match. Please try again.
          </p>
        )} */}
        <FormSignUp
        //   valueName={formData.name}
        //   valueEmail={formData.email}
        //   valuePassword={formData.password}
        //   valueConfirmPassword={formData.confirmPassword}
        //   handleSubmit={handleSubmit}
        //   onChange={handleChange}
        //   isLoading={isLoading}
        />
      </div>
    </section>
  );
}
