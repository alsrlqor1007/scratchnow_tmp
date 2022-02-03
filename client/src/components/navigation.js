import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 4px;
`
const NavBox = styled.div`
  width: 1300px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`
const HomeButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  cursor: pointer;
  background: url('http://localhost:5500/client/public/images/scratchNowLogo.png') no-repeat center;
  background-size: 100%;
`
const ButtonBox = styled.div`
  width: 200px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;  
`
const NavButton = styled.button`
  width: 100px;
  border: none;
  outline: none;
  color: #3b3b3b;
  background-color: transparent;
  &:hover {
    border-radius: 10px;
    padding: 9px 0px;
    color: white;
    cursor: pointer;
    background-color: #F9B8C6;
  }
`

function Navigation () {
  const navigate = useNavigate();
  return (
    <>
      <NavContainer>
        <NavBox>
          <HomeButton onClick={() => navigate('/')}/>
          <ButtonBox>
            <NavButton onClick={() => navigate('/signIn')}>로그인</NavButton>
            <NavButton onClick={() => navigate('/signUp')}>회원 가입</NavButton>
          </ButtonBox>
        </NavBox>
      </NavContainer>
    </>
  )
};

export default Navigation;