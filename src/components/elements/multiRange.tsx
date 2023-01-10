import { FC, useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "../../styles/slider.css";
import { getParam, setUrl } from "../../scripts/setUrl";
import { IfunctionProps } from "../../scripts/interfaces";


const MultiRange: FC<IfunctionProps> = (props) => {
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const setParams = (e: ChangeResult): void => {
    if (isLoad) {
      setUrl(props.name + "Min", e.minValue + "");
      setUrl(props.name + "Max", e.maxValue + "");
    }
    setIsLoad(true)
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  return (
    <div>
      <div className="flex mt-2">
        <p className="mr-auto">min: {minValue}</p>
        <p className="">max: {maxValue}</p>
      </div>
      <div className="multi-range-slider-container">
        <MultiRangeSlider
          labels={[""]}
          min={0}
          max={props.maxVal}
          minValue={
            getParam(props.name + "Min") === "null"
              ? 0
              : getParam(props.name + "Min")
          }
          maxValue={
            getParam(props.name + "Max") === "null"
              ? props.maxVal
              : getParam(props.name + "Max")
          }
          step={1}
          onChange={(e: ChangeResult) => {
            setParams(e);
          }}
        />
      </div>
    </div>
  );
};
export default MultiRange;
