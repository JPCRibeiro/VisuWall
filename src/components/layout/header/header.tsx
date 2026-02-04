import { createClient } from "@/lib/supabase/server";
import { UserNav } from "../userNav";
import HeaderShell from "./headerShell";

export default async function Header() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null;

  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.id)
      .single()
    
    profile = data;
  }

  return (
    <HeaderShell  userNavSlot={<UserNav user={user} profile={profile}/>}/>
  );
}