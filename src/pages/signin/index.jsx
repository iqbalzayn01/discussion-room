import FormSignIn from "./formSignIn";
import Logo from "../../components/Logo";

export default function SignIn() {
  return (
    <section className="">
      <div className="container-base w-full h-screen flex flex-col place-content-center gap-5 px-10 py-10">
        <Logo />
        <h3 className="text-2xl text-black dark:text-white text-center">
          Sign In
        </h3>
        <FormSignIn
        //   valueEmail={formData.email}
        //   valuePassword={formData.password}
        //   handleSubmit={handleSubmit}
        //   onChange={handleChange}
        //   isLoading={isLoading}
        />
      </div>
    </section>
  );
}
