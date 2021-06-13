import React, { Component } from 'react';
import NonBoard from './NonBoard'
import axios from 'axios'
import Board from './Board'
class TodoApp extends Component{
  constructor() {
    super();
    this.state = {
        data: [],
        isLoading: false,
    };
    this.addlist=this.addlist.bind(this)
}
async componentDidMount() {
    this.setState({isLoading: true})
    const url="http://127.0.0.1:8000/list"
    const response = await axios.get(url)
    this.setState({ data: response.data["all_list"],isLoading:false})
}
addlist(input){
  let temp=this.state.data
  temp.push(input)
  this.setState({data:temp})
}
    render(){
        return (
          <div>
        <NonBoard listadd={this.addlist}/>
        <div><Board data={this.state.data} isLoading={this.state.isLoading}/></div>
        </div>
      );
    }
}

export default TodoApp;
