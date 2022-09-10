import React, { useState } from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

export const DropDown: React.FC = () => {

    const [options, setOptions] = useState<any>([
        { value: 'Mr', disabled: false },
        { value: 'Miss', disabled: false },
        { value: 'Mrs', disabled: false },
        { value: 'Ms', disabled: false },
        { value: 'Dr', disabled: false },
        { value: 'Other', disabled: false }
    ]);

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
            <span id={titleId} hidden>
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
                isDisabled={state.isDisabled}
            >
                {options.map((option, index) => (
                    <SelectOption
                        isDisabled={option.disabled}
                        key={index}
                        value={option.value}
                        isPlaceholder={option.isPlaceholder}
                        description="This is a description"
                    />
                ))}
            </Select>
        </div>
    );
}
