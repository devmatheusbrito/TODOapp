import React from 'react';
import IconButton from '../template/iconButton'
import { connect } from 'react-redux';

const TodoList = props => {

  const renderRows = () => {
    const list = props.list || []
    return list.map(todo => (
      <tr key={todo._id}>
        <td className={todo.done === true ? 'concluido' : ''}>
          {todo.description}
        </td>
        <td>
          <IconButton
          style='success'
          icon='check'
          hide={todo.done}
          onClick={() => props.handleConcluido(todo)}>
          </IconButton>

          <IconButton 
          style='warning'
          icon='undo'
          hide={!todo.done}
          onClick={() => props.handlePendente(todo)}>
          </IconButton>

          <IconButton 
          style='danger' 
          icon='trash-o'
          onClick={() => props.handleRemover(todo)}>
          </IconButton>
        </td>
      </tr>
    ))
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Descrição</th>
          <th className='tableActions'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
  )
}
  
const mapStateToProps = state => ({
  list: state.todo.list
})

export default connect(mapStateToProps)(TodoList)