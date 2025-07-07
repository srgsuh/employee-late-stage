import { it, expect, describe, test } from 'vitest'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/vitest';
import {useAuthData} from '../state-management/store';
import Layout from "../pages/Layout.tsx";
import {Provider} from "../components/ui/provider.tsx";
import {BrowserRouter} from "react-router-dom";
import employees from "./__mocks__/employee_mock_data.ts";
import {QueryClient, QueryClientProvider, QueryMeta} from "@tanstack/react-query";
import EmployeesTable from "../components/EmployeesTable.tsx";
import {Employee} from '../model/dto-types.ts';
import mockApiClient from "./__mocks__/employee_mock_service.ts";

describe('layout links according to login', () => {
    it('no auth data => login only', () => {
        useAuthData.setState({
            userData: null, login: () => {
            }, logout: () => {
            }
        });
        render(<Provider>
            <BrowserRouter><Layout/></BrowserRouter>
        </Provider>);
        expect(screen.getAllByRole('link')).toHaveLength(1);
        expect(screen.getByRole('link')).toHaveTextContent(/login/i);
    });
    it('auth as user => home and logout + statistics', () => {
        useAuthData.setState({
            userData: {role: "USER", email: 'test', token: 'test'}, login: () => {
            }, logout: () => {
            }
        });
        render(<Provider>
            <BrowserRouter><Layout/></BrowserRouter>
        </Provider>);
        expect(screen.queryByText(/home/i)).toBeInTheDocument();
        expect(screen.queryByText(/logout/i)).toBeInTheDocument();
        expect(screen.queryByText(/statistics/i)).toBeInTheDocument();
        expect(screen.queryByText(/add/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/login/i)).not.toBeInTheDocument();


        expect(screen.queryByRole('link', {name: /home/i})).toBeInTheDocument();
        expect(screen.queryByRole('link', {name: /logout/i})).toBeInTheDocument();

    });
    it('auth as ADMIN => add ', () => {
        useAuthData.setState({
            userData: {role: "ADMIN", email: 'test', token: 'test'}, login: () => {
            }, logout: () => {
            }
        });
        render(<Provider>
            <BrowserRouter><Layout/></BrowserRouter>
        </Provider>);
        expect(screen.queryByText(/home/i)).toBeInTheDocument();
        expect(screen.queryByText(/logout/i)).toBeInTheDocument();
        expect(screen.queryByText(/statistics/i)).toBeInTheDocument();
        expect(screen.queryByText(/add employee/i)).toBeInTheDocument();
        expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    });
});
describe(`Employee table contains ${employees.length} rows`, () => {
    it(`should render ${employees.length} rows with no Delete for USER`, async () => {
        useAuthData.setState({
            userData: {role: "USER", email: 'test', token: 'test'}, login: () => {
            }, logout: () => {
            }
        });
        render(<Provider>
            <QueryClientProvider client={new QueryClient()}>
                <EmployeesTable deleteFn={()=>mockApiClient.deleteEmployee("1")}
                                updateFn={ ()=>mockApiClient.updateEmployee({id:"1",fields:{}})}
                                queryFn={()=>mockApiClient.getAll() }
                                queryKey={["employees"]} />
            </QueryClientProvider>
        </Provider>);
        await expect(screen.findAllByText(/doe/i)).resolves.toHaveLength(employees.length);
        await expect(screen.findByRole('button', {name: /delete/i})).rejects.toThrow();
    });

    it(`should render ${employees.length} rows with ${employees.length} Delete for ADMIN`, async () => {
        useAuthData.setState({
            userData: {role: "ADMIN", email: 'test', token: 'test'}, login: () => {
            }, logout: () => {
            }
        });
        render(<Provider>
            <QueryClientProvider client={new QueryClient()}>
                <EmployeesTable deleteFn={()=>mockApiClient.deleteEmployee("1")}
                                updateFn={ ()=>mockApiClient.updateEmployee({id:"1",fields:{}})}
                                queryFn={()=>mockApiClient.getAll() }
                                queryKey={["employees"]} />
            </QueryClientProvider>
        </Provider>);
        await expect(screen.findAllByText(/doe/i)).resolves.toHaveLength(employees.length);
        await expect(screen.findAllByRole('button', {name: /delete/i})).resolves.toHaveLength(employees.length);
    });
});

