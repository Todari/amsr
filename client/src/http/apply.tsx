import axios from "axios"
import type Info from "../model/info"

const setCookie = () => {
  
  var date = new Date();
  date.setTime(date.getTime() + 60 * 60 * 24 * 1000);
  document.cookie = `auth=1; expires=' + ${date.toUTCString()}; path=/;`;
}


const apply = async (info: Info) => {
  // const url = 'http://localhost:8080/user'
  const url = 'https://amsr-server.site/user'
  setCookie();
  axios.post(url,
    {
      'round': info.round,
      'privacy': info.privacy,
      'name': info.name,
      'gender': info.gender,
      'phone': info.phone,
      'age': info.age,
      'mbti': info.mbti,
      'invited': info.invited,
      'changeSeat': info.changeSeat,
      'bottles': info.bottles,
      'transfer': info.transfer,
    },
    {  // 
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }, 
      withCredentials : true,
    },
  )
    .then((response) => { console.log(response.data); })
    .catch((response) => { console.log('Error!') });

};

export { apply };