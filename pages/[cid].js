import { useRouter } from 'next/router'

import Viewer from '../components/viewer'

export default function ViewCID () {
  const router = useRouter()
  const { cid } = router.query

  return <Viewer cid={cid} />
}
