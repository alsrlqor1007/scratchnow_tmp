import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  position: relative;
  width: 800px;
  height: 500px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  background-color: #434343;
`
const SideImage = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  width: 400px;
  height: 500px;
  cursor: pointer;
  background: url('http://localhost:5500/client/public/images/signInSignUpSideImage.png') no-repeat center;
  background-size: 400px;
`
const InnerBox = styled.div`
  position: absolute;
  z-index: 2;
  width: 400px;
  height: 500px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background-color: #FEF8FA;
`
const InputBox = styled.input`
  width: 300px;
  height: 30px;
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: solid 1px #BEBEBE;
`
const ErrorMessage = styled.div`
  width: 300px;
  height: 10px;
  margin: 5px 0px 25px 0px;
  font-size: 0.75em;
  color: #E57A75;
`
const Button = styled.button`
  width: 300px;
  height: 35px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 20px 0px;
  color: white;
  background-color: #F9B8C6;
  ${props => props.kakao &&`
    background: url('http://localhost:5500/client/public/images/kakao_login_large_wide.png') no-repeat center;
    background-size: 300px;
  `}
  ${props => props.signUp &&`
    margin: 0;
  `}
`
const DividedBox = styled.div`
  width: 300px;
  height: 20px;
  color: #F9B8C6;
  font-size: 0.7em;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  ${props => props.signUp &&`
    margin: 10px; 0px;
  `}
`
const SplitLine = styled.hr`
  margin: 0;
  width: 125px;
  height: 1px;
  border: none;
  background-color: #F9B8C6;
`
const BottomLink = styled.div`
  position: absolute;
  bottom: 15px;
  width: 300px;
  height: 20px;
  font-size: 0.8em;
  text-align: center;
`
const Bold = styled.a`
  margin-left: 5px;
  font-weight: 700;
  cursor: pointer;
  text-decoration-line: none;
`

export function SignIn () {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleInput = (event, func) => {
    func(event.target.value);
  }
  return (
    <>
      <Container>
        <Box>
          <InnerBox>
            <InputBox placeholder="이메일" onChange={(e) => handleInput(e, setEmail)} />
            <ErrorMessage>이메일 형식 에러메세지</ErrorMessage>
            <InputBox placeholder="비밀 번호" onChange={(e) => handleInput(e, setPassword)}/>
            <ErrorMessage>비밀 번호 형식 에러메세지</ErrorMessage>
            <Button>로그인</Button>
            <DividedBox>
              <SplitLine/>
              또는
              <SplitLine/>
            </DividedBox>
            <Button kakao/>
            <BottomLink>회원이 아니신가요 ? 
                <Bold onClick={() => navigate('/signUp')}>가입 하기</Bold>
            </BottomLink>
          </InnerBox>
          <SideImage onClick={() => navigate('/')}/>
        </Box>
      </Container>
    </>
  )
};

export function SignUp () {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const handleInput = (event, func) => {
    func(event.target.value);
  }
  return (
    <>
      <Container>
        <Box>
          <InnerBox>
            <Button kakao signUp/>
            <DividedBox signUp>
              <SplitLine/>
              또는
              <SplitLine/>
            </DividedBox>
            <InputBox placeholder="이메일" onChange={(e) => handleInput(e, setEmail)}/>
            <ErrorMessage>이메일 형식 에러메세지</ErrorMessage>
            <InputBox placeholder="닉네임" onChange={(e) => handleInput(e, setNickName)}/>
            <ErrorMessage>닉네임 형식 에러메세지</ErrorMessage>
            <InputBox placeholder="비밀 번호" onChange={(e) => handleInput(e, setPassword)}/>
            <ErrorMessage>비밀 번호 형식 에러메세지</ErrorMessage>
            <InputBox placeholder="비밀 번호 확인" onChange={(e) => handleInput(e, setConfirmedPassword)}/>
            <ErrorMessage>비밀 번호 확인 에러메세지</ErrorMessage>
            <Button signUp>로그인</Button>
            <BottomLink>회원이신가요 ? 
                <Bold onClick={() => navigate('/signIn')}>로그인 하기</Bold>
            </BottomLink>
          </InnerBox>
          <SideImage onClick={() => navigate('/')}/>
        </Box>
      </Container>
    </>
  )
}
