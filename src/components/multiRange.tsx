
import { useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import "./../styles/slider.css";
import { getParam, setUrl } from "../scripts/setUrl";
export default function MultiRange(props: {
  name: string; maxVal: string | number | undefined; 
}) {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const monthNames = [""];
  let onload = 0;
  function setParams(e: ChangeResult){
            if(onload !== 0){
              setUrl(props.name+"Min",e.minValue+"")
              setUrl(props.name+"Max",e.maxValue+"")
            }
            onload = 1
            setMinValue(e.minValue)
            setMaxValue(e.maxValue)
  }

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
          minValue={(getParam(props.name+"Min") === 'null')?0:getParam(props.name+"Min")}
          maxValue={(getParam(props.name+"Max") === 'null')?props.maxVal:getParam(props.name+"Max")}
          step={1}
          onChange={(e: ChangeResult) => {
            setParams(e)
          }}
        />    
      </div>
    </div>
  );
}
