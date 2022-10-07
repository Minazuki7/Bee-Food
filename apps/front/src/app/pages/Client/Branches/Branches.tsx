import BranchCard from "@components/cards/cardBranches";
import Branch from "@components/modules/branchs";
import { useBranches, useBranchesByZone } from "@requests/branch";
import { useCountries } from "@requests/country";
import { useZones } from "@requests/zone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import NotFound from "../../../assets/png/NotFound.png";

const ClientBranch = () => {
  const [zoneName, setZoneName] = useState<any>("");
  const [zoneID, setZoneId] = useState<any>("");
  const { data: branchData, refetch } = useBranchesByZone({
    variables: { id: zoneID },
  });
  const branchs = branchData?.findBranchByZone.data;

  const { data: countryhData } = useCountries();
  const countries = countryhData?.findAllCountrys.data;
  const { data: zonehData } = useZones();
  const zones = zonehData?.findAllZones.data;
  const zonesOptions = zones?.map((zone) => ({
    value: { name: zone.name, value: zone.id },
    label: zone.name,
  }));

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="w-full">
      <div className="flex h-12">
        <button className="h-full w-1/3 ml-auto">
          {" "}
          <div className="ml-auto font-bold rounded-xl text-white bg-[#752a1c] h-full w- flex items-center justify-center text-[24px]">
            Try Our Premimum Order
          </div>
        </button>
      </div>
      <div className="flex font-bold h-10">
        <div className="mt-auto text-[20px]">Choose Your Zone</div>
        <div className="ml-auto mt-auto h-full flex gap-2  mr-8"></div>
      </div>
      <div className="h-20">
        <Select
          className="Zone  text-[20px] z-50"
          options={zonesOptions}
          onChange={(value) => {
            setZoneName(value?.value.name);
            setZoneId(value?.value.value);
          }}
        />
      </div>
      <div className=" text-[32px] font-bold my-4">LIST OF Branches</div>

      <div className=" flex justify-end w-full "></div>
      {branchs?.length ? (
        <div className="grid grid-cols-4 gap-1">
          {branchs.map((branchs) => (
            <div className=" w-11/12">
              <BranchCard
                name={branchs.name}
                status={branchs.status}
                company={branchs.company.name}
                franchise={branchs.franchise.name}
                zone={branchs.zone.name}
                id={branchs.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className=" text-center content-center w-full ml-80 mt-4  font-bold">
          <img src={NotFound} width="500" height="500"></img>
        </div>
      )}
      {/* <div className="grid grid-cols-6 gap-2">
        {countries?.map((country) => (
          <a className=" rounded-full bg-red-400 px-2 py-1 w-[70px]">
            {country.name}
          </a>
        ))}
      </div> */}
    </div>
  );
};
export default ClientBranch;
