import { useEffect, useState } from 'react';
import {
    Label,
    Button,
    Select,
  } from "tailwind-react-ui";

const CustomFilter = (props:any) => {
    let [options,setOptions] = useState(props.options);
    let [currentSelection, setCurrentSelection] = useState("");

    let handleChange = (e:any) => {
        setCurrentSelection(e.target.value);
    }

    
    return (
        <div className="fieldInput mb-4">
            <Label>{props.name}</Label>
            <Select
            className="border-2 border-black focus:shadow focus:border-red-800"
            name="options"
            options={options.map((item: any, key:any) => {
              return {
                value: item.name,
                label: item.name,
              };
            })}
            onChange={handleChange}
            />
            <div className="selectedOptions flex flex-wrap pb-4 justify-around">
                {
                  (props.selectedOptions !== undefined)?
                    props.selectedOptions.map((option:any) => {
                        return (
                            <div className="selectedOption my-2 pl-4 rounded flex flex-row items-center"style={{
                              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                            }}>
                                <span>{option}</span>
                                <span className="closeIcon ml-3 p-1 px-2 cursor-pointer bg-red-400"
                                onClick={
                                  () => props.setSelectedOptions(
                                    props.selectedOptions.filter((item:any) => item !== option)
                                  )
                                }>
                                X</span>
                            </div>
                        )
                    }):null
                }
            </div>

            <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => {
                  if(currentSelection !== "" && !props.selectedOptions.includes(currentSelection)) {
                    props.setSelectedOptions([...props.selectedOptions, currentSelection]);
                    setCurrentSelection("");
                  }
                }}
            >
              Add
            </Button>
        </div>
  );
};

export default CustomFilter;