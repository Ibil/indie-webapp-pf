import "@patternfly/react-core/dist/styles/base.css";
import { FileUpload } from "@patternfly/react-core";
import React, { useEffect } from "react";

export const ImageUpload: React.FunctionComponent = () => {
    const [fileValue, setFileValue] = React.useState(undefined);
    const [fileAsString, setFileAsString] = React.useState("");
    const [filename, setFilename] = React.useState("");
    const reader = new FileReader();

    function handleFileInputChange(
        _event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLElement>,
        file: File
    ) {
        setFilename(file.name);
        setFileValue(file);
        reader.readAsDataURL(file);
    }

    reader.addEventListener(
        "load",
        () => {
            setFileAsString(reader.result!.toString());
        },
        false
    );

    const handleClear = (
        _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setFilename("");
        setFileValue(undefined);
    };

    useEffect(() => { }, [fileAsString]);

    return (
        <>
            <img src={fileAsString} alt="Product" />
            <FileUpload
                id="simple-file"
                value={fileValue}
                filename={filename}
                filenamePlaceholder="Drag and drop a file or upload one"
                onFileInputChange={handleFileInputChange}
                onClearClick={handleClear}
                browseButtonText="Upload"
            />
        </>
    );
};
