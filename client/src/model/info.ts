import { CheckedState } from "@radix-ui/react-checkbox";

type Info = {
  round: string;
  privacy: CheckedState | void,
  name: string;
  gender: boolean;
  phone: string;
  age: string;
  mbti: string;
  invited: string,
  changeSeat: boolean,
  bottles: number,
  transfer: boolean
}

export default Info