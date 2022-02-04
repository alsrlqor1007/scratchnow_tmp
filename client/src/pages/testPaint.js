import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 500px;
  height: 500px;
  bavkground-color: gray;
  box-shadow: 5px 5px 5px red;
`
const Button = styled.button`
  width: 100px;
  height: 100px;
`

function Test () {
  const canvas = useRef();

  const [mode, setMode] = useState(null);
  const [isPainting, setIsPainting] = useState(false);
  const [context, setContext] = useState(null);
  const mouseMoveInCanvas = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    if(mode === 'paint') {
      context.strokeStyle = '#2c2c2c'; // 선 색상
      context.lineWidth = 1; // 선 두께
      if(!isPainting) {
        context.beginPath();
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
        context.stroke();
      }
    } else if(mode === 'erase') {
      if(isPainting) {
        context.clearRect(x, y, 3, 3);
      }
    }
  }

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    setContext(context);
    context.fillStyle = '#2e2e2e';
    context.fillRect(0, 0, 300,200);
  }, []);
  return (
    <>
      <Canvas
        ref={canvas} 
        onMouseMove={mouseMoveInCanvas}
        onMouseDown={() => setIsPainting(true)}
        onMouseUp={() => setIsPainting(false)}
        onMouseLeave={() => setIsPainting(false)}
      />
      <Button onClick={() => setMode('paint')}>붓</Button>
      <Button onClick={() => setMode('erase')}>지우개</Button>
      <Button onClick={() => setMode('fill')}>채우기</Button>
    </>
  )
};

export default Test;