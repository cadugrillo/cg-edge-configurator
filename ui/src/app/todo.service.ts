import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  getTodoList(userId: string) {
    return this.httpClient.get(environment.gateway + '/todo/' + userId);
  }

  addTodo(userId: string, todo: Todo) {
    return this.httpClient.post(environment.gateway + '/todo/' + userId, todo);
  }

  completeTodo(userId: string, todo: Todo) {
    return this.httpClient.put(environment.gateway + '/todo/' + userId, todo);
  }

  deleteTodo(userId: string, todo: Todo) {
    return this.httpClient.delete(environment.gateway + '/todo/'+ userId + '/' + todo.id);
  }
}

export class Todo {
  id!: string;
  message!: string;
  complete!: boolean;
}