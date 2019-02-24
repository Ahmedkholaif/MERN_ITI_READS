

export const TODO_URL = 'https://jsonplaceholder.typicode.com/todos';

export function getTodos (){
    console.log("gettodo");
    return (
        window
        .fetch(TODO_URL).then(res =>  res.json())

        );
}

export function sendSignUpRequest (data) {
    console.log("fetch",data)
   return (
    fetch("http://localhost:3002/api/users/register",{
        method:'POST',
        body:JSON.stringify(data)
    }).then(res =>  res.json())
    );
}