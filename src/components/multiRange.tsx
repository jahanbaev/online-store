import { FC, useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "./../styles/slider.css";
import { getParam, setUrl } from "../scripts/setUrl";
interface functionProps {
  name: string;
  maxVal: string | number | undefined;
}

const MultiRange: FC<functionProps> = (props) => {
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();
  const monthNames: string[] = [""];
  let onload: number = 0;
  const setParams = (e: ChangeResult): void => {
    if (onload !== 0) {
      setUrl(props.name + "Min", e.minValue + "");
      setUrl(props.name + "Max", e.maxValue + "");
    }
    onload = 1;
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
          labels={monthNames}
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
