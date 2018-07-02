import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';
import Projects from './components/Projects';
import AddProject from './components/AddProject'; 
import Todos from './components/Todos';
import $ from 'jquery';


class App extends Component {
  constructor(){
    super();
    this.state={
      projects: [],
      todos: []
    }
  }

//this is a lifecycle method, they are triggered during certain events.
  componentWillMount(){
    this.getProjects();
    this.getTodos();
  }

  componentDidMount(){
    this.getProjects();
    this.getTodos();
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        })
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    })
  }

  getProjects(){
    this.setState({projects: [
         {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce',
          category: 'Web Development'
        }
        ]
    });
  }

//this is passed to addproject in order to give App access to 
  handleAddProject(project){
    //remember, state is immutable, we cant modify it or mutate it but must instead use setState
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects: projects});
  }

  //this is passed to the Project component and then Project passes a method on to ProjectItem to give App control of ProjectItem deletion
  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index);
    this.setState({projects: projects});

  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects onDelete={this.handleDeleteProject.bind(this)} projects={this.state.projects} />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
