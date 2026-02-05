import { NODE_ENV } from '../../config'

const baseUrl = NODE_ENV === 'development' ?
  'https://cofasv38.franklin-gov.com/api/v2/pd/peer-support' :
  'https://pdapps.franklintn.gov/api/v2/pd/peer-support'

// Types
import * as AppTypes from './AppTypes'

/**
* Get all peer support entries
* 
* GET /api/v2/pd/peer-support/support
**/
export const getAllSupport = async (headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.SupportInterface[] }> => {
  const res = await fetch(`${ baseUrl }/support`, { headers })

  return await res.json()
}

/**
* Get peer support entry
* 
* GET /api/v2/pd/peer-support/support/:uuid
**/
export const getSupport = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.SupportInterface }> => {
  const res = await fetch(`${ baseUrl }/support/${ uuid }`, { headers })

  return await res.json()
}

/**
* Create peer support entry
* 
* POST /api/v2/peer-support/support
**/
export const createSupport = async (formData: AppTypes.SupportCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.SupportInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/support`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

/**
* Update peer support entry by uuid
*
* PUT /api/v2/peer-support/support/:uuid
**/
export const updateSupport = async (formData: AppTypes.SupportCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/support/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

/**
* Delete peer support entry by uuid
*
* DELETE /api/v2/peer-support/support/:uuid
**/
export const deleteSupport = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/support/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

/**
* Create other support
*
* POST /api/v2/peer-support/support/other
**/
export const createOtherSupport = async (formData: AppTypes.OtherSupportCreateInterface, headers: Headers): Promise<AppTypes.OtherSupportCreateInterface> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/support/other`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

/**
* Update other support by uuid
*
* PUT /api/v2/peer-support/support/other/:uuid
**/
export const updateOtherSupport = async (formData: AppTypes.OtherSupportCreateInterface, headers: Headers): Promise<AppTypes.OtherSupportCreateInterface> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/support/other/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

/**
* Create personnel
*
* POST /api/v2/peer-support/personnel
**/
export const createPersonnel = async (formData: AppTypes.PersonnelCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

/**
* Update personnel by uuid
*
* PUT /api/v2/pd/peer-support/personnel/:uuid
**/
export const updatePersonnel = async (formData: AppTypes.PersonnelCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

/**
* Delete personnel by uuid
*
* DELETE /api/v2/pd/peer-support/personnel/:uuid
**/
export const deletePersonnel = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/personnel/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

/**
* Get roster personnel
*
* GET /api/v2/api/pd/peer-support/roster
**/
export const getRosterPersonnel = async (headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface[] }> => {
  const res = await fetch(`${ baseUrl }/personnel-roster`, { headers })

  return await res.json()
}

/**
* Get person by uuid
*
* GET /api/v2/pd/peer-support/personnel-roster/:uuid
**/
export const getPerson = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface }> => {
  const res = await fetch(`${ baseUrl }/personnel-roster/${ uuid }`, { headers })

  return await res.json()
}

/**
* Create roster personnel
*
* POST /api/v2/pd/peer-support/personnel-roster
**/
export const createRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface }> => {
  headers.append('Content-Type', 'application/json')
  
  const res = await fetch(`${ baseUrl }/personnel-roster`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

/**
* Update roster personnel by uuid
*
* PUT /api/v2/pd/peer-support/personnel-roster/:uuid
**/
export const updateRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel-roster/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

/**
* Delete roster personnel by uuid
*
* DELETE /api/v2/pd/peer-support/personnel-roster/:uuid
**/
export const deleteRosterPersonnel = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/personnel-roster/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

/**
* Get documentation
*
* GET /api/v2/pd/peer-support/docs
**/
export const getDocs = async (headers: Headers) => {
  const res = await fetch(`${ baseUrl }/docs`, { headers })

  return await res.json()
}