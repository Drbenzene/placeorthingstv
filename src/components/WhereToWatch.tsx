import { use, useState } from "react";
import { getStates, getStations } from "../actions/states";

interface StateDto {
  id: number;
  name: string;
  code: string;
  state: string;
}

interface StationDto {
  id: number;
  name: string;
  state: string;
  city: string;
  tvStation: string;
  time: string;
}

const statesPromise = getStates();
const stationsPromise = getStations();

function WhereToWatch() {
  const statesResponse = use(statesPromise);
  const states = statesResponse?.data || [];

  const stationsResponse = use(stationsPromise);
  const stations = stationsResponse?.data || [];

  const [selectedState, setSelectedState] = useState("");

  console.log("Available stations:", stations);

  return (
    <div className="max-w-4xl mx-auto text-center">
      <p
        className="inline-block mt-5 bg-[#FFAA00] text-white px-2 py-2 sm:px-4 sm:py-2 lg:px-8 lg:py-2 transition duration-300 text-xs sm:text-base lg:text-xl text-emphasis-700 font-extrabold border-amber-400 border-2 hover:bg-amber-500 whitespace-nowrap mb-8"
        style={{
          clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
        }}
      >
        WHERE TO WATCH
      </p>

      <div className="flex min-h-[70vh] flex-col lg:flex-row justify-center items-start lg:items-center gap-8 lg:gap-0">
        <div className="flex-1 text-white text-center">
          <img
            src="/images/map.png"
            alt="Where to Watch"
            className="w-full max-w-md lg:max-w-2xl mx-auto"
          />
        </div>

        <div className="hidden lg:flex flex-col items-center mx-8">
          <div className="h-40 w-0.5 bg-white"></div>
          <div className="bg-[#FFAA00] p-2 rounded-full my-2">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H3V5h18v10z" />
              <circle cx="12" cy="10" r="2" />
            </svg>
          </div>
          <div className="h-40 w-0.5 bg-white"></div>
        </div>

        <div className="flex-1 text-white w-full lg:w-auto">
          <h3 className="text-lg lg:text-xl font-bold text-white text-center lg:text-start mb-4">
            Choose Your State
          </h3>
          <select
            value={selectedState || "Lagos"}
            onChange={(e) => setSelectedState(e.target.value)}
            defaultValue={"Lagos"}
            className="w-full max-w-sm mx-auto lg:mx-0 p-3 text-white placeholder:text-gray-400 placeholder:text-sm border-2 border-[rgb(72,80,86)] rounded focus:outline-none focus:ring-2 "
          >
            <option value="">Select your state...</option>
            {states &&
              states?.map((state: StateDto) => (
                <option
                  key={state.id}
                  value={state.state}
                  className="bg-white text-white"
                >
                  {state.state}
                </option>
              ))}
          </select>

          {!selectedState && (
            <div className="mt-4 p-4 bg-opacity-90 rounded-lg w-full max-w-sm lg:max-w-none mx-auto lg:mx-0">
              <h4 className="text-white text-center lg:text-start text-xl lg:text-2xl font-bold mb-4">
                Lagos
              </h4>
              <div className="space-y-4">
                {stations
                  ?.filter(
                    (station: StationDto) =>
                      station?.state?.toLowerCase() === "lagos"
                  )
                  ?.map(
                    (
                      station: StationDto,
                      index: number,
                      filteredStations: StationDto[]
                    ) => (
                      <div key={`${station.id}-${index}`}>
                        <div className="flex justify-between  font-semibold text-xs lg:text-sm uppercase border-b border-gray-600 pb-2">
                          <span className="flex-1 text-start text-[#450000]">
                            CITY
                          </span>
                          <span className="flex-1 text-start text-[#450000]">
                            STATION/TIME
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start py-3 text-white gap-2 sm:gap-0">
                          <div className="flex-1 pr-0 sm:pr-4 w-full sm:w-auto">
                            <h5 className="font-semibold text-[rgb(251,233,1)]  text-start text-xs uppercase break-words">
                              {station.city}
                            </h5>
                          </div>
                          <div className="flex-1 w-full sm:w-auto">
                            <p className="font-medium text-start text-xs lg:text-sm">
                              {station.tvStation}
                            </p>
                            <p className="text-xs lg:text-sm text-start text-gray-300">
                              {station.time}
                            </p>
                          </div>
                        </div>
                        {index < filteredStations.length - 1 && (
                          <div className="border-b border-gray-700"></div>
                        )}
                      </div>
                    )
                  )}
              </div>
            </div>
          )}

          {selectedState && (
            <div className="mt-4 p-4  bg-opacity-90 rounded-lg w-full max-w-sm lg:max-w-none mx-auto lg:mx-0">
              <h4 className="text-white text-center lg:text-start text-xl lg:text-2xl font-bold mb-4">
                {selectedState}
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between  font-semibold text-xs lg:text-sm uppercase border-b border-gray-600 pb-2">
                  <span className="flex-1 text-start text-white">CITY</span>
                  <span className="flex-1 text-start text-white">
                    STATION/TIME
                  </span>
                </div>
                {/* Check if there are stations for the selected state */}
                {stations?.filter(
                  (station: StationDto) =>
                    station?.state?.toLowerCase() == selectedState.toLowerCase()
                )?.length === 0 ? (
                  <p className="text-white text-center mt-4">
                    No TV stations available for this state.
                  </p>
                ) : null}

                {stations
                  ?.filter(
                    (station: StationDto) =>
                      station?.state?.toLowerCase() ===
                      selectedState.toLowerCase()
                  )
                  ?.map(
                    (
                      station: StationDto,
                      index: number,
                      filteredStations: StationDto[]
                    ) => (
                      <div key={`${station.id}-${index}`}>
                        <div className="flex flex-col sm:flex-row justify-between items-start py-3 text-white gap-2 sm:gap-0">
                          <div className="flex-1 pr-0 sm:pr-4 w-full sm:w-auto">
                            <h5 className="font-semibold text-[rgb(251,233,1)] text-start text-xs lg:text-sm uppercase break-words">
                              {station.city}
                            </h5>
                          </div>
                          <div className="flex-1 w-full sm:w-auto">
                            <p className="font-medium text-start text-white text-xs lg:text-sm">
                              {station.tvStation}
                            </p>
                            <p className="text-xs lg:text-sm text-start text-gray-300">
                              {station.time}
                            </p>
                          </div>
                        </div>
                        {index < filteredStations.length - 1 && (
                          <div className="border-b border-gray-700"></div>
                        )}
                      </div>
                    )
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WhereToWatch;
