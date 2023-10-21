import { get } from '@/utils/request'

export const ServeDepartmentList = () => get('/api/v1/organize/department/all')


export const ServePersonnelList = () => get('/api/v1/organize/personnel/all')

export const ServeCheckQiyeMember = () => get('/api/v1/organize/member/check')

