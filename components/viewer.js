import React from 'react'
import axios from 'axios'

import AceEditor from './editor'
import modes from '../constants/modes'
import '../styles/viewer.module.css'

const Viewer = props => {
  const [selectedMode, setSelectedMode] = React.useState('javascript')
  const [content, setContent] = React.useState('')
  const [rawUrl, setRawUrl] = React.useState('')
  const ace = React.useRef(undefined)

  React.useEffect(() => {
    if (!props.cid) {
      return
    }

    axios.get(`/api/ipfs?cid=${props.cid}`).then(response => {
      const { name, content: data, url } = response.data
      const extension = name.split('.').pop()
      const mode = modes.find(mode => mode.extension === `.${extension}`)?.value ?? 'javascript'
      setSelectedMode(mode)
      setContent(data)
      setRawUrl(url)
    })
  }, [props.cid])

  return (
    <div className='flex justify-center'>
      <AceEditor
        mode={selectedMode}
        theme='monokai'
        setReadOnly={true}
        style={{ height: '400px', width: '80%' }}
        ref={ace}
        setValue={content}
      />
    </div>
  )
}

export default Viewer
