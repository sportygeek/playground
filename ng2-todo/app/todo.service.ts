import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Todo } from './todo';

@Injectable()
export class TodoService {
    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getTodos(): Promise<Todo[]> {
        //var headers = new Headers({'Access-Control-Allow-Origin': '*'});
        return this.http.get('http://localhost:3000/todos')
            .toPromise()
            .then(
                response =>
                    response.json() as Todo[])
            .catch(this.handleError);
    }

    createTodo(description: string): Promise<Todo> {
        console.log("todo in TodoService.createTodo: no guid, " + description);
        var headers = new Headers({'Content-Type': 'application/json'});
        return this.http
            .post('http://localhost:3000/todos', JSON.stringify({description: description}), {headers: headers})
            .toPromise()
            .then(
                res => res.json())
            .catch(this.handleError);
    }

    updateTodo(description: string, guid: string): Promise<Todo> {
        var headers = new Headers({'Content-Type': 'application/json'});
        return this.http
            .put('http://localhost:3000/todos', JSON.stringify({guid: guid, description: description}), {headers: headers})
            .toPromise()
            .then(
                res => res.json())
            .catch(this.handleError);
    }

    deleteTodo(guid: string): Promise<void> {
        const url = `http://localhost:3000/todos/${guid}`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}
