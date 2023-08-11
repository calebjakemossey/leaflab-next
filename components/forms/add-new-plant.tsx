"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { faker } from "@faker-js/faker";

export default function AddNewPlant() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [plantLocation, setPlantLocation] = useState("");
  const [plantImageUrl, setPlantImageUrl] = useState("");
  const [error, setError] = useState("");

  function generateFakeImageUrl() {
    setPlantImageUrl(
      faker.image.urlLoremFlickr({
        width: 128,
        height: 128,
        category: "nature",
      })
    );
  }

  function generateFakeName() {
    return faker.person.firstName();
  }

  async function addPlant({
    plantName,
    plantLocation,
    plantImageUrl,
  }: {
    plantName: String;
    plantLocation: String;
    plantImageUrl: String;
  }) {
    if (plantName !== "") {
      try {
        setLoading(true);

        let { data, error } = await supabase
          .from("plants")
          .insert({
            name: plantName,
            location: plantLocation,
            img_url: plantImageUrl || null,
          })
          .select();
        if (error) throw error;
        console.info("Plant added!", { data });
      } catch (error) {
        console.error("Error adding plant", error);
      } finally {
        setLoading(false);
        setPlantImageUrl("");
        setPlantName("");
        setPlantLocation("");
      }
    } else {
      setError("Please choose a name for your new plant!");
    }
  }

  return (
    <div className="form-widget">
      <div className="flex flex-col mb-4">
        <label htmlFor="plantName" className="text-md">
          Name
        </label>
        <div className="flex w-full gap-x-2">
          <input
            className="rounded-md px-4 py-2 bg-inherit border flex-1"
            required
            id="plantName"
            type="text"
            value={plantName || ""}
            onChange={(e) => setPlantName(e.target.value)}
            placeholder="Lucy"
          />
          <button
            className="border border-gray-700 rounded px-4 py-2 text-black"
            onClick={() => setPlantName(generateFakeName())}
            disabled={loading}
          >
            Random
          </button>
        </div>
        {error && <p className="mt-0 text-red-400">{error}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="plantLocation">Location</label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          required
          id="plantLocation"
          type="url"
          value={plantLocation || ""}
          placeholder="Living Room"
          onChange={(e) => setPlantLocation(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="plantImageUrl">Image URL</label>
        <div className="flex w-full gap-x-2">
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-4 flex-1"
            id="plantImageUrl"
            type="url"
            value={plantImageUrl || ""}
            onChange={(e) => setPlantImageUrl(e.target.value)}
          />
          <button
            className="border border-gray-700 rounded px-4 py-2 text-black mb-4"
            onClick={() => generateFakeImageUrl()}
            disabled={loading}
          >
            Random
          </button>
        </div>
      </div>

      {plantImageUrl !== "" && (
        <img
          src={plantImageUrl}
          className="h-36 w-36 object-cover rounded-full mx-auto mb-4"
          alt=""
        />
      )}

      <div>
        <button
          className="border border-gray-700 rounded px-4 py-2 text-black mb-2 w-full"
          onClick={() => addPlant({ plantName, plantLocation, plantImageUrl })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Add Plant"}
        </button>
      </div>
    </div>
  );
}
