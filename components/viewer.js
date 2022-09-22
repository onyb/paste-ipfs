import React from 'react'
import axios from 'axios'
import Lottie from 'lottie-react'

import AceEditor from './editor'
import modes from '../constants/modes'
import '../styles/viewer.module.css'
import LoadingRocketAnimation from '../lottie/loading-rocket.json'

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
      setTimeout(() => setContent(data), 2000)
      setRawUrl(url)
    })
  }, [props.cid])

  return (
    <div className='flex-col justify-center'>
      <div className='w-full flex flex-row justify-center items-center'>
        <button
          className='shadow bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded'
          type='button'
          onClick={() => (window.location.href = rawUrl)}
        >
          View raw
        </button>
      </div>
      <br />
      <div className='w-full flex flex-row justify-center items-center'>
        {content ? (
          <AceEditor
            mode={selectedMode}
            theme='monokai'
            setReadOnly={true}
            style={{ height: '400px', width: '80%' }}
            ref={ace}
            setValue={content}
          />
        ) : (
          <Lottie animationData={LoadingRocketAnimation} loop={true} />
        )}
      </div>
    </div>
  )
}

export default Viewer
