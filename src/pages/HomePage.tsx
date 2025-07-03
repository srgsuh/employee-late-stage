import { Stack } from '@chakra-ui/react'
import EmployeesTable from '../components/EmployeesTable'
import { Updater } from '../services/ApiClient'
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
        <EmployeesTable deleteFn={(id)=>apiClient.deleteEmployee(id as string)}
        updateFn = {(updater) => apiClient.updateEmployee(updater as Updater)}
        apiManager= {apiClient}></EmployeesTable>
        <EmployeesPaginiator></EmployeesPaginiator>
      </Stack>
      }
    </>
  )
}

export default HomePage