import Container from '@/components/container'
import { Button } from '@mui/material'
import AddDialog from './dialog-add'
import { useState } from 'react'

const Tokens = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  return (
    <Container>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-black text-2xl">Tokens</div>
          <div>Manage cryptocurrency holdings with ease.</div>
        </div>

        <Button color="secondary" variant="contained" className="h-12" onClick={() => setIsOpenDialog(true)}>Add Token</Button>
      </div>

      <AddDialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)} />
    </Container>
  )
}

export default Tokens
