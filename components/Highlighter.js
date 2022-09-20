import React, {useEffect, useState} from "react";
import {FaCopy} from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import swal from 'sweetalert';

import styles from '../styles/Home.module.css'


const Highlighter = () => {
  const [selectvalue, setSelectValue] = useState("");
  const [textfield, setTextField] = useState("");
  const [filename, setFileName] = useState("");
  const [active, setActive] = useState(false);
  const [created, setCreated] = useState(false);
  const [snippet, setSnippet] = useState("");
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("")
  const [isIpfsHashCreated, setIsIpfsHashCreated] = useState(false);
  
  const validate = () => {
    return textfield.length;
  };

  useEffect(() => {
    const active = validate();
    setActive(active);
  }, [textfield]);

  const getCid = () => {
    const cid = setTimeout(() => {
      setIpfsHash('a-pretty-long-hash');
    }, 5000);
    console.log('File uploaded with CID ', cid)
    return cid;
  };

  function uploadToIpfs(e) {
    e.preventDefault();
    console.log('Uploading to IPFS...');
    let buttonText = document.getElementById('uploadToIpfsButton');
    buttonText.innerHTML = "Adding to IPFS...";
    setUploading(true);
    
    async function upload() {
      try {
        // const storage = new Web3Storage({token})
        const files = [];
        const file = new Blob(
          [snippet],
          {
            type: "text/plain;charset=utf-8"
          }
        );
        files.push(file);
        // const cid = await storage.put(files);
        const cid = await getCid();
        if (cid) {
          setIsIpfsHashCreated(true);
          // setIpfsHash(cid);
          setUploading(false);
        }
      } catch (err) {
          console.log(err);
      }
    }
    upload();
    }

  const handleInputChange = (e) => {
    setTextField(e.target.value);
    let buttonText = document.getElementById('createSnippetButton')
    buttonText.innerHTML = "Create"
    if (e.target.value.length === 0 || e.target.value.length !== snippet.length) {
      setCreated(false);
    }
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
    let buttonText = document.getElementById('createSnippetButton')
    buttonText.innerHTML = "Create"
  };

  const handleFileInput = (e) => {
    setFileName(e.target.value);
  };

  function createSnippet(e) {
    e.preventDefault();
    console.log('You clicked create snippet.');
    setSnippet(textfield);
    setActive(false);
    let buttonText = document.getElementById('createSnippetButton')
    buttonText.innerHTML = "Created!"
    setCreated(true);
    setIsIpfsHashCreated(false);
    setIpfsHash("");
    setUploading(false);
    let uploadButtonText = document.getElementById('uploadToIpfsButton')
    uploadButtonText.innerHTML = "+ Add to IPFS"
  }

  function downloadSnippetAsFile(e) {
    e.preventDefault();
    console.log('You clicked on download snippet button.');
    if (created && snippet) {
      const downloadElement = document.createElement('a');
      const file = new Blob(
        [snippet],
        {
          type: "text/plain;charset=utf-8"
        }
      );

      downloadElement.href = URL.createObjectURL(file);
      downloadElement.download = "new_paste.txt";
      document.body.appendChild(downloadElement);
      downloadElement.click();
    }
  }

  return (
    <div className=" container flex h-screen flex-row">
      <div className="h-full w-1/2 flex pt-14 flex-col px-6 text-center">

        {/* form container here */}
        <label class="block flex tracking-wide text-gray-700 text-md mb-2" for="snippet-language-select">
          Select a language to generate syntax highlighting for your Paste
        </label>
        <select
          // input field for language name
          className=" px-2 py-3 text-gray-700 bg-gray-300 outline-none textinput w-full mb-20"
          placeholder="Enter Language"
          id="snippet-language-select"
          value={selectvalue}
          onChange={handleSelect}
        >
          <option>Javascript</option>
          <option>CSS</option>
          <option>HTML</option>
          <option>TypeScript</option>
          <option>C++</option>
        </select>
       
        <textarea
          // text field for code
          className=" px-4 py-5 textinput w-full relative h-3/4 outline-none bg-gray-300 appearance-none text-gray-700 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-400"
          placeholder="Paste your snippet here and click on Create to generate your IPFS link..."
          value={textfield}
          onChange={handleInputChange}
        />
        <div className={styles.createfilegrid}>
        <form className="w-full max-w flex">
          <div className="flex mb-6">
            <div className="w-full md:w-3/4 flex">
              <label class="block flex tracking-wide text-gray-700 text-md mb-2" for="inline-file-name">
                Enter a name for your Paste (Optional)
              </label>
              <input
                className="px-4 py-2 textinput bg-gray-300 outline-none rounded text-gray-600 leading-tight focus:outline-none focus:bg-gray-200 focus:border-gray-300"
                id="inline-file-name"
                type="text"
                value={filename}
                onChange={handleFileInput}
                placeholder="Enter a name for your Paste..."
              />
            </div>
            <div className="md:w-1/4">
              <button
                className="shadow bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-4 px-10 rounded"
                type="button"
                id="createSnippetButton"
                value=""
                disabled={!active}
                onClick={createSnippet}
              >Create</button>
            </div>
          </div>
        </form>

        </div>   
      </div>
      {/* ready code snippet window here */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <p className="items-center" style={{visibility: !created && !snippet ? "visible" : "hidden"}}
        ><strong>Snippet has not been created...</strong><br/> Paste your code on the editor and generate your snippet.
        </p>
        <div className="w-full flex-col items-center" style={{ visibility: created && snippet ? "visible" : "hidden"}}>
          <p className="w-full items-center" style={{ visibility: !isIpfsHashCreated && snippet ? "visible" : "hidden"}}>
          🛸 Awesome! Your snippet is generated. Add the file to IPFS or download it now.
          </p>
          <p className="items-center" style={{ visibility: snippet &&  ipfsHash  && isIpfsHashCreated ? "visible" : "hidden"}}>
              🎉 <strong>Bravo! You have uploaded your snippet to IPFS.</strong><br/>Click the link to view your snippet on a new page or copy the CID and view it on an IPFS Gateway.
          </p>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0" style={{ visibility: snippet && ipfsHash && !uploading ? "visible" : "hidden"}}>
              <span
                className="inline-flex "
                style={{justifyContent: "flex-start"}}
              >
                <a className="font-bold text-md text-blue-400 hover:text-blue-600"
                  href="https://adybose.github.io"
                  target="_blank"
                  // view 
                >
                  {ipfsHash}
                </a>
                <span className="inline-flex">
                  <CopyToClipboard text={ipfsHash}>
                    <FaCopy
                      size="1rem"
                      onClick={()=>{swal("IPFS hash copied successfully")}}/>
                  </CopyToClipboard>
                </span>
              </span>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0" style={{ visibility: !isIpfsHashCreated && snippet ? "visible" : "hidden"}}>
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-600 disabled:bg-gray-500 font-semibold text-xs hover:text-white py-3 px-4 border border-blue-500 hover:border-transparent rounded"
                type="button"
                style={{justifyContent: "flex-end"}}
                id="uploadToIpfsButton"
                value=""
                disabled={uploading}
                onClick={uploadToIpfs}>
                  + Add to IPFS
              </button>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0" style={{ visibility: snippet ? "visible" : "hidden", display: "flex"}}>
              <CopyToClipboard text={snippet}>
                <button
                  className="bg-transparent hover:bg-blue-500 text-blue-600 font-semibold text-xs hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  style={{marginLeft: "auto"}}
                  onClick={()=>{swal("Code snippet copied successfully")}}>
                    Copy Snippet
                </button>
              </CopyToClipboard>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold text-xs py-3 px-4 rounded inline-flex items-center"
                id="downloadSnippetButton"
                style={{visibility: snippet ? "visible" : "hidden", marginRight: "auto"}}
                onClick={downloadSnippetAsFile}>
                  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                    <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.largegrid} style={{ visibility: created || snippet ? "visible" : "hidden"}}>
          <div className="w-full">
            <SyntaxHighlighter language={selectvalue} style={docco}>
              {/* pass in code here */}
              {snippet}
            </SyntaxHighlighter>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Highlighter;
