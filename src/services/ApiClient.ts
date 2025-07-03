import { Employee, SearchObject } from "../model/dto-types";
export interface Updater {
    id: string;
    fields: Partial<Employee>
}
export default interface ApiClient {
    getAll(searchObject?: SearchObject): Promise<Employee[]>;
    getEmployee(id: string): Promise<Employee>
    addEmployee(empl: Employee): Promise<Employee>;
    deleteEmployee(id: string): Promise<Employee>;
    updateEmployee(updater: Updater): Promise<Employee>;
    setToken(token:string):void
}

export type ApiClientShort = Pick<ApiClient, "getAll" | "deleteEmployee" | "updateEmployee">;