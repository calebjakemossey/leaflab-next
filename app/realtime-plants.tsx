"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PlantCard from "@/components/PlantCard";

// async function getPlantData(plantName: string) {
//   await fetch(
//     `https://perenual.com/api/species-list?key=${process.env.NEXT_PUBLIC_PERENUAL_API_KEY}&q=${plantName}`,
//     {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((response) => response.json()) // Parse the response as JSON
//     .then((data) => console.log(data)) // Do something with the data
//     .catch((error) => console.error(error)); // Handle errors
// }

export default function RealtimePlants({ plants }: { plants: any }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel("realtime-plants")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "plants",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <div className="grid grid-cols-3 w-full justify-between gap-4 items-start justify-items-center w-5/6">
      {plants?.map((plant: any) => (
        <PlantCard
          key={plant.id}
          plantName={plant.name}
          plantLatinName={"Plantius Latinimus"}
          plantDescription="A description of the plant given by a plant database which describes the plant briefly."
          plantHealth={plant.health}
          plantLocation={plant.location}
          PlantImageUrl={plant.img_url}
        />
        // <span
        //   className="flex justify-center rounded bg-gray-100 p-4 gap-x-4"
        //   key={plant.id}
        // >
        //   <img
        //     src={plant.img_url}
        //     className="h-36 w-36 object-cover rounded-full"
        //     alt=""
        //   />
        //   <div className="flex flex-col h-full items-baseline w-64 justify-center">
        //     <p>
        //       <strong>Name: </strong>
        //       {plant.name}
        //     </p>
        //     <p>
        //       <strong>Location: </strong>
        //       {plant.location}
        //     </p>

        //     <p>
        //       <strong>Health: </strong>
        //       {plant.health}
        //     </p>
        //   </div>
        // </span>
      ))}
    </div>
  );
}
