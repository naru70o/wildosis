import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  //   console.log(data);
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// new-CABIN
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  console.log(newCabin);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Reusibility purpose
  let query = supabase.from("cabins");

  // (a) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // if (error) {
  //   console.error(error);
  //   throw new Error("Cabins could not be created");
  // }

  // (B) Update

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single(); //this part was a bug that i got stucked for a day
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Edited");
  }

  //  2 upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin-image could not be uploaded");
  }

  // upload cabin
  return data;
}
/*
  https://qzvglimzmiiswnofcggi.supabase.co/storage/v1/object/public/
  cabin-images/cabin-001.jpg
  */

// 1 create new cabin
// const { data, error } = await supabase
//   .from("cabins")
//   .insert([{ ...newCabin, image: imagePath }])
//   .select()
//   .single();

// if (error) {
//   console.error(error);
//   throw new Error("Cabins could not be created");
// }

// console.log("image fille", newCabin.image);

// //  2 upload image
// const { error: storageError } = await supabase.storage
//   .from("cabin-images")
//   .upload(imageName, newCabin.image);

// if (storageError) {
//   await supabase.from("cabins").delete().eq("id", data.id);
//   console.error(storageError);
//   throw new Error("Cabin-image could not be uploaded");
// }

// // upload cabin
// return data;
