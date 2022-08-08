import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'
export default class Todo extends Component {

  constructor(props) {
    super(props)
    this.state = { description: '', list: [] }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleAdicionar = this.handleAdicionar.bind(this)
    
    this.handleRemover = this.handleRemover.bind(this)
    this.handleConcluido = this.handleConcluido.bind(this)
    this.handlePendente = this.handlePendente.bind(this)

    this.refresh()
  }

  refresh() {
    axios.get(`${URL}?sort=-createdAt`)
      .then(resp => this.setState({...this.state, description: '', list: resp.data}))
  }

  handleChange(e){
    this.setState({...this.state, description: e.target.value })
  }

  handleAdicionar(){
    const description = this.state.description
    axios.post(URL, {description})
      .then(resp => this.refresh())
  }

  handleRemover(todo){
    axios.delete(`${URL}/${todo._id}`)
      .then(resp => this.refresh())
  }

  handleConcluido(todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(resp => this.refresh())
  }

  handlePendente(todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
    .then(resp => this.refresh())
  }

  render() {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro'></PageHeader>

        <TodoForm 
        description={this.state.description}
        handleChange={this.handleChange}
        handleAdicionar={this.handleAdicionar}
        />

        <TodoList 
        list={this.state.list}
        handleRemover={this.handleRemover}
        handleConcluido={this.handleConcluido}
        handlePendente={this.handlePendente}
        />

      </div>
    )
  }
}