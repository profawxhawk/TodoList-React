import React, { Component } from 'react';
import './Note.css'
import { AiOutlineEllipsis } from 'react-icons/ai';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
class Checkbox extends Component{
   constructor(){
       super()
       this.ChangeCheck = this.ChangeCheck.bind(this);
   }
   ChangeCheck(){
    this.props.clickhandler()
   }
    render(){
        if(this.props.checked){
            return(
                <div onClick={this.ChangeCheck} className="centered-label" style={{float:"right"}}>
                    <ImCheckboxChecked /><span   onClick={e => {e.stopPropagation()}}style={{margin:"6px"}}>Done</span>
                </div>
                )
        }
        else{
            return(
                <div onClick={this.ChangeCheck} className="centered-label" style={{float:"right"}}>
                    <ImCheckboxUnchecked /><span   onClick={e => {e.stopPropagation()}}style={{margin:"6px"}}>Done</span>
                </div>
                )
        }
        
    }
}
class Note extends Component{
    constructor(){
        super()
        this.state={
            checked:false
        }
        this.toggleCheck = this.toggleCheck.bind(this);
    }
    componentDidMount() {
        this.setState({checked:this.props.checked})
    }
    toggleCheck(){
        let temp=!(this.state.checked)
        this.setState({checked:temp})
    }
    render()
    {
      return (
        <div className="note">
            <div style={{margin:"10px",fontSize:"150%"}}>
                <b>{this.props.title}</b>
                <span style={{float:"right",verticalAlign:"middle"}}>
                    <AiOutlineEllipsis />
                </span>
            </div>
            <div style={{margin:"10px"}}>
                {this.props.text}
            </div>
           
            <span style={{margin:"10px"}}>
                <span className="circle">
                    <svg height="30" width="40"><circle cx="15" cy="15" r="15" fill={this.props.color} /></svg>
                </span>
                <Checkbox clickhandler={this.toggleCheck} checked={this.state.checked} />
            </span>
            </div>
       
        
      )
    }
}
export default Note