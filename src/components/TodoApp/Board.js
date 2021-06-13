import React, { Component } from 'react';
import Note from '../Note/Note'
class Board extends Component{
   
    render()
    {
        if (this.props.isLoading) {
            return (<p>Loading ...</p>)
        }
        else{
      return (
        <div style={{marginLeft:"5%",display:"flex",justifyContent:"flex-start"}}>
            {this.props.data.map(type => <Note title={type.title} color={type.partOf[0]} checked={type.done} text={type.text}/>)}
        </div>
        
      )
    }
    }
}
export default Board