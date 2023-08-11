import Image from "next/image";

export default function PlantCard({
  plantName,
  plantLatinName,
  plantDescription,
  plantHealth,
  plantLocation,
  PlantImageUrl,
}: {
  plantName: string;
  plantLatinName: string;
  plantDescription: string;
  plantHealth: string;
  plantLocation: string;
  PlantImageUrl: string;
}) {
  return (
    <div className="border-gray-100 border rounded shadow-md bg-white flex flex-col gap-y-4 p-8 items-center w-96">
      <img
        src={PlantImageUrl}
        alt={"An image of " + plantLatinName}
        className="h-80 w-full object-cover rounded"
      />
      <div className="flex flex-col w-full items-start gap-y-4 text-left">
        <div className="flex flex-col">
          <p className="text-xl">
            <strong>{plantName}</strong>
          </p>
          <p className="text-gray-500">{plantLatinName}</p>
        </div>
        <p className="text-gray-700 text-left">{plantDescription}</p>
      </div>

      <div className="w-full flex justify-between">
        {plantHealth == "ok" && (
          <p className="text-green-600">Your plant has no issues!</p>
        )}
      </div>
    </div>
  );
}
