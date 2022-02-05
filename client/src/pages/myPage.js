import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Navigation from '../components/navigation';

const userId = 1;

const UserInfoContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 25vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  width: 1300px;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid #F9B8C6;
  ${props => props.post&&`
    background-color: #FEFAF8;
  `}
`
// 'http://ec2-52-78-171-4.ap-northeast-2.compute.amazonaws.com/api/uploads/${props.name}' : 나중에 쓸 용도. (현재는 DB에 프로필 없음)
const Profile = styled.button`
  width: 20%;
  height: 100%;
  outline: none;
  border: none;
  ${props => props.name &&`
    background: url('http://localhost:5500/client/public/images/profile.png') no-repeat center;
    background-size: 120px;
  `}
`
const UserInfo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
`
const Nickname = styled.p`
  margin: 0;
  font-size: 1.8em;
  font-weight: 700;
  margin: 2px; 0px;
  color: #3b3b3b;
`
const StatusMessage = styled.p`
  margin: 0;
  font-size: 1em;
  font-weight: 300;
  margin: 2px; 0px;
  color: #3b3b3b;
`
const ButtonContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  ${props => props.post &&`
    justify-content: flex-end;
  `}
`
const Button = styled.button`
  width: 110px;
  height: 35px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  color: white;
  background-color: #F9B8C6;
  ${props => props.exit &&`
    width: 85px;
    margin-left: 5px; 
    background-color: #E57A75;
  `}
  ${props => props.write &&`
    width: 70px;
    margin: 20px 35px 15px 0px;
  `}
`
const PostInfo = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
const InfoBox = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
`
const Count = styled.p`
  margin: 0;
  font-size: 1.5em;
  font-weight: 800;
  color: #F9B8C6;
  cursor: pointer;
`
const Text = styled.p`
  margin: 0;
  font-size: 0.85em;
  font-weight: 500;
  color: #3b3b3b;
`
const UserPostContainer = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
const Post = styled.img`
  width: 300px;
  height: 300px;
  margin: 5px;
  background-color: #FEFAF8;
`


function MyPage () {
  const navigate = useNavigate();
  // userInfo
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  // countInfo
  const [postCount, setPostCount] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);
  const [followerCount, setFollowerCount] = useState(null);
  // posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      url: `http://ec2-52-78-171-4.ap-northeast-2.compute.amazonaws.com/api/userinfo/${userId}`,
      method: 'get',
      params: {
        page: 1 // 첫번째 요청은 1
      },
      // withCredentials: true,
    })
    .then((res) => {
      if(res.status === 200){
        const { postAmount, userdata } =res.data.data;
        const { nickname, profile_img, status_msg, total_follow, total_follower } = userdata;
        setProfileImage(profile_img); // 아직 문자열
        setNickname(nickname);
        setStatusMessage(status_msg);
        setPostCount(postAmount);
        setFollowingCount(total_follow);
        setFollowerCount(total_follower);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  // http://server-scratchnow.tk/ 서버 도메인

  useEffect(() => {
    axios({
      url: `http://ec2-52-78-171-4.ap-northeast-2.compute.amazonaws.com/api/userinfo/${userId}`,
      method: 'get',
      params: {
        page: 1 // 첫번째 요청은 1, 이후는 스크롤에 따라 변화
      },
      // withCredentials: true,
    })
    .then((res) => {
      if(res.status === 200){
        const { posts } = res.data.data.userdata;
        const newPosts = posts.map((el) => {
          return {
            date: el.createdAt.slice(0, 10).replace(/-/g, '.'),
            id: el.id,
            painting: `http://ec2-52-78-171-4.ap-northeast-2.compute.amazonaws.com/api/${el.painting.slice(3)}`
          }
        })
        setPosts((prev) => prev.concat(newPosts)); 
        // 스크롤이 바닥에 닿았을 때 요청 또 보내기 -> 근데 계속 concat하는 건 방법이 아님 filter 필요함
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, []); // 페이지 변화 감지

  return (
    <>
      <Navigation />
      <UserInfoContainer>
        <Box> 
          <Profile name/> {/* name={profileImage} */}
          <UserInfo>
            <Nickname>{nickname}</Nickname>
            <StatusMessage>{statusMessage}</StatusMessage>
            <ButtonContainer>
              <Button>회원 정보 수정</Button>
              <Button exit>회원 탈퇴</Button>
            </ButtonContainer>
          </UserInfo>
          <PostInfo>
            <InfoBox>
              <Count>{postCount}</Count>
              <Text>게시글</Text>
            </InfoBox>
            <InfoBox>
              <Count>{followerCount}</Count>
              <Text>팔로워</Text>
            </InfoBox>
            <InfoBox>
              <Count>{followingCount}</Count>
              <Text>팔로잉</Text>
            </InfoBox>
          </PostInfo>
        </Box>
      </UserInfoContainer>
      <UserPostContainer>
        <Box post>
          <ButtonContainer post>
            <Button write onClick={() => navigate('/paint')}>글쓰기</Button>
          </ButtonContainer>
          {posts.map((post) => {
            return (
              <Post src={post.painting}/>
            )
          })}
        </Box>
      </UserPostContainer>
    </>
  )
};

export default MyPage;