const baseUrl = import.meta.env.VITE_API_URL

// Types
import * as AppTypes from './AppTypes'

/**
* Get all peer support entries
* 
* GET /api/v3/pd/peer-support/support
**/
export const getAllSupport = async (headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.SupportInterface[] }> => {
  const res = await fetch(`${ baseUrl }/support`, { headers })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Get peer support entry
* 
* GET /api/v3/pd/peer-support/support/:uuid
**/
export const getSupport = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.SupportInterface }> => {
  const res = await fetch(`${ baseUrl }/support/${ uuid }`, { headers })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Create peer support entry
* 
* POST /api/v3/peer-support/support
**/
export const createSupport = async (formData: AppTypes.SupportCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.SupportInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/support`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Update peer support entry by uuid
*
* PUT /api/v3/peer-support/support/:uuid
**/
export const updateSupport = async (formData: AppTypes.SupportCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/support/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Delete peer support entry by uuid
*
* DELETE /api/v3/peer-support/support/:uuid
**/
export const deleteSupport = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/support/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Create other support
*
* POST /api/v3/peer-support/support/other
**/
export const createOtherSupport = async (formData: AppTypes.OtherSupportCreateInterface, headers: Headers): Promise<AppTypes.OtherSupportCreateInterface> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/support/other`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Update other support by uuid
*
* PUT /api/v3/peer-support/support/other/:uuid
**/
export const updateOtherSupport = async (formData: AppTypes.OtherSupportCreateInterface, headers: Headers): Promise<AppTypes.OtherSupportCreateInterface> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/support/other/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Create personnel
*
* POST /api/v3/peer-support/personnel
**/
export const createPersonnel = async (formData: AppTypes.PersonnelCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Update personnel by uuid
*
* PUT /api/v3/pd/peer-support/personnel/:uuid
**/
export const updatePersonnel = async (formData: AppTypes.PersonnelCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Delete personnel by uuid
*
* DELETE /api/v3/pd/peer-support/personnel/:uuid
**/
export const deletePersonnel = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/personnel/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Get roster personnel
*
* GET /api/v3/api/pd/peer-support/roster
**/
export const getRosterPersonnel = async (headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface[] }> => {
  const res = await fetch(`${ baseUrl }/personnel-roster`, { headers })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Get person by uuid
*
* GET /api/v3/pd/peer-support/personnel-roster/:uuid
**/
export const getPerson = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface }> => {
  const res = await fetch(`${ baseUrl }/personnel-roster/${ uuid }`, { headers })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Create roster personnel
*
* POST /api/v3/pd/peer-support/personnel-roster
**/
export const createRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse & { data: AppTypes.PersonnelRosterInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel-roster`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Update roster personnel by uuid
*
* PUT /api/v3/pd/peer-support/personnel-roster/:uuid
**/
export const updateRosterPersonnel = async (formData: AppTypes.PersonnelRosterCreateInterface, headers: Headers): Promise<AppTypes.ServerResponse> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/personnel-roster/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Delete roster personnel by uuid
*
* DELETE /api/v3/pd/peer-support/personnel-roster/:uuid
**/
export const deleteRosterPersonnel = async (uuid: string, headers: Headers): Promise<AppTypes.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/personnel-roster/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}

/**
* Get documentation
*
* GET /api/v3/pd/peer-support/docs
**/
export const getDocs = async (headers: Headers) => {
  const res = await fetch(`${ baseUrl }/docs`, { headers })

  if(!res.ok) throw new Error(`HTTP error ${res.status}`)

  return await res.json()
}