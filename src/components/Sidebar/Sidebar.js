import React, { Component } from 'react';
import './Sidebar.css'
export function TypeObject(props) {
    return  (<span style={{margin:"10px"}}>
                <span className="circle">
                    <svg height="30" width="40"><circle cx="15" cy="15" r="15" fill={props.color} /></svg>
                </span>
                <span className="text">
                    {props.name}
                </span>
            </span>)

}
class Sidebar extends Component{
    render(){
        if (this.props.isLoading) {
            return (<p>Loading ...</p>)
        }
        else{
        return(
            <div className="sidebar-parent">
                {this.props.data.map(type => <TypeObject name={type.name} color={type.color}/>)}
            </div>
        )
        }
    }
}
export default Sidebar;