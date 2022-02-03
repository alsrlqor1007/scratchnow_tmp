import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  ${props => props.login &&`
    margin 5px 0px;
  `}
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
  const [emailState, setEmailState] = useState(true);
  const [passwordState, setPasswordState] = useState(true);
  const checkEmail = (event) => {
    const email = event.target.value;
    const emailCheckRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(email.match(emailCheckRegExp) !== null){
      setEmailState(true);
    } else {
      setEmailState(false);
    }
    setEmail(email);
  }
  const checkPassword = (event) => {
    const password = event.target.value;
    const passwordCheckRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(password.match(passwordCheckRegExp) !== null){
      setPasswordState(true);
    } else {
      setPasswordState(false);
    }
    setPassword(password);
  }
  const signIn = () => {
    if(emailState && passwordState){
      axios({
        url: 'http://ec2-52-78-171-4.ap-northeast-2.compute.amazonaws.com/api/sign/login',
        method: 'post',
        data: {
          email,
          password,
        },
        withCredentials: true,
      })
      .then((res) => {
        if(res.status === 200){
          console.log(res);
          localStorage.setItem('isLogin', true);
          navigate('/'); // 로그인 성공 후 메인 페이지 이동
        }
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      alert('모든 형식을 알맞게 채워주세요.') // 일단
    }
  }
  return (
    <>
      <Container>
        <Box>
          <InnerBox>
            <InputBox placeholder="이메일" onChange={checkEmail} />
            <ErrorMessage>{emailState ? '' : '이메일 주소가 유효하지 않습니다.'}</ErrorMessage>
            <InputBox placeholder="비밀 번호" onChange={checkPassword}/>
            <ErrorMessage>{passwordState ? '' : '유효한 비밀 번호가 아닙니다.'}</ErrorMessage>
            <Button onClick={signIn}>로그인</Button>
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
  const [nickname, setNickname] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailState, setEmailState] = useState(true);
  const [nickNameState, setNickNameState] = useState(true);
  const [passwordState, setPasswordState] = useState(true);
  const [samePasswordState, setSamePasswordState] = useState(true);
  const checkEmail = (event) => {
    const email = event.target.value;
    const emailCheckRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(email.match(emailCheckRegExp) !== null){
      setEmailState(true);
    } else {
      setEmailState(false);
    }
    setEmail(email);
  };
  const checkNickName = (event) => {
    const nickName = event.target.value;
    if(nickName.length <= 10){
      setNickNameState(true);
    } else {
      setNickNameState(false);
    }
    setNickname(nickName);
  };
  const checkPassword = (event) => {
    const password = event.target.value;
    const passwordCheckRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if(password.match(passwordCheckRegExp) !== null){
      setPasswordState(true);
    } else {
      setPasswordState(false);
    }
    setPassword(password);
  };
  const checkPasswordIsSame = (event) => {
    const retypedPassword = event.target.value;
    if(retypedPassword === password){
      setSamePasswordState(true);
    } else {
      setSamePasswordState(false);
    }
  };
  const signUp = () => {
    if(emailState && nickNameState && passwordState && samePasswordState){
      axios({
        url: 'http://ec2-52-78-171-4.ap-northeast-2.compute.amazonaws.com/api/sign/register',
        method: 'post',
        data: {
          email,
          nickname,
          password,
        },
        // withCredentials: true,
      })
      .then((res) => {
        if(res.status === 201){
          console.log(res);
          navigate('/signIn'); // 회원 가입 후 로그인 페이지 이동
        }
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      alert('모든 형식을 알맞게 채워주세요.') // 일단
    }
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
            <InputBox placeholder="이메일" onChange={checkEmail}/>
            <ErrorMessage>{emailState ? '' : '이메일 주소가 유효하지 않습니다.'}</ErrorMessage>
            <InputBox placeholder="닉네임" onChange={checkNickName}/>
            <ErrorMessage>{nickNameState ? '' : '닉네임은 10자 이내로 입력해주세요.'}</ErrorMessage>
            <InputBox placeholder="비밀 번호" onChange={checkPassword}/>
            <ErrorMessage>{passwordState ? '' : '숫자, 대문자, 특수 문자를 포함하여 8자 이상이어야 합니다.'}</ErrorMessage>
            <InputBox placeholder="비밀 번호 확인" onChange={checkPasswordIsSame}/>
            <ErrorMessage>{samePasswordState ? '' : '비밀 번호가 일치하지 않습니다.'}</ErrorMessage>
            <Button signUp onClick={signUp}>회원 가입</Button>
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
