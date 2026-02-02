"use server"

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username, 
      },
    },
  });

  if (error) {
    console.error(error); 
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signOut() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { error } = await supabase.auth.signOut();

    if (error) {
      redirect('/error');
    } else {
      revalidatePath('/', 'layout');
      redirect('/');
    }
  }
}