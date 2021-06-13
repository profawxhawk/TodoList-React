import React, { Component } from 'react';
import './Navbar.css'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa';
import { TypeObject } from '../Sidebar/Sidebar'
class Modal extends Component{
    constructor(){
        super()
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state={
        titleErr:"",
        textErr:"",
        typeErr:"",
        id: "",
        currentDate: date,
        }
        this.submitform = this.submitform.bind(this);
        this.exitmodal = this.exitmodal.bind(this);
    }
    async submitform(){
        let temptitleErr=""
        let temptextErr=""
        let temptypeErr=""
        let flag=0
        if(document.getElementById('title').value===""){
            temptitleErr="Please enter a title"
            flag=1
        }
        if(document.getElementById('text').value===""){
            temptextErr="Please enter a text"
            flag=1
        }
        if(this.state.id===""){
            temptypeErr="Please select a type"
            flag=1
        }
        if(flag){
            this.setState({textErr:temptextErr,titleErr:temptitleErr,typeErr:temptypeErr})
        }
        else{
            const url="http://127.0.0.1:8000/list"
            let data= {"createdAt":this.state.currentDate,"dueBy":this.state.currentDate,"title":document.getElementById('title').value,"text":document.getElementById('text').value,"done":false,"partOf":[this.state.id]}
            const response = await axios.post(url,data)
            this.props.listadd(data)
            this.exitmodal()
        }
    }
    exitmodal(){
        this.setState({textErr:"",titleErr:"",typeErr:""})
        this.props.hidehandler()
    }
    render(){
        if(this.props.show){
            const inputheaderstyle={
                marginLeft:"5%",padding:"5%"
            }
            let tags =  <p>Loading ...</p>
            if (!this.props.isLoading) {
                tags = this.props.data.map(type => {
                    if(type.color===this.state.id)
                    {
                    return <span onClick={()=>{this.setState({id:""})}} style={{cursor:"pointer",backgroundColor:"grey",borderRadius:"10px"}}><TypeObject name={type.name} color={type.color}/></span>
                    }
                    else
                    {
                    return <span onClick={()=>{this.setState({id:type.color})}} style={{cursor:"pointer"}}><TypeObject name={type.name} color={type.color}/></span>
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
                            <p style={{color:"red"}}>{this.state.typeErr}</p>
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
                <Modal  listadd={this.props.listadd} show={this.state.ModalShow} hidehandler={this.toggleModal} data={this.props.data} isLoading={this.props.isLoading}/> 
            </nav>
        )
    }
}
export default Navbar;