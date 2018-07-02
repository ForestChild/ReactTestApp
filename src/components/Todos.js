import React, { Component } from 'react';
import TodoItem from './TodoItem'
import PropTypes from 'prop-types';

class Todos extends Component {

  render() {
  		let todoItems;
	if(this.props.todos){
    //We want to render the array of todos, in order to do that we need to use map to
    //loop through props.todos and create a new array containing each todo formatted
    //as a TodoItem
		todoItems = this.props.todos.map(todo => {
			return (
				<TodoItem key={todo.title} todo={todo} />
			)
		});
	}
    return (
      <div className="Todos">
      	<h3>Latest Todos</h3>
      	{todoItems}
      </div>
    );
  }
}

//This is validation for properties of the Projects component.
  Todos.propTypes = {
  	projects: PropTypes.array
  }

export default Todos;