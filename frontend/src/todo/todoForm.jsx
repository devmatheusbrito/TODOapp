import React, { Component } from "react";
import Grid from '../template/grid'
import IconButton from "../template/iconButton";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { changeDescription, search } from './todoActions'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.keyHandler = this.keyHandler.bind(this)
  }

  componentWillMount() {
    this.props.search()
  }

  keyHandler(e){
    if(e.key ==='Enter'){
      e.shiftKey ? this.props.handleSearch() : this.props.handleAdicionar()
    }else if(e.key === 'Escape'){
      this.props.handleClear()
    }
  }
  render() {
    <div role='form' className='todoForm'>
        <Grid className='12 9 10'>
          <input 
          id='description' 
          className='form-control' 
          placeholder='Adicione uma tarefa'
          value={this.props.description}
          onChange={this.props.changeDescription}
          onKeyUp={this.keyHandler}
          /> 
        </Grid>

        <Grid className='3 2'>
          <IconButton 
          style='primary' 
          icon='plus'
          onClick={this.props.handleAdicionar}
          />
          <IconButton 
          style='info' 
          icon='search'
          onClick={this.props.handleSearch}
          />
          <IconButton 
          style='light' 
          icon='close'
          onClick={this.props.handleClear}
          />
        </Grid>
      </div>
  }
}

const mapStateToProps = state => ({
  description: state.todo.description
})
const mapDispatchToProps = dispatch => bindActionCreators({
  changeDescription, search
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)