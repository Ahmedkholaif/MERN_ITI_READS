
import axios from 'axios';
export const TODO_URL = 'https://jsonplaceholder.typicode.com/todos';

export function getTodos (){
    console.log("gettodo");
    return (
        window
        .fetch(TODO_URL).then(res =>  res.json())

        );
}

export function sendSignUpRequest (data) {
    // console.log("fetch",data)
   return (
    axios.post('/api/users/register', 
      data,
      // method: 'POST', // or 'PUT'
      // body: JSON.stringify(data),
      // type:'application/json',
      {headers:
      {
        'Content-Type': 'application/json',
        "x-auth":"token"
      }}
    ) );
}
