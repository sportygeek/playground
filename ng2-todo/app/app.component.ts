import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [TodoService]
})

export class AppComponent implements OnInit {
    todos: Todo[];
    newTodo = '';

    constructor(
        private todoService: TodoService) { }

    getTodos(): void {
        this.todoService.getTodos().then(
            todos => this.todos = todos);
    }

    ngOnInit(): void {
        this.getTodos();
    }

    saveNewTodo(): void {
        if(!this.newTodo || this.newTodo.length <= 0){
            return;
        }
        this.todoService.createTodo(this.newTodo).then(
            todo => this.todos.unshift(todo));
        this.newTodo = '';
    }

    saveTodo(description: string, guid: string): void {
        if(!description || description.length <= 0){
            return;
        }
        if(guid != null && description.length > 0){
            this.todoService.updateTodo(description, guid);
        }
    }

    deleteTodo(guid: string): void {
        this.todoService.deleteTodo(guid).then(

        );
        var idx = this.todos.indexOf(this.todos.find(deletedTodo => deletedTodo.guid == guid));
        if(idx > -1){
            this.todos.splice(idx, 1);
        }
    }

}
