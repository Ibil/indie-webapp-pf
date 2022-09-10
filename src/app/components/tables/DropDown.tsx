import React, { useState } from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

export interface DropDownInterface {
    values: DropDownData[]
}

export interface DropDownData {
    value: any
}

export const DropDown: React.FC<DropDownInterface> = (
    { values }: DropDownInterface) => {
    console.log("values");
    console.log(values);
    const [options, setOptions] = useState<any>(values);

    console.log("options");
    console.log(options);
    const [state, setState] = useState<any>({
        isOpen: false,
        selected: null,
        isDisabled: false
    });


    const onToggle = isOpen => {
        setState({
            isOpen
        });
    };

    const onSelect = (event, selection, isPlaceholder) => {
        if (isPlaceholder) clearSelection();
        else {
            setState({
                selected: selection,
                isOpen: false
            });
            console.log('selected:', selection);
        }
    };

    const clearSelection = () => {
        setState({
            selected: null,
            isOpen: false
        });
    };

    const titleId = 'select-descriptions-title';

    return (
        <div>
            <span id={titleId}>
                Title
            </span>
            <Select
                variant={SelectVariant.single}
                placeholderText="Select an option"
                aria-label="Select Input with descriptions"
                onToggle={onToggle}
                onSelect={onSelect}
                selections={state.selected}
                isOpen={state.isOpen}
                aria-labelledby={titleId}
                isDisabled={false}
            >
                {options.map((option, index) => (
                    <SelectOption
                        isDisabled={false}
                        key={index}
                        value={option.value}
                        isPlaceholder={option.isPlaceholder}
                    />
                ))}
            </Select>
        </div>
    );
}
