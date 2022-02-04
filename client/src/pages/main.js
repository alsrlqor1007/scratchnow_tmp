import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/navigation';

const ButtonContainer = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: pink;
`
const Button = styled.button`
  width: 100px;
  height: inherit;
  cursor: pointer;
  background-color: white;
`
const PaintingContainer = styled.div`
  width: 100vw;
  background-color: red;
`
// 일단 불러와지는 카드 형식부터 알기.

function Main () {
  return (
    <>
      <Navigation />
      <ButtonContainer>
        <Button>최신순</Button>
        <Button>인기순</Button>
        <Button>팔로잉</Button>
      </ButtonContainer>
      <PaintingContainer>
        카드   
      </PaintingContainer>
    </>
  )   
};

export default Main;