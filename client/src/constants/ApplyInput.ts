type InputInfoType = {
  title: string,
  type: string,
  placeholder: string,
  minLength: number,
  maxLength: number,
  regExp: RegExp
}

type InputType = {
  [index: string]: InputInfoType,
  round: InputInfoType,
  name: InputInfoType
  phone: InputInfoType,
  age: InputInfoType,
}

const APPLYINPUT: InputType = Object.freeze({
  round: {
    title: '회차',
    type: 'title',
    placeholder: '',
    minLength: 0,
    maxLength: 999,
    regExp: /^[ㄱ-ㅎ가-힣]+$/
  },
  name: {
    title: '이름',
    type: 'name',
    placeholder: 'ex) 홍길동, 성과 이름을 붙여 입력해 주세요',
    minLength: 2,
    maxLength: 4,
    regExp: /^[ㄱ-ㅎ가-힣]*$/
  },
  phone: {
    title: '전화번호',
    type: 'phone',
    placeholder: 'ex) 01012345678, 숫자만 입력해 주세요',
    minLength: 11,
    maxLength: 11,
    regExp: /^[0-9]+$/
  },
  age: {
    title: '출생연도',
    type: 'age',
    minLength: 2,
    maxLength: 2,
    placeholder: 'ex) 96, 03, 주민번호 앞 2자리만 입력해 주세요',
    regExp: /^[0-9]+$/
  },
  invited: {
    title: '나를 초대한 친구',
    type: 'invited',
    placeholder: '본인이 초대한 경우라면, 공란으로 비워주세요',
    minLength: 0,
    maxLength: 4,
    regExp: /^[ㄱ-ㅎ가-힣]*$/
  },
});

export default APPLYINPUT;
