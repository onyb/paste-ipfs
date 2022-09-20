import React, {useEffect, useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import swal from 'sweetalert';

import styles from '../styles/Home.module.css'


const Highlighter = () => {
  const [selectvalue, setSelectValue] = useState("");
  const [textfield, setTextField] = useState("");
  const [filename, setFileName] = useState("");
  const [active, setActive] = useState(false)
  const [created, setCreated] = useState(false)
  
  const validate = () => {
    return textfield.length;
  };

  useEffect(() => {
    const active = validate();
    setActive(active);
  }, [textfield]);


  const handleInputChange = (e) => {
    setTextField(e.target.value);
    let buttonText = document.getElementById('createSnippetButton')
    buttonText.innerHTML = "Create"
    if (e.target.value.length === 0) {
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
    let buttonText = document.getElementById('createSnippetButton')
    buttonText.innerHTML = "Created!"
    setCreated(true);
    setActive(false);
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
          className=" px-4 py-5 textinput w-full relative h-2/3 outline-none bg-gray-300 appearance-none text-gray-700 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-400"
          placeholder="Paste your snippet here and click on Create to generate your IPFS link..."
          value={textfield}
          onChange={handleInputChange}
        />
        <div className={styles.createfilegrid}>
        <form className="w-full max-w flex">
          <div className="flex mb-6">
            {/* <div className="md:w-1/3">
              <label className="block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-file-name">
                File Name:
              </label>
            </div> */}
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
                className="shadow bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-8 rounded"
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
      <div className="h-5/6 w-1/2 flex flex-col justify-center items-center">
        <p className="" style={{visibility: created ? "hidden" : "visible"}}
        >Snippet Not Created. Paste your code on the left to create a snippet on IPFS
        </p>
        <div className={styles.largegrid} style={{ visibility: created ? "visible" : "hidden"}}>
        <p>🎉 Hooray!!! Your snippet is created. View/Download/Copy to Clipboard</p>
        <br/>
          <SyntaxHighlighter language={selectvalue} style={docco}>
            {/* pass in code here */}
            {textfield}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default Highlighter;
