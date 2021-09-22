import { useState } from 'react';
import {
    Label,
    TextInput,
    HelpText
  } from "tailwind-react-ui";

const CustomTagInput = (props:any) => {

    const [currentValue, setCurrentValue] = useState<string>("");

    const handleChange = (e:any) => {
        setCurrentValue(e.target.value);
    }

    return (
        <div className="fieldInput mb-4">
            <Label>Add Custom Tags</Label>
            <HelpText>Press Enter to add a tag</HelpText>
            <TextInput
                className="inputField"
                name="paperLink"
                type="text"
                onChange={handleChange}
                onKeyPress={(e:any) => {
                    if (e.key === 'Enter' && currentValue !== "" && props.tags.indexOf(currentValue) === -1) {
                        props.setTags(props.tags.concat(currentValue));
                        setCurrentValue("");
                    }
                }}
                value={currentValue}
            />
            {props.tags.length > 0 && (
                <div className="flex flex-wrap pb-4 justify-around">
                    {props.tags.map((tag:any,key:number) => (
                        <div key={key} className="selectedOption my-2 pl-4 rounded flex flex-row items-center" style={{
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                        }}>
                            <span>{tag}</span>
                            <span className="closeIcon ml-3 p-1 px-2 cursor-pointer bg-red-400"
                            onClick={() => props.setTags(props.tags.filter((t:any) => t !== tag))}>
                            X</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
  );
};

export default CustomTagInput;