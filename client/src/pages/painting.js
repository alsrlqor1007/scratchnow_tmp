import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Navigation from '../components/navigation';
import axios from 'axios';

// 서버에서 불러올지 말지 결정
const rainbowImages = [
  'http://localhost:5500/client/public/images/random01.jpg',
  'http://localhost:5500/client/public/images/random02.jpg',
  'http://localhost:5500/client/public/images/random03.jpg',
  'http://localhost:5500/client/public/images/random04.png',
  'http://localhost:5500/client/public/images/random05.png',
  'http://localhost:5500/client/public/images/random06.png',
  'http://localhost:5500/client/public/images/random07.png',
  'http://localhost:5500/client/public/images/random08.png',
  'http://localhost:5500/client/public/images/random09.jpg',
  'http://localhost:5500/client/public/images/random10.jpeg',
  'http://localhost:5500/client/public/images/random11.jpg',
  'http://localhost:5500/client/public/images/random12.jpg',
  'http://localhost:5500/client/public/images/random14.jpeg',
]

const BREAK_POINT_MOBILE = 768; // sm
const BREAK_POINT_TABLET = 992; // md
const BREAK_POINT_PC = 1200; // lg

const calcWidthPercent = span => {
  if(!span) return;
  const width = (span / 12) * 100;
  return width;
}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
const CanvasContainer = styled.div`
  position: relative;
  width: 70%;
  height: 80vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  background-color: #EFEFEF;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: ${({ sm }) => sm &&`${calcWidthPercent(sm)}%}`};
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: ${({ lg }) => lg &&`${calcWidthPercent(lg)}%}`};
  }
`
const Canvas = styled.canvas`
  position: absolute;
  left: 0;
  width: 100%;
  height: calc(100% - 25vh);
  border-radius: 5px;
  z-index: ${props => props.back ? 1 : 2};
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: ${({ sm }) => sm && `100%`};
    height: calc(100% - 25vh);
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: ${({ lg }) => lg &&`calc(100% - 300px)`};
    height: 100%;
  }
`
const CanvasSide = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${({ sm }) => sm &&`25vh` };
  display: flex;
  flex-flow: row nowrap; // 노랩 굳
  justify-content: center;
  align-items: center;
  background-color: #EFEFEF;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${({ sm }) => sm &&`25vh` };
    display: flex;
    flex-flow: row nowrap; // 노랩 굳
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: 300px;
    height: ${({ lg }) => lg &&`100%`};
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
`
const ControlTowerContainer = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center; 
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: 200px;
    height: 100%; 
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: 300px;
    height: 100px;
  }
`
const ButtonContainer = styled.div`
  display: inline;
  text-align: center; 
  width: 100%;
  height: 50px; // 버튼 개수 늘어나면 높이 변해야 함.
  margin-top: 10px;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    display: inline; 
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    display: flex;
    flex-flow: row wrap;
    justify-content: center; 
  }
`
const Button = styled.button`
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin: 0px 5px;
  box-shadow: rgba(50, 50, 93, 0.15) 0px 2px 4px -1px;
  ${props => props.reset &&`
    background: url('http://localhost:5500/client/public/images/newCanvas.png') no-repeat center;
    background-size: 15px;
  `}
  ${props => props.rainbow &&`
    background: url('http://localhost:5500/client/public/images/scratchNowLogo.png') no-repeat center;
    background-size: 30px;
  `}
  background-color: white;
`
const SaveButton = styled.button`
  width: 35px;
  height: 90%; 
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 15px 10px 15px 10px;
  color: white;
  background-color: #F9B8C6;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: 35px;
    height: 90%; 
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: 280px;
    height: 35px;
  }
`
const Range = styled.input`
  width: 90%;
  height: 20px;
  cursor: pointer;
  margin-bottom: 10px;
  // 추후 디자인 변경
`
const TextArea = styled.textarea`
  border-radius: 15px;
  border: none;
  font-family: "Gaegu";
  font-size: 30px;
  width: 75%;
  height: 83%;
  padding: 10px 15px 10px;
  outline: none;
  resize: none;
  overflow: hidden;
  background-attachment: local;
  background-image: linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(
      white,
      white 36px,
      #ccc 21px,
      white 37px
    );
  line-height: 36.5px;
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px){
    width: 75%;
    height: 80%;
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: 250px;
    height: 500px;
  }
`

let timer = null;

function Painting () {
  const canvas = useRef();
  const background = useRef();

  const [context, setContext] = useState(null);
  const [imageContext, setImageContext] = useState(null);
  const [eraserSize, setEraserSize] = useState(4.5);
  const [isPainting, setIsPainting] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isRandomImg, setIsRandomImg] = useState(false);
  const [isResize, setIsResize] = useState(false);
  const [canvasSize, setCanvasSize] = useState([1000, 1000]);

  const [text, setText] = useState('');

  const [width, height] = canvasSize;

  window.addEventListener('resize', function(){
    clearTimeout(timer);
    timer = setTimeout(function(){
      setIsResize((prev) => !prev);
    }, 300);
  });

  const postPainting = () => {
    const image = new Image();
    const dataURL = canvas.current.toDataURL();
    image.crossOrigin = 'anonymous';
    image.src = dataURL;
    image.onload = function() {
      imageContext.drawImage(image, 0, 0, canvasSize[0], canvasSize[1]); // [image + image]
      const array = [];
      const formData = new FormData(); // formData 값은 문자열로 자동변환 
      formData.append('userId', 1); // server에서 받은 userId 넣어주기
      formData.append('text', text);

      const rawData = background.current.toDataURL('image/jpg', 'image/octet-stream');
      // isBlob
      const decodeData = atob(rawData.split(',')[1]);
      for(let i=0; i<decodeData.length; i++){
        array.push(decodeData.charCodeAt(i));
      }
      const file = new Blob([new Uint8Array(array)], { type: 'image/jpg' });
      const fileName = `canvas_img_${new Date().getMilliseconds()}.jpg`;
      formData.append('painting', file, fileName); 

      // isNotBlob
      //formData.append('painting', rawData);

      axios({
        url: 'http://ec2-52-78-171-4.ap-northeast-2.compute.amazonaws.com/api/post',
        method: 'post',
        header: {
          'processData': false,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        withCredentials: false,
      })
      .then((res) => {
        if(res.status === 200){
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    };
  }

  const handleEraserSize = (event) => {
    const size = event.target.value;
    setEraserSize(size);
  }

  const mouseMoveInCanvas = (event) => {
    // -> canvas width height 반응형으로 바로잡기.
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    if(!isPainting){

    } else {
      context.clearRect(x, y, eraserSize, eraserSize);
    }
  }

  const resetCanvas = () => {
    setIsReset((prev) => !prev);
  }
  const getRandomImg = () => {
    setIsRandomImg((prev) => !prev);
  }

  // resize canvas
  useEffect(() => {
    const width = canvas.current.offsetWidth;
    const height = canvas.current.offsetHeight;
    setCanvasSize([width, height]);
  }, [isResize]);

  // 검정 scratch 채우기
  useEffect(() => {
    const context = canvas.current.getContext('2d');
    setContext(context);
    context.fillStyle = '#2e2e2e';
    context.fillRect(0, 0, canvasSize[0],canvasSize[1]);
  }, [isReset, isRandomImg, canvasSize]);

  // 레인보우 배경 채우기
  useEffect(() => {
    const imageContext = background.current.getContext('2d');
    setImageContext(imageContext);
    const image = new Image();
    const randomNum = Math.round(Math.random()*13);
    image.crossOrigin = 'anonymous';
    image.src = rainbowImages[randomNum];
    image.onload = function(){
      imageContext.drawImage(image, 0, 0, canvasSize[0], canvasSize[1]);
    }
  }, [isRandomImg, isResize]);

  return (
    <>
      <Navigation />
      <Container>
        <CanvasContainer sm={11} lg={8}>
          <Canvas 
            sm lg
            width={width} height={height} 
            ref={canvas} 
            onMouseMove={mouseMoveInCanvas} 
            onMouseDown={() => setIsPainting(true)}
            onMouseUp={() => setIsPainting(false)}
            onMouseLeave={() => setIsPainting(false)}
            onContextMenu = {(event) => event.preventDefault()}
          />
          <Canvas 
            sm lg
            width={width} height={height} 
            ref={background} 
            back
            onContextMenu = {(event) => event.preventDefault()}
          />
          <CanvasSide sm lg>
            <ControlTowerContainer>
              <ButtonContainer>
                <Button onClick={resetCanvas} reset></Button>
                <Button onClick={getRandomImg} rainbow></Button>
              </ButtonContainer>
              <Range 
                type="range" 
                min="0.1" 
                max="8.0" 
                step="0.1" 
                value={eraserSize} 
                onChange={handleEraserSize}
              />
            </ControlTowerContainer>
            <TextArea onChange={(event) => setText(event.target.value)} maxLength="200"/>
            <SaveButton onClick={postPainting}>저장 하기</SaveButton>
          </CanvasSide>
        </CanvasContainer>
      </Container>
    </>
  )
};

export default Painting;