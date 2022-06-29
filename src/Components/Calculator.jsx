import React, { useState } from 'react'


function Calculator() {
  const [prevAnswer, setPrevAnswer] = useState("");
  const [answer, setAnswer] = useState("0");
  const [use, setUse] = useState("");


  const percent = () => {
    prevAnswer ? setUse(String(parseFloat(use) / 100 * prevAnswer)): setUse(String(parseFloat(use) / 100))
  };

  const handleUse = (e) => {
    const value = e.target.value;

    setUse(use => use + value);
  }

  const handleOperate = (e) => {
    const value = e.target.value;


    if (value === "=") {
      if (use === "") return;
    }

    if (value === "ac") {
      setUse("");
      setAnswer(0);

      if (answer > 0)
        setPrevAnswer(answer);
      return;
    }

    if (value === "pm") {
      if (use === "") return;
      
      let calculated;
      if (Number(use.slice(-1))) {
        calculated = eval(use);

        if (Math.sign(calculated) < 0) {
          calculated = Math.abs(calculated);
          setUse(calculated.toString());
        } else {
          setUse(`-` + calculated.toString());
        }

      } else {
        calculated = (eval(use.slice(0, -1)));
        if (Math.sign(calculated)) {
          setUse((`-` + calculated.toString()))
        } else {
          setUse((calculated.toString()))
        }
      }
      return;
    }


    if (value === "%") {
      if (use === "") return;
    }

    let newuse;
    
    if (use.slice(-1) === value) {
      newuse = use.slice(0, -1);
      setUse(newuse + value);
    } else {
      
      if (!Number(use.slice(-1))) {
      
        newuse = use.slice(0, -1);

        if (Number(use.slice(-1)) === 0) {
          setUse(newuse + `0` + value); return
        } else {
          setUse(newuse + value);
          return;
        }

      } else if (use.slice(-1) === "ac") {

        setUse("");
        
        if (answer > 0)
          setAnswer(0)
      }
      else if (use.includes("/")) {
        newuse = eval(use);
        setUse(newuse);
      }
    }


    const lastDigit = use.slice(-1);
    if (!Number(lastDigit)) return;

    if (!(use === "." || use.includes("."))) {
      setUse(use => use + value);
    }

    switch (value) {
      case "ac":
        setUse("");
        break;
      case "+":
        setUse(eval(use) + value)
        break;
      case "-":
        setUse(`${eval(use)}${value}`)
        break;
      case "*":
        setUse(`${eval(use)}${value}`)
        break;
      case "%":
        console.log(`${eval(use)}${value}`)
        break;
      case "/":
        setUse(`${eval(use)}${value}`);
        break;
      case "=":
        setUse("");
        setAnswer(eval(use));
        if (answer > 0)
          setPrevAnswer(answer);
        break;
      default:
        return;
    }

  }

  const handleDelete = () => {
    if (use.length > 0) {
      setUse(op => op.slice(0, -1));
    }
  }

  return (
    <>
    <div className='calculator'>
      <div className='c-wrappers'>

        <div className='ctcs c-type'>
          <button className='active'>Calcuator</button>
          <button className='jman'>JMAN</button>
        </div>

        <div className='ctcs c-screen'>
          <div className='c-history-answers'>
            <i className="fa-solid">R</i> <span>
          
              {prevAnswer}
            </span> </div>
          <div className='c-answers'>
            <span>
              
              {answer}
            </span>
          </div>
        </div>

        <div className='ctcs c-computer'>

          <button className='c-reverse' value="rv" onClick={handleDelete}>
            <i className="fa-arrow">=></i>
          </button>
          <span>
            
            {use ? use : '0'}
          </span>
        </div>

        <div className='c-grids'>
          <button type="button" className="top-btn" value="ac" onClick={handleOperate}>ac</button>
          <button type="button" className="top-btn" value="pm" onClick={handleOperate}>&plusmn;</button>
          <button type="button" className="top-btn" value="%" onClick={percent}>%</button>
          <button type="button" className="top-btn special" value="/" onClick={handleOperate}>/</button>

          <button className="normal" value="7" onClick={handleUse}>7</button>
          <button className="normal" value="8" onClick={handleUse}>8</button>
          <button className="normal" value="9" onClick={handleUse}>9</button>


          <button className="special" value="*" onClick={handleOperate}>x</button>
          <button className="normal" value="4" onClick={handleUse}>4</button>
          <button className="normal" value="5" onClick={handleUse}>5</button>
          <button className="normal" value="6" onClick={handleUse}>6</button>


          <button className="special" value="-" onClick={handleOperate}>-</button>
          <button className="normal" value="1" onClick={handleUse}>1</button>
          <button className="normal" value="2" onClick={handleUse}>2</button>
          <button className="normal" value="3" onClick={handleUse}>3</button>
          <button className="special" value="+" onClick={handleOperate}>+</button>

          <button className="span-two normal" value="0" onClick={handleUse}>0</button>
          <button className="normal" value="." onClick={handleOperate}>.</button>
          <button className="special" value="=" onClick={handleOperate}>=</button>
        </div>
      </div>
    </div >
    </>
  )
}

export default Calculator
