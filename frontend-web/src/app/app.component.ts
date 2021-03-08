import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from './todo.service'
import { Todo } from './todo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-web';

  todos: Todo [] = []

  form: FormGroup = new FormGroup({
    description : new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  constructor(
    private service: TodoService
  ){ }

  ngOnInit(){
    this.listarTodos()
  }

  listarTodos(){
    this.service.listar().subscribe(todoList => {
      console.log (todoList)
      this.todos = todoList
    } )
  }


  submit(){
    const todo: Todo = { ...this.form.value}
    this.service
    .salvar(todo)
    .subscribe (savedTodo => {
      this.todos.push(savedTodo)
      this.form.reset()
    })
  }

  delete(todo: Todo){
    this.service.deletar(todo.id).subscribe({
      next: (response) => this.listarTodos()
    })
  }

  done(todo: Todo) {
    this.service.marcarComoFeito(todo.id).subscribe({
      next: (todoAtual) => {
        todo.done = todoAtual.done
        todo.doneDate = todoAtual.doneDate
      }
    })
  }

}
