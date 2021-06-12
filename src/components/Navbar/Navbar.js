import React, { Component } from 'react';
import './Navbar.css'
import { FaPlus } from 'react-icons/fa';
import { TypeObject } from '../Sidebar/Sidebar'
class Modal extends Component{
    constructor(){
        super()
        this.state={
        titleErr:"",
        textErr:"",
        id: "",
        }
        this.submitform = this.submitform.bind(this);
        this.exitmodal = this.exitmodal.bind(this);
        this.setTag = this.exitmodal.bind(this);
    }
    submitform(){
        if(document.getElementById('title').value==="" && document.getElementById('text').value===""){
            this.setState({titleErr:"Please enter a title",textErr:"Please enter a description"})
        }
        else if(document.getElementById('title').value===""){
            this.setState({titleErr:"Please enter a title",textErr:""})
        }
        else if(document.getElementById('text').value===""){
            this.setState({textErr:"Please enter a description",titleErr:""})
        }
        else{
            console.log("valid")
        }
    }
    exitmodal(){
        this.setState({textErr:"",titleErr:""})
        this.props.hidehandler()
    }
    setTag(e){
        e.stopPropagation();
        console.log(this.state.id)
    }
    render(){
        if(this.props.show){
            const inputheaderstyle={
                marginLeft:"5%",padding:"5%"
            }
            let tags =  <p>Loading ...</p>
            if (!this.props.isLoading) {
                tags = this.props.data.map(type => {
                    if(type.id===this.state.id)
                    {
                    return <span onClick={()=>{this.setState({id:type.id})}} style={{cursor:"pointer",backgroundColor:"grey",borderRadius:"10px"}}><TypeObject name={type.name} color={type.color}/></span>
                    }
                    else
                    {
                    return <span onClick={()=>{this.setState({id:type.id})}} style={{cursor:"pointer"}}><TypeObject name={type.name} color={type.color}/></span>
                    }
                    }
                )
            } 
            return(
                <div className="modal-container" onClick={this.exitmodal}>
                    <div className="modal" onClick={e => {e.stopPropagation();}}>
                        <div className="model-flex">
                            <div className="modal-flex-left" onClick={this.exitmodal}>
                                Cancel
                            </div>
                            <div className="modal-flex-right">
                                <button className="btn" onClick={this.submitform}>Add</button>
                            </div>
                        </div>
                        <div style={inputheaderstyle}>
                            <div>
                                Title
                            </div>
                            <input id="title" type="text" placeholder="Enter your title"></input>
                            <p style={{color:"red"}}>{this.state.titleErr}</p>
                        </div>
                        <div style={inputheaderstyle}>
                            <div>
                                Description
                            </div>
                            <input id="text" type="text" placeholder="Enter your text" ></input>
                            <p style={{color:"red"}}>{this.state.textErr}</p>
                        </div>
                        <div style={inputheaderstyle}>
                            <div>
                                Tags
                            </div>
                            <div  className="model-flex">
                                {tags}
                            </div>
                        </div>
                </div>
                </div>
                
            )
        }
        return null
    }
}
class Navbar extends Component{
    constructor(){
        super()
        this.state={
            ModalShow:false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal(){
        this.setState({ModalShow:!this.state.ModalShow})
    }
    render(){
        return(
            <nav className="nav">
                <div className="title">
                    <b>todo</b>
                </div>
                <div className="nav-right title">
                    <FaPlus onClick={this.toggleModal}/>
                </div>
                <Modal show={this.state.ModalShow} hidehandler={this.toggleModal} data={this.props.data} isLoading={this.props.isLoading}/> 
            </nav>
        )
    }
}
export default Navbar;