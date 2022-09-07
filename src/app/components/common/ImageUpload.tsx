import "@patternfly/react-core/dist/styles/base.css";
import { FileUpload, FormGroup } from "@patternfly/react-core";
import React, { useEffect } from "react";
import imageStyles from './ImageUpload.module.css';

export interface FileData { fileName?: string; data?: string }

export const ImageUpload: React.FunctionComponent<FileData> = fileData => {
    const [fileAsString, setFileAsString] = React.useState(fileData.data);
    const [filename, setFilename] = React.useState(fileData.fileName);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isRejected, setIsRejected] = React.useState(false);

    const reader = new FileReader();
    const [fileValue, setFileValue] = React.useState(undefined);


    const handleFileAccepted = (
        file: File[]
    ) => {
        setFilename(file[0].name);
        setFileValue(file[0]);
        reader.readAsDataURL(file[0]);
    }

    reader.addEventListener(
        "load",
        () => {
            setIsRejected(false);
            setFileAsString(reader.result!.toString());
        },
        false
    );

    const handleFileRejected = (_rejectedFiles: File[], _event: React.DragEvent<HTMLElement>) => {
        setIsRejected(true);
        setFileAsString(undefined);
    };

    const handleClear = (
        _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setFilename("");
        setFileValue(undefined);
    };

    useEffect(() => { }, [fileAsString]);

    return (
        <>
            <FormGroup
                label="Product Photo"
                fieldId="text-file-with-restrictions"
                isRequired
                helperTextInvalid="Must be a png or jpeg file no larger than 10 MB"
                validated={isRejected ? 'error' : 'default'}
            >
                <FileUpload
                    id="simple-file"
                    type="dataURL"
                    value={fileValue}
                    filename={filename}
                    filenamePlaceholder="Drag and drop or upload a jpeg or png file"
                    onClearClick={handleClear}
                    browseButtonText="Upload"
                    isLoading={isLoading}
                    dropzoneProps={{
                        accept: '.jpeg,.png',
                        maxSize: 10240000,
                        onDropRejected: handleFileRejected,
                        onDropAccepted: handleFileAccepted
                    }}
                />
                {fileAsString ? <img className={imageStyles.thumbnail} src={fileAsString} alt="Product" /> : undefined}
            </FormGroup>
        </>
    );
};
