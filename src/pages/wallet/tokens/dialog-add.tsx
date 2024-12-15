import { Dialog, DialogContent, Button, TextField, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { CHAIN_INFO_LIST, CHAIN_INFO } from '@/global/chain'
import TokensContainer from '@/context/tokensContext'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'
import useLoading from '@/hooks/useLoading'
import { isValidEVMAddress } from '@/utils'


interface IAddDialog {
  isOpen: boolean
  onClose: () => void
}

const initTokenInfo = { name: '', symbol: '', address: '' }

const AddDialog = ({ isOpen, onClose }: IAddDialog) => {
  const { addToken } = TokensContainer.useContainer()
  const { isLoading, load, unload } = useLoading()

  // form
  const [form, setForm] = useState({ chainId: 1, address: '' })
  const handleChainId = useCallback((event: SelectChangeEvent<number>) => setForm(prev => ({ ...prev, chainId: Number(event.target.value) })), [])
  const handleAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => setForm(prev => ({ ...prev, address: e.target.value })), [])

  // token info
  const [tokenInfo, setTokenInfo] = useState(initTokenInfo)
  useEffect(() => {
    if (form.address && form.chainId && isValidEVMAddress(form.address)) {
      const chainInfo = CHAIN_INFO[form.chainId]
      const provider = new ethers.JsonRpcProvider(chainInfo.rpc)
      const erc20ABI = [
        'function name() view returns (string)',
        'function symbol() view returns (string)',
        'function decimals() view returns (uint8)',
        'function totalSupply() view returns (uint256)'
      ]

      load()
      const contract = new ethers.Contract(form.address, erc20ABI, provider)

      Promise.allSettled([contract.name(), contract.symbol()])
        .then(res => {
          const list = res.map((item: any) => item.value)
          setTokenInfo({ name: list?.[0] || 'Invalid', symbol: list[1], address: form.address })
        })
        .catch((err) => toast.error(err.message))
        .finally(() => unload())

    }
  }, [form])

  // actions
  const isValidToken = useMemo(() => tokenInfo.name && tokenInfo.symbol, [tokenInfo])

  const confirm = () => {
    addToken(form.chainId, tokenInfo.address)
    toast.success('Success')
    onClose()
  }

  // reset
  useEffect(() => {
    setTokenInfo(initTokenInfo)
    setForm(prev => ({ ...prev, address: '' }))
  }, [isOpen])

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <div className="mb-8 font-bold text-xl text-center">Add Token</div>

        <div className="mb-1 font-bold text-lg">Token chain : </div>
        <Select
          value={form.chainId}
          onChange={handleChainId}
          className="!mb-6 !max-w-full !w-96"
          size="small"
          renderValue={(id) => (
            <div className="flex items-center gap-2">
              <img src={CHAIN_INFO[id]?.icon} alt="" className="w-7 h-7 rounded-full" />
              <span>{CHAIN_INFO[id]?.name}</span>
            </div>
          )}
        >
          { CHAIN_INFO_LIST.map(item => (
            <MenuItem key={item.id} value={item.id} className="flex items-center gap-2">
              <img src={item.icon} alt="" className="w-7 h-7 rounded-full" />
              <span>{item.name}</span>
            </MenuItem>
          )) }
        </Select>


        <div className="mb-1 font-bold text-lg">Token address : </div>
        <TextField
          value={form.address}
          size="small"
          color="secondary"
          className="!mb-6 !max-w-full !w-96"
          placeholder="0xAC15...."
          onChange={handleAddress}
        />

        <div className="mb-8 font-bold">
          <div className="text-lg">Token Name : </div>
          <div className="text-xl text-secondary">
            { isLoading ? 'Waiting...' : `${tokenInfo.name} ${tokenInfo.symbol ? `(${tokenInfo.symbol})` : ''}`}
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          <Button size="large" color="error" variant="outlined" onClick={onClose}>Cancel</Button>
          <Button size="large" color="secondary" variant="contained" onClick={confirm} disabled={!isValidToken}>Confirm</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddDialog
