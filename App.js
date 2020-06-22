import React, { useEffect,useState } from 'react';
import first from './FirstPage';
import './App.css';
// import Api from './Api';
var emotions = [{
  "nickname": "first", 
  "emotion": {
  "value": "disgust",
  "confidence": 0.84392
},
  "thumbNum" :0
},
{
  "nickname": "second", 
  "emotion": {
  "value": "surprise",
  "confidence": 0.94534
},
"thumbNum" :0
},
{
  "nickname": "third", 
"emotion": {
  "value": "talking",
  "confidence": 0.999693
},
"thumbNum" :0

},
{
  "nickname": "fourth", 
  "emotion": {
    "value": "neutral",
    "confidence": 0.940166
},
"thumbNum" :0

}
]
// const userName = "heesu";


function App() {
  const topImages =[];
  const [Image, setImage ] = useState({});
  const [Images, setImages ] = useState([]);
  const [user, setUser] = useState("");
  const [signupUserName, setSignupUserName] = useState("");
  const [topImage,setTopImage] =useState([]);
  const [testNum,setTestNum] = useState(0);
  const [pageNum,setPageNum] = useState(1);

  
  const title = ()=> {
    return (
        <h1>놀란 얼굴 챌린지 </h1>
    )
}

  const changePageNum=()=>{
    setPageNum(2);
  }
  const secondPageUploader = () =>{
    return(
      <div>
        <h2>게임에 참가하고 싶다면?</h2>
        <button onClick={changePageNum}>시작하기</button>
      </div>
    )
  }
  const logout = ()=>{
    // 로그인 방식에 따라 코드 짜기
  }
  
  

  const addImage = () => {
    setImages([...Images, Image]);
    setImage({});
  }
  
  /*useEffect (()=>{
    loadImages()
    .then(_images=>{
      setImages(_images);
    })
   },[Iamge]);*/

  
  // useEffect(()=>{
  //   setUser(userName); 
  //   // sortImage();
  // },[])

  // confidence 오름차순 나열하기
  const sortImage = () => {
    emotions.sort(function(a,b){
      return b.emotion.confidence - a.emotion.confidence;
    })
  }
  
  const sortTopImage = () =>{
    for(var i =0; i<3;i++){
      topImages.push(emotions[i]);
    }
    setTopImage(topImages);
  }

  useEffect(()=>{
    sortTopImage();
  },[])



  const thumbUp2 = (i) => {
    emotions[i].thumbNum++;
    setTestNum(testNum+1);

  }

  const testFunc1 = () =>{
    setTestNum(testNum+1);
    emotions[0].thumbNum ++;
    console.log();
  }

  var rankNum = 1;
  
  const rankNumUp = () =>{
   rankNum++; 
  }

  const onSignup =(e)=>{
    e.preventDefault();
    setUser(signupUserName)
  } 

  const firstPage = () => {
    return(
      <div>
        {title()}
        <div style={{ border: '1px solid black'}}>
        <form>
          <input type="text" value={signupUserName} onChange={e => setSignupUserName(e.target.value)}/>
          <button value="회원가입" >로그인</button>
        </form>
      </div>
        {secondPageUploader()}
      </div>
    )
  }

  const secondPage = ()=>{
  return (
    <div>
      <wrap id="game">
        <div id="challenge_start">
          <span> {user} 님이 입장하셧습니다.</span>
          <button onClick={logout}> 로그아웃 </button><br/>
          <button> 나도 참가하기</button>
          
        </div>
        <div id="logout"></div>


      </wrap>
      <wrap id="ranking">
         <h1> 네임드</h1>
         <div style= {{display: "flex"}}>
           {topImage.length <3? <h4> 아직 충분한 사진이 모이지 않았습니다. </h4>:
           topImage.map((em,i)=><div style={{padding : "20px"}}>
             <span style={{fontSize: "30px"}}>{rankNum}등</span>
             <div><img src = "./image/api_test4" alt ="사진을 불러오지 못했습니다."/></div>
             <p>참가자 : {em.nickname}</p>
             <span>{em.emotion.value}</span>
             <span> {em.emotion.confidence}</span>
            {rankNumUp()}
           </div>)
         }
       </div>
      
 
      </wrap>
      <wrap id="legend_imagae" >
          <h1>명예의 전당</h1>
        <div style= {{display: "flex"}}>
          {emotions.length === 0? <h4>아직 참가한 유저가 없습니다. </h4>:
          emotions.map((em,i)=><div style={{padding : "20px"}}>
            <div><img src = "./image/api_test4" alt ="사진을 불러오지 못했습니다."/></div>
            <p>참가자 : {em.nickname}</p>
            <span>{em.emotion.value}</span>
            <span> {em.emotion.confidence}</span><br/>
            <span> 따봉수 : {em.thumbNum} </span>
            <button value = {i} onClick={e=>thumbUp2(e.target.value)}> 좋아요 </button>
          </div>)
        }
      </div>
      </wrap>
      <wrap>
     
      </wrap>
      <div>
      </div>
    </div>
  );
  }


  return(
    <wrap>
      {pageNum===1?<div>

        {firstPage()}
      </div>:
      <div>

        {secondPage()}
      </div>
       }
    </wrap>
  );
}

export default App;
