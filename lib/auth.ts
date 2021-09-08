import { supabase } from "../utils/supabase";

export const signIn = async () => {
  await supabase.auth.signIn({
    provider: "google",
  });
};
