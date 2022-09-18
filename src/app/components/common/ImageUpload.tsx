import "@patternfly/react-core/dist/styles/base.css";
import { ActionGroup, Button, FileUpload, Form, FormGroup } from "@patternfly/react-core";
import React, { useEffect, useState } from "react";
import imageStyles from './ImageUpload.module.css';
import { updateImage } from "@app/services/Products";
import { ErrorFetchingData } from "./ErrorFetchingData";
import { useHistory } from "react-router-dom";

export interface FileData { 
    productId?: string; 
    fileName?: string; 
    data?: string,
    updateItemEditing : (data: string) => void;
  }

export const ImageUpload: React.FunctionComponent<FileData> = fileData => {

    const history = useHistory();

    const [fileAsString, setFileAsString] = React.useState(fileData.data);
    const [filename, setFilename] = React.useState(fileData.fileName);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isRejected, setIsRejected] = React.useState(false);

    const [hasError, setHasError] = useState<boolean>(false);

    const reader = new FileReader();
    const [fileValue, setFileValue] = React.useState(undefined);


    const handleFileAccepted = (
        file: File[]
    ) => {
        setHasError(false);
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

    const uploadImage = () => {
        setIsLoading(true);
        setHasError(false);
        updateImage(fileData.productId, fileAsString)
            .then(() => {
                fileData.updateItemEditing(fileAsString!)
                setIsLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setIsLoading(false);
            })
    }

    useEffect(() => { }, [fileAsString]);

    const drawPreview = () => {
        if (hasError) {
            return <ErrorFetchingData />
        }
        else if (!fileAsString) {
            return undefined;
        }
        else {
            return <img className={imageStyles.thumbnail} src={fileAsString} alt="Product" />;
        }
    }

    return (
        <>
            <Form onSubmit={e => { e.preventDefault(); }}>
                <FormGroup
                    label="Product Photo"
                    fieldId="text-file-with-restrictions"
                    isRequired
                    helperTextInvalid="Must be a png or jpg, jpeg file no larger than 73 KB"
                    validated={isRejected ? 'error' : 'default'}
                >
                    <FileUpload
                        id="simple-file"
                        type="dataURL"
                        value={fileValue}
                        filename={filename}
                        filenamePlaceholder="Drag and drop or upload a jpg, jpeg or png file"
                        onClearClick={handleClear}
                        browseButtonText="Upload"
                        isLoading={isLoading}
                        dropzoneProps={{
                            accept: '.jpeg,.png,.jpg',
                            maxSize: 73000,
                            onDropRejected: handleFileRejected,
                            onDropAccepted: handleFileAccepted
                        }}
                    />
                    {drawPreview()}
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" onClick={uploadImage} >SaveImage</Button>
                </ActionGroup>
            </Form>
        </>
    );
};
