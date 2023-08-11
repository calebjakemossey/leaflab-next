import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { Database } from "@/supabase/supabase";
import RealtimePlants from "./realtime-plants";
import AddNewPlant from "@/components/forms/add-new-plant";
import AddNewSensor from "@/components/forms/add-new-sensor";
export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plants, error } = await supabase.from("plants").select();

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 gap-y-8 opacity-0 max-w-4xl px-3 py-12 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4">
          <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-8">
            Grow your plants with <strong>LeafLab</strong>
          </p>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <h2 className="text-lg font-bold text-center">Add a New Plant</h2>
        <AddNewPlant />

        <h2 className="text-lg font-bold text-center">Add a New Sensor</h2>
        <AddNewSensor />

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">Your plants</h2>
        </div>
      </div>
      <div className="flex justify-center text-center w-full">
        <RealtimePlants plants={plants} />
      </div>
    </div>
  );
}
