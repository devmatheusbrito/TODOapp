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
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClear = this.handleClear.bind(this)

    this.handleRemover = this.handleRemover.bind(this)
    this.handleConcluido = this.handleConcluido.bind(this)
    this.handlePendente = this.handlePendente.bind(this)

    this.refresh()
  }

  refresh(description = '') {
    const search = description ? `&description__regex=/${description}/`:''
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then(resp => this.setState({...this.state, description, list: resp.data}))
  }

  handleSearch() {
    this.refresh(this.state.description)
  }

  handleClear() {
    this.refresh()
  }

  handleChange(e) {
    this.setState({...this.state, description: e.target.value })
  }

  handleAdicionar() {
    const description = this.state.description
    axios.post(URL, {description})
      .then(resp => this.refresh())
  }

  handleRemover(todo) {
    axios.delete(`${URL}/${todo._id}`)
      .then(resp => this.refresh(this.state.description))
  }

  handleConcluido(todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(resp => this.refresh(this.state.description))
  }

  handlePendente(todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
    .then(resp => this.refresh(this.state.description))
  }

  render() {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro'></PageHeader>

        <TodoForm 
        description={this.state.description}
        handleChange={this.handleChange}
        handleAdicionar={this.handleAdicionar}
        handleSearch={this.handleSearch}
        handleClear={this.handleClear}
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