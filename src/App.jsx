import { useState, useCallback , useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [length, setLength] = useState(7);
  const [password, setpassword] = useState("")

  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_-~`[]{}"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setpassword(pass)


  }, [length, numberAllowed, charAllowed, setpassword])

  const cpyPassToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(3,115);
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{
passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-slate-700 text-xl py-4'>
      <h1 className='text-white text-center pb-3'>Password Generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
        onClick={cpyPassToClipBoard}
        className='text-xl p-3 bg-cyan-800 text-cyan-400  font-bold'>COPY</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={7}
            max={30}
            className='cursor-pointer bg-cyan-400 appearance-none rounded-xl'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>characters</label>
        </div>
      </div>
    </div>
  );

}
export default App;
