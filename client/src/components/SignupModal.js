import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LoginModalImg from '../images/LoginModalImg.png';
import CrayonDiaryLogo from '../images/My_project.png';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 3;
`;

export const LoginModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 500px;
  border-radius: 30px;
  background-color: #fff1ad;
  display: flex;
`;

export const LeftLogin = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 30px 0px 0px 30px;
`;
export const RightLogin = styled.div`
  width: 50%;
  height: 100%;
  background-color: #fff8d6;
  border-radius: 0px 30px 30px 0px;
  padding: 55px 50px 50px 50px;
  box-sizing: border-box;
  position: relative;
`;

export const Close = styled.span`
  float: right;
  font-size: 25px;
  color: rgb(83, 81, 70);
`;

export const ModalContents = styled.div`
  margin: 0 auto;
  width: 100%;
  position: relative;
  padding: 0 20px 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const SignupFrom = styled.input`
  background-color: #fff8d6;
  margin-top: 10px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e5e5e5;
  border-right: 0px;
  border-top: 0px;
  border-left: 0px;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
  ::placeholder {
    color: #999999;
  }
`;

export const ErrorForm = styled.div`
  font-size: 11px;
  color: rgb(83, 81, 70);
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;
export const LoginBtn = styled.button`
  height: 40px;
  font-size: 11px;
  padding: 10px;
  cursor: pointer;
  background-color: rgb(255, 241, 173);
  color: rgb(83, 81, 70);
  line-height: 1px;
  margin-top: 10px;
  border-radius: 8px;
  border-style: none;
`;
export const LoginImg = styled.img`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  transform: translate(70%, 0%);
`;

export const TitleImg = styled.img`
  width: 240px;
  height: 80px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  transform: translate(26%, 200%);
`;

const SignupModal = ({ isOpen, close }) => {
  const [userInfo, setuserInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const loginHandler = (key) => (e) => {  
    setuserInfo({ ...userInfo, [key]: e.target.value });
  };
  const signupClickHandler = (e) => {
    e.preventDefault();
    const { email, nickname, password, passwordCheck } = userInfo;
    const emailregExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const digitsregExp = /\d/;
    console.log(email)
    if (!userInfo) {
      setErrorMessage('?????? ????????? ???????????????');
    }
    else if (!emailregExp.test(email)) {
      setErrorMessage('????????? ????????? ???????????? ????????????');
    }
    else if (!digitsregExp.test(password)) {
      setErrorMessage('??????????????? ????????? ?????? ?????? ??????????????? ?????????');
    }
    else if (password !== passwordCheck) {
      setErrorMessage('???????????????( ???????????? ?????????');
    }
    else {
      axios
        .post('http://localhost:80/api/sign/register',
            { email, nickname, password },
            {
              'Content-Type': 'application/json',
              withCredentials: false
            })
        .then((data) => {
            if (data.data.message === 'Email Exists') {
              setErrorMessage('?????? ????????? ??????????????????');
            } else if (data.data.message === 'Nickname Exists') {
              setErrorMessage('?????? ???????????? ??????????????????');
            } else {
              close();
            }
        })
    }
  };

  return (
    <>
      {isOpen ? (
        <Modal>
          <div onClick={() => close}>
            <LoginModal>
              <LeftLogin>
                <TitleImg src={CrayonDiaryLogo} />
              </LeftLogin>
              <RightLogin>
                <Close onClick={close}>&times;</Close>
                <LoginImg src={LoginModalImg} />
                <ModalContents>
                  <SignupFrom name="email" type="text" placeholder="?????????" onChange={loginHandler('email')} />
                  <SignupFrom name="nickname" type="text" placeholder="?????????" onChange={loginHandler('nickname')} />
                  <SignupFrom name="password" type="password" placeholder="????????????" onChange={loginHandler('password')} />
                  <SignupFrom name="passwordCheck" type="password" placeholder="??????????????????" onChange={loginHandler('passwordCheck')} />
                  <ErrorForm>{errorMessage}</ErrorForm>
                  <LoginBtn type='submit' on??????Click={signupClickHandler}> ???????????? </LoginBtn>
                </ModalContents>
              </RightLogin>
            </LoginModal>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default SignupModal;
