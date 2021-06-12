import './App.css';
import React, { Component } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar'
class NonBoard extends Component{
  constructor() {
    super();
    this.state = {
        data: [],
        isLoading: false,
    };
}
async componentDidMount() {
    this.setState({isLoading: true})
    const url="http://127.0.0.1:8000/type"
    const response = await axios.get(url)
    this.setState({ data: response.data["all_type"],isLoading:false})
}
render()
{
  return (
    <div style={{marginLeft:"5%"}}>
      <Navbar isLoading={this.state.isLoading} data={this.state.data}/>
      <Sidebar isLoading={this.state.isLoading} data={this.state.data}/>
    </div>
    
  )
}
}

function App() {
  return (
    <NonBoard />
  );
}
export default App;
