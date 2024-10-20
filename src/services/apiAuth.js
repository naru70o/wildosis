import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.message);
    throw new Error("can'be loged in");
  }

  console.log(data);
  return { data, error };
}
