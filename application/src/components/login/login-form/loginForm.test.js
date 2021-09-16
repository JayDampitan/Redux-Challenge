import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

import LoginForm from './loginForm';

describe('Login Form', () => {
    test('form renders', () => {
        render(
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );

        // there should be a properly labelled email field
        expect(screen.getByLabelText('Email')).toBeInTheDocument();

        // there should be a password field
        expect(screen.getByLabelText('Password')).toBeInTheDocument();

        // there should be a login button
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    test('login prop fires', () => {
        const onLogin = jest.fn();

        render(
            <Provider store={store}>
                <LoginForm onLogin={onLogin} />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(onLogin).toHaveBeenCalled();
        
    })
});