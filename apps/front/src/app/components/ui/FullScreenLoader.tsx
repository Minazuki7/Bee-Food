import Spinner from "react-spinkit";

const FullScreenLoader = () => (
  <div className="grid h-screen place-items-center text-4xl text-blue font-mono">
    Loading . . .
    <Spinner name="ball-spin-fade-loader" color="#0019bb" />
    Please Wait!
  </div>
);

export default FullScreenLoader;
