import React from 'react'
import Content from '../components/DashboardC/Content'
import CompletarRegistroComponente from '../components/minicomponentes/CompletarRegistroComponente'
import DisconnectAfkUser from '../components/desconectarusuario/DisconnectAfkUser'

export const CompletarRegistro = () => {
  return (
    <>
        <DisconnectAfkUser/>
        <Content/>
        <CompletarRegistroComponente/>
        
    </>
  )
}

export default CompletarRegistro;
