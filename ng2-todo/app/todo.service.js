"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var TodoService = (function () {
    function TodoService(http) {
        this.http = http;
    }
    TodoService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    TodoService.prototype.getTodos = function () {
        //var headers = new Headers({'Access-Control-Allow-Origin': '*'});
        return this.http.get('http://localhost:3000/todos')
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    TodoService.prototype.createTodo = function (description) {
        console.log("todo in TodoService.createTodo: no guid, " + description);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http
            .post('http://localhost:3000/todos', JSON.stringify({ description: description }), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TodoService.prototype.updateTodo = function (description, guid) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http
            .put('http://localhost:3000/todos', JSON.stringify({ guid: guid, description: description }), { headers: headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    TodoService.prototype.deleteTodo = function (guid) {
        var url = "http://localhost:3000/todos/" + guid;
        return this.http.delete(url)
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    TodoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map