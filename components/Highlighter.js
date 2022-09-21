import React, {useEffect, useState} from "react";
import AceEditor from "react-ace";
import {FaCopy} from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import swal from 'sweetalert';

import styles from '../styles/Home.module.css'

if (typeof window !== "undefined") {
  require("ace-builds/src-noconflict/mode-jsx")
}


const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

if (typeof window !== "undefined") {
  languages.forEach(lang => {
    require(`ace-builds/src-noconflict/mode-${lang}`);
    require(`ace-builds/src-noconflict/snippets/${lang}`);
  })

  themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));
  /*eslint-disable no-alert, no-console */
  require("ace-builds/src-min-noconflict/ext-searchbox")
  require("ace-builds/src-min-noconflict/ext-language_tools")
}

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
    setTimeout(() => {
      setIpfsHash('a-pretty-long-hash');
      setUploading(false);
      // let buttonText = document.getElementById('uploadToIpfsButton');
      // buttonText.innerHTML = "+ Add to IPFS";
    }, 5000);
  };

  function uploadToIpfs(e) {
    e.preventDefault();
    console.log('Uploading to IPFS...');
    setUploading(true);
    setActive(false);
    // let buttonText = document.getElementById('uploadToIpfsButton');
    // buttonText.innerHTML = "Adding to IPFS...";
    
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
        await getCid();
        if (ipfsHash) {
          setIsIpfsHashCreated(true);
          console.log("enters if ipfsHash condition...")
          // setIpfsHash(cid);
          // setUploading(false);
        }
      } catch (err) {
          console.log(err);
      }
    }
    upload();
    }

  const handleInputChange = (code) => {
    setTextField(code);
    let buttonText = document.getElementById('createSnippetButton')
    buttonText.innerHTML = "Create"
    // if (e.target.value.length === 0 || e.target.value.length !== snippet.length) {
    //   setCreated(false);
    // }
    // if (e.target.value.length === 0) {
    //   setCreated(false);
    // }
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value.toLowerCase());
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
    // setUploading(false);
    // let uploadButtonText = document.getElementById('uploadToIpfsButton')
    // uploadButtonText.innerHTML = "+ Add to IPFS"
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
    <div className=" container flex-col h-screen">
      {/* ready code snippet window here */}
      <div className="w-full flex flex-col justify-center items-center">
        <p className="items-center" style={{visibility: !created && !snippet ? "visible" : "hidden"}}>
          <strong>Paste not created. Create now</strong>
        </p>
        <div className="w-full flex-col items-center" style={{ visibility: created && snippet ? "visible" : "hidden"}}>
          <p className="w-full items-center" style={{ visibility: snippet && ipfsHash.length === 0 ? "visible" : "hidden"}}>
          🛸 Awesome! Your snippet is created and is being uploaded to IPFS. Please wait...
          </p>
          <p className="items-center" style={{ visibility: snippet &&  ipfsHash  ? "visible" : "hidden"}}>
            🎉 <strong>Bravo! You have uploaded your snippet to IPFS.</strong><br/>Your CID is:
          </p>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0" style={{ visibility: snippet && ipfsHash ? "visible" : "hidden"}}>
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
          </div>
        </div>
      </div>

      {/* New form */}
      <form className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-wrap -mx-3 mb-2 w-2/3 items-end">
          <div className="lg:w-1/3 md:w-1/3 sm-w-full px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="snippet-language-select">
              Select Language of your Paste
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-400"
                id="snippet-language-select"
                value={selectvalue}
                onChange={handleSelect}>
                <option>CSharp</option>
                <option>CSS</option>
                <option>Elixir</option>
                <option>Golang</option>
                <option>Handlebars</option>
                <option>HTML</option>
                <option>Java</option>
                <option>JavaScript</option>
                <option>JSON</option>
                <option>Markdown</option>
                <option>MySQL</option>
                <option>Python</option>
                <option>Ruby</option>
                <option>Sass</option>
                <option>TypeScript</option>
                <option>XML</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 sm:w-full px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="inline-file-name">
              Enter a filename (optional)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-400"
              id="inline-file-name"
              type="text"
              value={filename}
              onChange={handleFileInput}
              placeholder="Enter a name for your Paste..."
            />
          </div>
          <div className="lg:w-1/4 md:w-1/3 sm:w-full px-3 mb-6 md:mb-0 flex items-end items-center">
            <button
              className="shadow bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-10 rounded"
              type="button"
              id="createSnippetButton"
              value=""
              disabled={!active}
              onClick={createSnippet}
            >Create</button>
          </div>
        </div>
      </form>
      
      <div className="flex justify-center h-screen">
        <AceEditor
          mode={selectvalue}
          theme="github"
          onChange={handleInputChange}
          name="aceEditor"
          style={{
            height: '80vh',
            width: '80%',
          }}
          value={textfield}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </div>
      
    </div>
  );
};

export default Highlighter;
