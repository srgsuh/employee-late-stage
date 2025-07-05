import { MutationFunction, useQuery } from "@tanstack/react-query";
import { Employee, SearchObject } from "../model/dto-types";
import {Avatar, Stack, Table} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { FC, useEffect, useMemo } from "react";
import useEmployeesMutation from "../hooks/useEmployeesMutation";
import EditField from "./EditField";
import useEmployeeFilters, { useAuthData, useEmployeesPagination } from "../state-management/store";
import _ from 'lodash';
import {pageSize} from '../../config/employees-config.json'
import AlertDialog from "./AlertDialog.tsx";
import {Updater, ApiClientShort} from "../services/ApiClient.ts";
import SkeletonUnit from "./SkeletonUnit.tsx";


interface Props {
  emplManager: ApiClientShort
}

const EmployeesTable:FC<Props> = ({emplManager}: Props) => {
  const {department, salaryFrom, salaryTo, ageFrom, ageTo} = useEmployeeFilters();
  const userData = useAuthData(s => s.userData);
  let searchObj: SearchObject | undefined = {};
  department && (searchObj.department = department);
  salaryFrom && (searchObj.salaryFrom = salaryFrom);
  salaryTo && (searchObj.salaryTo = salaryTo);
  ageFrom && (searchObj.ageFrom = ageFrom);
  ageTo && (searchObj.ageTo = ageTo);
  if (_.isEmpty(searchObj)) {
    searchObj = undefined
  }

  const queryKey: any[] = ["employees"];
  searchObj && queryKey.push(searchObj);
  const {
    data: employees,
    error,
    isLoading,
  } = useQuery<Employee[], AxiosError>({
    queryKey,
    queryFn: () => emplManager.getAll(searchObj),
    staleTime: 3600_000
  });
  if (error) {
    throw error;
  }

  const longTimeDel = (id:unknown)=>{
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(emplManager.deleteEmployee(id as string));
      }, 2000);
    });
  }

  const mutationDel = useEmployeesMutation(longTimeDel);
  const mutationUpdate = useEmployeesMutation((updater:unknown) => emplManager.updateEmployee(updater as Updater));

  const page = useEmployeesPagination(s => s.page);
  const setCount = useEmployeesPagination(s => s.setCount);
  const setPage = useEmployeesPagination(s => s.setPage);
  useEffect (() => {
    const count = employees?.length || 0;
    setCount(count);
    if((page - 1) * pageSize >= count) {
      setPage(1);
    }

  }, [employees])
  const {startIndex, endIndex} = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return {startIndex, endIndex}
  }, [page])
  function getEmployeesOnPage(employees: Employee[]) {
   return employees.slice(startIndex, endIndex)
  }

  return (
    <>
     
        <>
          <Stack
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Table.ScrollArea
              borderWidth="1px"
              rounded="md"
              height="70vh"
              width={{
                base:"100vw",
                sm:"95vw",
                md:"80vw"
              }}
            >
              <Table.Root size="sm" stickyHeader>
                <Table.Header>
                  <Table.Row bg="bg.subtle" zIndex="0">
                    <Table.ColumnHeader hideBelow={"md"}></Table.ColumnHeader>
                    <Table.ColumnHeader >Full Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Department</Table.ColumnHeader>
                    <Table.ColumnHeader hideBelow="sm">Salary</Table.ColumnHeader>
                    <Table.ColumnHeader hideBelow="md">Birthday</Table.ColumnHeader>
                    {userData?.role === "ADMIN" && <Table.ColumnHeader></Table.ColumnHeader>}
                  </Table.Row>
                </Table.Header>
                <Table.Body  zIndex="-100">
                  {isLoading && Array.from({length: pageSize}, (_, idx) => (
                    <Table.Row key={idx}>
                      <Table.Cell hideBelow={"md"}><SkeletonUnit type="circle" /></Table.Cell>
                      <Table.Cell ><SkeletonUnit type="line" /></Table.Cell>
                      <Table.Cell ><SkeletonUnit type="line" /></Table.Cell>
                      <Table.Cell hideBelow="sm"><SkeletonUnit type="line" /></Table.Cell>
                      <Table.Cell hideBelow="md"><SkeletonUnit type="line" /></Table.Cell>
                      {userData?.role === "ADMIN" && <Table.Cell ><SkeletonUnit type="line" /></Table.Cell>}
                    </Table.Row>
                  ))}
                  {employees && getEmployeesOnPage(employees).map((empl) => (
                    <Table.Row key={empl.id} >
                      <Table.Cell hideBelow={"md"}>
                        <Avatar.Root shape="full" size="lg">
                          <Avatar.Fallback name={empl.fullName} />
                          <Avatar.Image src={empl.avatar} />
                        </Avatar.Root>
                      </Table.Cell>
                      <Table.Cell >{empl.fullName}</Table.Cell>
                      <Table.Cell>
                       {userData?.role === "ADMIN" ? <EditField field="department" oldValue={empl.department} submitter={(data)=>
            mutationUpdate.mutate({id: empl.id, fields: data})}/>: empl.department}
                      </Table.Cell>
                      <Table.Cell hideBelow="sm">
                        {userData?.role === "ADMIN" ? <EditField field="salary" oldValue={empl.salary} submitter={(data)=>
                          mutationUpdate.mutate({id: empl.id, fields: data})}/>: empl.salary}
                      </Table.Cell>
                      <Table.Cell hideBelow="md">{empl.birthDate}</Table.Cell>
                      { userData?.role === "ADMIN" && <Table.Cell >
                        <AlertDialog onConfirm = {() => mutationDel.mutate(empl.id)}
                            isDisabled={mutationDel.isPending}
                            itemDescription={`the record of employee ${empl.fullName}`}>
                        </AlertDialog>
                      </Table.Cell>}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Stack>
        </>
    </>
  );
};

export default EmployeesTable;
