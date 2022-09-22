import React from 'react'
import { FaCopy } from 'react-icons/fa'
import CopyToClipboard from 'react-copy-to-clipboard'
import swal from 'sweetalert'
import { v4 as uuid } from 'uuid'

import '../styles/Home.module.css'
import modes from '../constants/modes'
import AceEditor from './editor'
import axios from 'axios'

const Home = () => {
  const [selectedMode, setSelectedMode] = React.useState('javascript')
  const [filename, setFileName] = React.useState('')
  const [created, setCreated] = React.useState(false)
  const [snippet, setSnippet] = React.useState('')
  const [uploading, setUploading] = React.useState(false)
  const [ipfsHash, setIpfsHash] = React.useState('')
  const ace = React.useRef(undefined)

  const handleFileInput = e => {
    setFileName(e.target.value)
  }

  const extension = modes.find(mode => mode.value === selectedMode)?.extension ?? '.txt'
  const trimmedFilename = filename.replace(/\.[^/.]+$/, '')

  const createSnippet = async () => {
    setUploading(true)
    const value = ace.current.editor.getValue()
    const response = await axios.post(`/api/ipfs`, {
      content: value,
      filename: trimmedFilename || uuid().slice(0, 8),
      extension
    })
    setUploading(false)
    if (response.status === 200) {
      window.location.href = `/api/ipfs?cid=${response.data.cid}`
    }
  }

  function downloadSnippetAsFile () {
    const value = ace.current.editor.getValue()
    if (value) {
      const downloadElement = document.createElement('a')
      const file = new Blob([snippet], {
        type: 'text/plain;charset=utf-8'
      })

      downloadElement.href = URL.createObjectURL(file)
      downloadElement.download = `${trimmedFilename}${extension}`
      document.body.appendChild(downloadElement)
      downloadElement.click()
    }
  }

  return (
    <div className=' container flex-col h-screen'>
      <div className='w-full flex flex-col justify-center items-center'>
        <div
          className='w-full flex-col items-center'
          style={{ visibility: created && snippet ? 'visible' : 'hidden' }}
        >
          <p
            className='w-full items-center'
            style={{ visibility: snippet && ipfsHash.length === 0 ? 'visible' : 'hidden' }}
          >
            🛸 Awesome! Your snippet is created and is being uploaded to IPFS. Please wait...
          </p>
          <p
            className='items-center'
            style={{ visibility: snippet && ipfsHash ? 'visible' : 'hidden' }}
          >
            🎉 <strong>Bravo! You have uploaded your snippet to IPFS.</strong>
            <br />
            Your CID is:
          </p>
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div
              className='w-full md:w-2/5 px-3 mb-6 md:mb-0'
              style={{ visibility: snippet && ipfsHash ? 'visible' : 'hidden' }}
            >
              <span className='inline-flex ' style={{ justifyContent: 'flex-start' }}>
                <a
                  className='font-bold text-md text-blue-400 hover:text-blue-600'
                  href='https://adybose.github.io'
                  target='_blank'
                  rel='noreferrer'
                  // view
                >
                  {ipfsHash}
                </a>
                <span className='inline-flex'>
                  <CopyToClipboard text={ipfsHash}>
                    <FaCopy
                      size='1rem'
                      onClick={() => {
                        swal('IPFS hash copied successfully')
                      }}
                    />
                  </CopyToClipboard>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* New form */}
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
                id='snippet-language-select'
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
              id='inline-file-name'
              type='text'
              value={filename}
              onChange={handleFileInput}
              placeholder='Enter a name for your Paste...'
            />
          </div>
          <div className='lg:w-1/4 md:w-1/3 sm:w-full px-3 mb-6 md:mb-0 flex items-end items-center'>
            <button
              className='shadow bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-10 rounded'
              type='button'
              id='createSnippetButton'
              onClick={createSnippet}
            >
              Create
            </button>
          </div>
        </div>
      </form>

      <div className='flex justify-center h-screen'>
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
