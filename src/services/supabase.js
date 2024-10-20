import { createClient } from "@supabase/supabase-js";
// https://qzvglimzmiiswnofcggi.supabase.co
export const supabaseUrl = "https://qzvglimzmiiswnofcggi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6dmdsaW16bWlpc3dub2ZjZ2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMjE4OTQsImV4cCI6MjA0MzY5Nzg5NH0.s-o3-3AVQMZheXCAV4rmv6cJ7rYmgDSowAY3l5n3lJk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
