import { supabase } from "../utils/supabase";

export type User = {
  id: string;
  name: string;
};

export const getLoggedinUsersName = async (user_id: string) => {
  const { data } = await supabase
    .from<User>("users")
    .select("name")
    .eq("id", user_id);
  if (data && data.length === 1) {
    return data[0].name;
  }
  return "";
};
