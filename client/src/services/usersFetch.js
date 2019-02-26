
import axios from 'axios';
export const TODO_URL = 'https://jsonplaceholder.typicode.com/todos';

export function getTodos (){
    console.log("gettodo");
    return (
        window
        .fetch(TODO_URL).then(res =>  res.json())

        );
}

