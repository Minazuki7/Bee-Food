import Radio from "@mui/material/Radio";

export interface ValuesProps {
  onChange: (event: any) => void;
  name: string;
  seleceted?: number;
}
const ValueSetting = ({ name, onChange, seleceted }: ValuesProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-col text-xl text-center">
        <Radio
          checked={seleceted === 1}
          value={1}
          name={name}
          onChange={onChange}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 60,
              color: "#FF0000",
            },
          }}
        />
        <div> 1</div>
      </div>
      <div className="flex-col text-xl text-center ">
        <Radio
          checked={seleceted === 2}
          value={2}
          name={name}
          onChange={onChange}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 60,
              color: "#CC0033",
            },
          }}
        />
        <div> 2</div>
      </div>
      <div className="flex-col text-xl text-center ">
        <Radio
          checked={seleceted === 3}
          value={3}
          name={name}
          onChange={onChange}
          color="success"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 60,
              color: "#990066",
            },
          }}
        />
        <div> 3</div>
      </div>
      <div className="flex-col text-xl text-center">
        <Radio
          checked={seleceted === 4}
          value={4}
          name={name}
          onChange={onChange}
          color="default"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 60,
              color: "#660099",
            },
          }}
        />
        <div> 4</div>
      </div>
      <div className="flex-col text-xl text-center">
        <Radio
          checked={seleceted === 5}
          value={5}
          name={name}
          onChange={onChange}
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 60,
              color: "#3300CC",
            },
          }}
        />
        <div> 5</div>
      </div>
    </div>

    // <label>
    //   <input
    //     type="radio"
    //     name

    //     value={1}
    //     onChange={onChange}
    //     style={{ height: 50, width: 75 }}
    //   ></input>
    //   <input
    //     type="radio"
    //     name={name}

    //     value={2}
    //     onChange={onChange}
    //     style={{ height: 50, width: 75 }}
    //   ></input>
    //   <input
    //     type="radio"
    //     name={name}

    //     value={3}
    //     onChange={onChange}
    //     style={{ height: 50, width: 75 }}
    //   ></input>
    //   <input
    //     type="radio"
    //     name={name}

    //     value={4}
    //     onChange={onChange}
    //     style={{ height: 50, width: 75 }}
    //   ></input>
    //   <input
    //     type="radio"
    //     name={name}

    //     value={5}
    //     onChange={onChange}
    //     style={{ height: 50, width: 75 }}
    //   ></input>
    //   <input
    //     type="radio"
    //     name={name}

    //     value={6}
    //     onChange={onChange}
    //     style={{ height: 50, width: 75 }}
    //   ></input>
    //   <input
    //     type="radio"
    //     name={name}

    //     value={7}
    //     onChange={onChange}
    //     style={{ height: 50, width: 75 }}
    //   ></input>
    // </label>
  );
};
export default ValueSetting;
