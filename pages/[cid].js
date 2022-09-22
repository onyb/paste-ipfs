import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Viewer = dynamic(import('../components/viewer'), { ssr: false })

export default function ViewCID () {
  const router = useRouter()
  const { cid } = router.query

  return <Viewer cid={cid} />
}
