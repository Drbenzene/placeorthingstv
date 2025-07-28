import Inputfield from "./Inputfield";
import * as yup from "yup";
import { Formik } from "formik";
import { addContestant } from "../actions/states";

interface ContestantDto {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
}

function BeAContestant() {
  const handleContestantSubmit = async (
    values: ContestantDto,
    resetForm: () => void
  ) => {
    try {
      console.log("Contestant data submitted:", values);
      const res = await addContestant(values);
      if (res) {
        console.log("Contestant added successfully:", res);
        alert("Contestant application submitted successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting contestant application:", error);
      alert("Failed to submit contestant application. Please try again.");
    }
  };
  return (
    <section
      id="be-a-contestant"
      className="w-full md:h-[80vh] h-auto bg-cover px-4"
      style={{
        backgroundImage: `url(/images/bg-45.png)`,
      }}
    >
      <div>
        <p
          className="absolute  left-1/3 text-center z-10 bg-amber-600 px-2 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-2 transition duration-300 text-xs sm:text-base lg:text-xl text-black text-emphasis-700 font-extrabold border-amber-400 border-2 hover:bg-amber-500 whitespace-nowrap flex-shrink-0"
          style={{
            clipPath:
              "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
          }}
        >
          BE A CONTESTANT
        </p>
      </div>
      <div className="max-w-4xl relative pt-16 flex flex-col md:flex-row w-full justify-between items-start mx-auto text-center bg-[#151A5C] bg-opacity-80 p-6 shadow-lg ">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            state: "",
          }}
          validationSchema={yup.object().shape({
            firstName: yup
              .string()
              .min(3, "First name must be at least 3 characters")
              .max(100, "First name cannot exceed 100 characters")
              .required("First name is required"),
            lastName: yup
              .string()
              .min(3, "Last name must be at least 3 characters")
              .max(100, "Last name cannot exceed 100 characters")
              .required("Last name is required"),
            email: yup
              .string()
              .email("Invalid email")
              .required("Email is required"),
            state: yup.string().required("State is required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log("Form submitted with values:", values);
            await handleContestantSubmit(values, resetForm);
            setSubmitting(false);
          }}
        >
          {({
            setErrors,
            errors,
            values,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="flex flex-col space-y-4 w-full max-w-md">
              <p className="text-white text-sx  text-start">
                Weekend Kpaje wants to give you the opportunity to be a
                contestant. Fill out your details for a chance to be selected
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-full max-w-md"
              >
                <Inputfield
                  label="First Name"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  OnFocus={() => setErrors({})}
                  error={errors.firstName}
                />
                <Inputfield
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  OnFocus={() => setErrors({})}
                  error={errors.lastName}
                />
                <Inputfield
                  label="Email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  OnFocus={() => setErrors({})}
                  error={errors.email}
                />
                <Inputfield
                  label="State/City"
                  placeholder="Enter your state"
                  value={values.state}
                  onChange={handleChange("state")}
                  onBlur={handleBlur("state")}
                  OnFocus={() => setErrors({})}
                  error={errors.state}
                />

                <button
                  disabled={!isValid}
                  type="submit"
                  className=" cursor-pointer inline-block bg-amber-600 px-2 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-2 transition duration-300 text-xs sm:text-base lg:text-xl text-black text-emphasis-700 font-extrabold border-amber-400 border-2 hover:bg-amber-500 whitespace-nowrap mb-8"
                  style={{
                    clipPath:
                      "polygon(4px 0%, 100% 0%, calc(80% - 4px) 800%, 0% 80%)",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Apply Now
                </button>
              </form>
            </div>
          )}
        </Formik>
        <div className=" right-0 absolute hidden  md:flex items-start justify-center">
          <img
            src="/images/host.png"
            alt="Contestant Host"
            className="h-full  w-auto object-top object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default BeAContestant;
