import { Stack } from '@chakra-ui/react'
import EmployeesTable from '../components/EmployeesTable'
import apiClient from '../services/ApiClientJsonServer'
import Filters from '../components/Filters'
import { useAuthData } from '../state-management/store'
import EmployeesPaginiator from '../components/EmployeesPaginiator'


const HomePage = () => {
  const userData = useAuthData(s => s.userData);
  return (
    <>
     { !!userData &&
      <Stack>
        <Filters></Filters>
        <EmployeesTable emplManager= {apiClient}></EmployeesTable>
        <EmployeesPaginiator></EmployeesPaginiator>
      </Stack>
      }
    </>
  )
}

export default HomePage