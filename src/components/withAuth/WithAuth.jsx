// components/withAuth/WithAuth.jsx

'use server';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

const WithAuth = (WrappedComponent) => {
  return async (context) => {
    const supabase = createServerComponentClient();
    const { data: { session } } = await supabase.auth.api.getSession();

    // If the user is not authenticated, redirect them to the login page
    if (!session) {
      redirect("/login", { from: context.res, replace: true });
      return { props: {} };
    }

    // If the user is authenticated, render the wrapped component
    return WrappedComponent(context);
  };
};

export default WithAuth;
