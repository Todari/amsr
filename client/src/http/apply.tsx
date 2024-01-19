import axios from "axios"
import type Info from "../model/info"
import { useToast } from "@/components/ui/use-toast";

const setCookie = () => {

  var date = new Date();
  date.setTime(date.getTime() + 60 * 60 * 24 * 1000);
  document.cookie = `auth=1; expires=' + ${date.toUTCString()}; path=/;`;
}

const apply = async (info: Info): Promise<boolean|string> => {
  // const url = 'http://localhost:8080/user'
  const url = 'https://amsr-server.site/user'
  setCookie();
  let result = '';
  await axios.post(url,
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
      withCredentials: true,
    },
  )
    .then((response) => {
      console.log(response.data);
      result = response.data
      return result
    })
    .catch((response) => {
      console.log('Error!');
      console.log(response.date);
      result = response.data
      return false
    });
  return result

  //CORS 오류가 발생했을 때 정상으로 넘어가는 case가 있었음
  //추후 생성된 ID와 DB비교 등을 통해서 확인 logic 만들 것
};

export { apply };