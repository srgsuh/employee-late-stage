import ApiClient, {Updater} from "../../services/ApiClient.ts";
import {Employee, SearchObject} from "../../model/dto-types.ts";
import employees from "./employee_mock_data.ts";

class MockApiClientClass implements ApiClient {
    getAll(searchObject?: SearchObject): Promise<Employee[]> {
        return Promise.resolve(employees);
    };
    getEmployee(id: string): Promise<Employee> {
        return Promise.resolve(employees[0]);
    }
    addEmployee(empl: Employee): Promise<Employee> {
        return Promise.resolve(empl);
    }
    deleteEmployee(id: string): Promise<Employee> {
        return Promise.resolve(employees[0]);
    }
    updateEmployee(updater: Updater): Promise<Employee> {
        return Promise.resolve(employees[0]);
    }
    setToken(token:string):void {
        return;
    }
}

const mockApiClient = new MockApiClientClass();
export default mockApiClient;