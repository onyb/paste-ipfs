import React from 'react'
import { v4 as uuid } from 'uuid'
import axios from 'axios'

import '../styles/Home.module.css'
import modes from '../constants/modes'
import AceEditor from './editor'

const delay = time => new Promise(res => setTimeout(res, time))

const Home = () => {
  const [selectedMode, setSelectedMode] = React.useState('javascript')
  const [filename, setFileName] = React.useState('')
  const [uploading, setUploading] = React.useState(false)
  const [ipfsUrl, setIpfsUrl] = React.useState('')
  const ace = React.useRef(undefined)

  const handleFileInput = e => {
    setFileName(e.target.value)
  }

  const extension = modes.find(mode => mode.value === selectedMode)?.extension ?? '.txt'
  const trimmedFilename = filename.replace(/\.[^/.]+$/, '')

  React.useEffect(() => {
    const inferredExtension = filename.split('.').pop()
    const mode = modes.find(mode => mode.extension === `.${inferredExtension}`)

    if (mode) {
      setSelectedMode(mode.value)
    }
  }, [filename])

  const waitForUrl = async url => {
    try {
      console.log('Waiting for IPFS CID discovery: ', url)
      await axios.get(url)
    } catch (_) {
      await waitForUrl(url)
    }
    await delay(5000)
  }

  const upload = async () => {
    setUploading(true)
    const value = ace.current.editor.getValue()
    const response = await axios.post(`/api/ipfs`, {
      content: value,
      filename: trimmedFilename || uuid().slice(0, 8),
      extension
    })

    const gatewayUrl = `https://${response.data.cid}.ipfs.w3s.link`
    setIpfsUrl(gatewayUrl)

    await waitForUrl(gatewayUrl)
    window.location.href = `/${response.data.cid}`
  }

  function downloadSnippetAsFile () {
    const value = ace.current.editor.getValue()
    if (value) {
      const downloadElement = document.createElement('a')
      const file = new Blob([value], {
        type: 'text/plain;charset=utf-8'
      })

      downloadElement.href = URL.createObjectURL(file)
      downloadElement.download = `${trimmedFilename}${extension}`
      document.body.appendChild(downloadElement)
      downloadElement.click()
    }
  }

  return (
    <div className='container flex-col'>
      <form className='w-full flex flex-col justify-center items-center'>
        <div className='flex flex-wrap -mx-3 mb-2 w-2/3 items-end'>
          <div className='lg:w-1/3 md:w-1/3 sm-w-full px-3 mb-6 md:mb-0'>
            <label
              className='block tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='snippet-language-select'
            >
              Select Language of your Paste
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-400'
                onChange={e => setSelectedMode(e.target.value)}
                value={selectedMode}
              >
                {modes.map(each => (
                  <option key={each.value} value={each.value}>
                    {each.value}
                  </option>
                ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
          <div className='lg:w-1/3 md:w-1/2 sm:w-full px-3 mb-6 md:mb-0'>
            <label
              className='block tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='inline-file-name'
            >
              Enter a filename (optional)
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-400'
              type='text'
              value={filename}
              onChange={handleFileInput}
              placeholder='Enter a name for your Paste...'
              autoComplete='off'
            />
          </div>
          <div className='lg:w-1/4 md:w-1/3 sm:w-full px-3 mb-6 md:mb-0 flex items-end items-center'>
            <button
              className='shadow bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-10 rounded'
              type='button'
              onClick={upload}
              disabled={uploading}
            >
              {uploading && (
                <svg
                  role='status'
                  className='inline mr-3 w-4 h-4 text-white animate-spin'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#E5E7EB'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  />
                </svg>
              )}
              {uploading ? (ipfsUrl ? 'Waiting' : 'Uploading') : 'Create'}
            </button>
          </div>
        </div>
      </form>

      <div className='flex justify-center'>
        <AceEditor
          mode={selectedMode}
          theme='monokai'
          setReadOnly={false}
          style={{ height: '400px', width: '80%' }}
          ref={ace}
        />
      </div>
    </div>
  )
}

export default Home
