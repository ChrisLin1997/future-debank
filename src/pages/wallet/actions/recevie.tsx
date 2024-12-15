import WalletContainer from '@/context/walletContext'
import { checksumAddress, copy } from '@/utils'
import { Button } from '@mui/material'
import QRCode from 'react-qr-code'

const Receive = () => {
  const { account } = WalletContainer.useContainer()
  const checksumedAddress = checksumAddress(account)

  return (
    <section>
      <div className="mb-4 pb-2 text-center font-black text-2xl border-b">RECEIVE</div>
      <div className="flex flex-col justify-center items-center">

        <div className="relative mb-4 py-4 px-5 bg-gray-200 rounded-md cursor-pointer" onClick={() => copy(checksumedAddress)}>
          <QRCode value={checksumedAddress} size={200} />
          <img src="/logo.ico" alt="" className="m-auto w-12 h-12 absolute inset-0 rounded-full" />
        </div>
        <div className="mb-4 text-xl font-bold break-all text-center">{checksumedAddress}</div>

        <Button variant="contained" color="secondary" size="large" fullWidth onClick={() => copy(checksumedAddress)}>Copy</Button>
      </div>
    </section>
  )
}

export default Receive
