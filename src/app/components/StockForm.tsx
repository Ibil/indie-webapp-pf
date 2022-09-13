
import { StockWithProductID } from '@app/model/Product';
import { updateProductStock } from '@app/services/Products';
import { getLastPathString, getProductIDFromPath } from '@app/utils/utils';
import { ActionGroup, Button, Form, FormGroup, TextInput } from '@patternfly/react-core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ErrorFetchingData } from './common/ErrorFetchingData';
import { LoadingSpinner } from './common/LoadingSpinner';



export const StockForm: React.FC = () => {

    const history = useHistory();

    const [loading, setLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const location = useLocation();

    const [itemEditing, setItemEditing] = useState<StockWithProductID>({
        productId: getProductIDFromPath(location.pathname),
        locationId: getLastPathString(location.pathname),
        quantity: location.state.quantity
    });

    const handledressChange = quantity => {
        setItemEditing({ ...itemEditing, quantity });
    };

    const submitForm = e => {
        e.preventDefault();
        setLoading(true)
        updateProductStock(itemEditing)
            .then(() => {
                setHasError(false);
                setLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setLoading(false)
            })
    }


    useEffect(() => {
    }, [loading, hasError, itemEditing]);


    const drawForm = () => {
        if (loading) {
            return <LoadingSpinner />;
        }
        else if (hasError) {
            return <ErrorFetchingData />
        }
        else {
            return (
                <>
                    <Form onSubmit={e => { e.preventDefault(); }}>
                        <FormGroup label="Stock" isRequired fieldId="simple-form-name-01">
                            <TextInput
                                isRequired
                                type="number"
                                id="simple-form-name-01"
                                name="simple-form-name-01"
                                value={itemEditing.quantity}
                                onChange={handledressChange}
                            />
                        </FormGroup>
                        <ActionGroup>
                            <Button variant="primary" onClick={submitForm}>Submit</Button>
                            <Button variant="link" onClick={() => history.goBack()} >Go back</Button>
                        </ActionGroup>
                    </Form>
                </>
            );
        }
    }

    return drawForm();
}
