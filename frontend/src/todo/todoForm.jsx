import React from "react";
import Grid from '../template/grid'
import IconButton from "../template/iconButton";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import changeDescription from './todoActions'

const TodoForm = props => {
  const keyHandler = (e) => {
    if(e.key ==='Enter'){
      e.shiftKey ? props.handleSearch() : props.handleAdicionar()
    }else if(e.key === 'Escape'){
      props.handleClear()
    }
  }

  return (
    <div role='form' className='todoForm'>
      <Grid className='12 9 10'>
        <input 
        id='description' 
        className='form-control' 
        placeholder='Adicione uma tarefa'
        value={props.description}
        onChange={changeDescription}
        onKeyUp={keyHandler}
        /> 
      </Grid>

      <Grid className='3 2'>
        <IconButton 
        style='primary' 
        icon='plus'
        onClick={props.handleAdicionar}
        />
        <IconButton 
        style='info' 
        icon='search'
        onClick={props.handleSearch}
        />
        <IconButton 
        style='light' 
        icon='close'
        onClick={props.handleClear}
        />
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  description: state.todo.description
})
const mapDispatchToProps = dispatch => bindActionCreators({
  changeDescription
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm