import type Info from "../model/info"

const apply = async (info: Info) => {
  console.log(apply)
  const response = await fetch(
    "http://localhost:8080/user",
    {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

export { apply };