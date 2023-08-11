"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AddNewSensor() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [sensorId, setSensorId] = useState("");
  const [error, setError] = useState("");

  async function addSensor({ sensorId }: { sensorId: String }) {
    if (sensorId !== "") {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from("sensors")
          .update({ user_id: user!.id })
          .eq("sensor_id", sensorId)
          .select();
        if (error) throw error;
        console.info("Sensor added!", { data });
      } catch (error) {
        console.error("Error adding sensor", error);
      } finally {
        setLoading(false);
        setSensorId("");
      }
    } else {
      setError("Invalid Sensor ID used");
    }
  }

  return (
    <div className="form-widget">
      <div className="flex flex-col mb-4">
        <label htmlFor="sensorId" className="text-md">
          Name
        </label>
        <div className="flex w-full gap-x-2">
          <input
            className="rounded-md px-4 py-2 bg-inherit border flex-1"
            required
            id="sensorId"
            type="text"
            value={sensorId || ""}
            maxLength={9}
            minLength={9}
            onChange={(e) => {
              setSensorId(e.target.value);
              setError("");
            }}
            placeholder="abcd1234"
          />
        </div>
        <p className="mt-0 text-red-400">{error}</p>
      </div>

      <div>
        <button
          className="border border-gray-700 rounded px-4 py-2 text-black mb-4 w-full"
          onClick={() => addSensor({ sensorId: sensorId })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Add Sensor"}
        </button>
      </div>
    </div>
  );
}
