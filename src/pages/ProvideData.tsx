import AddDataset from '@/components/ProvideData/AddDataset'
import SelectProvisionType from '@/components/ProvideData/SelectProvisionType'
import AddModel from '@/components/ProvideData/AddModel'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'

function ProvideData () {
  const [selectedProvisionType, setSelectedProvisionType] = useState('')

  const buildComponentToRender = () => {
    switch (selectedProvisionType) {
      case 'model':
        return <AddModel setSelectedProvisionType={setSelectedProvisionType} />
      case 'dataset':
        return <AddDataset setSelectedProvisionType={setSelectedProvisionType} />
      default:
        return <SelectProvisionType setSelectedProvisionType={setSelectedProvisionType} />
    }
  }

  const components = buildComponentToRender()

  return (
    <>
      {components}
    </>
  )
}

export default ProvideData
