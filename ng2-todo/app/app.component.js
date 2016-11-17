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
var todo_service_1 = require('./todo.service');
var AppComponent = (function () {
    function AppComponent(todoService) {
        this.todoService = todoService;
        this.newTodo = '';
    }
    AppComponent.prototype.getTodos = function () {
        var _this = this;
        this.todoService.getTodos().then(function (todos) { return _this.todos = todos; });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getTodos();
    };
    AppComponent.prototype.saveNewTodo = function () {
        var _this = this;
        if (!this.newTodo || this.newTodo.length <= 0) {
            return;
        }
        this.todoService.createTodo(this.newTodo).then(function (todo) { return _this.todos.unshift(todo); });
        this.newTodo = '';
    };
    AppComponent.prototype.saveTodo = function (description, guid) {
        if (!description || description.length <= 0) {
            return;
        }
        if (guid != null && description.length > 0) {
            this.todoService.updateTodo(description, guid);
        }
    };
    AppComponent.prototype.deleteTodo = function (guid) {
        this.todoService.deleteTodo(guid).then();
        var idx = this.todos.indexOf(this.todos.find(function (deletedTodo) { return deletedTodo.guid == guid; }));
        if (idx > -1) {
            this.todos.splice(idx, 1);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            providers: [todo_service_1.TodoService]
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map