import React, { useState } from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

export interface DropDownInterface {
    startingValue: any;
    values: DropDownData[];
    getDropdownValue: (value) => void;
}

export interface DropDownData {
    value: any,
    /* description?: string */
}

export const DropDown: React.FC<DropDownInterface> = (
    { startingValue, values, getDropdownValue}: DropDownInterface) => {
    const [options, setOptions] = useState<any>(values);
    const [dropDownState, setState] = useState<any>({
        isOpen: false,
        selected: startingValue,
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
            getDropdownValue(selection);
        }
    };

    const clearSelection = () => {
        setState({
            selected: null,
            isOpen: false
        });
    };

    const isSelected = (option): boolean => {
        return dropDownState.selected == option.value;
    }


    return (
        <div>
            <span id={'select-descriptions-title'}>
                Title
            </span>
            <Select
                variant={SelectVariant.single}
                placeholderText="Select an option"
                aria-label="Select Input with descriptions"
                onToggle={onToggle}
                onSelect={onSelect}
                selections={dropDownState.selected}
                isOpen={dropDownState.isOpen}
                aria-labelledby={'select-descriptions-title'}
                isDisabled={false}
            >
                {options.map((option, index) => {
                    return (
                    <SelectOption
                        isSelected={isSelected(option)}
                        isDisabled={false}
                        key={index}
                        value={option.value}
                        isPlaceholder={option.isPlaceholder}
                        /* description={option.description} */
                    />
                )})}
            </Select>
        </div>
    );
}
