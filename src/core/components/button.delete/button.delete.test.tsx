import React from 'react';
import { render, screen } from '@testing-library/react';

import { ButtonDelete } from './button.delete';
import { ProductStructure } from '../../types/products.types';
import { UserStructure } from '../../types/user.type';
import { productMockWithSameOwner } from '../../../mocks/product.mocks';
import { userMockSameOwner } from '../../../mocks/user.mock';
import userEvent from '@testing-library/user-event';

describe('When render Button Delete component with valid user and product', () => {
    const mockProduct:ProductStructure = productMockWithSameOwner;
    const mockUser : UserStructure = userMockSameOwner
    const mockHandleClickDelete = jest.fn();
    test('It should be on the screen', () => {
        render(<ButtonDelete
            item={mockProduct}
            user={mockUser}
            handleClickDelete={mockHandleClickDelete}
            
        
        ></ButtonDelete>);
        const buttonDelete = screen.getByText('Eliminar');
        expect(buttonDelete).toBeInTheDocument();

        userEvent.click(buttonDelete);
        expect(mockHandleClickDelete).toHaveBeenCalled();
    });
});
