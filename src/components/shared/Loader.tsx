import { LineWave } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center items-center h-[450px]">
      <div className="flex flex-col items-center">
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave-loading"
          wrapperStyle={{}}
          wrapperClass=""
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    </div>
  );
}

export default Loader;
