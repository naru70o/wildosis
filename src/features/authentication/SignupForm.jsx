import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSingup } from "./useSingup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { singup, isLoading } = useSingup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullname, email, password }) {
    singup(
      { fullname, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullname?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullname", {
            required: "This feild is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This feild is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This feild is required",
            minLength: {
              value: 8,
              message: "The password should be at least 8 characters", // Custom error message
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.repeatpassword?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("repeatpassword", {
            required: "This feild is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
