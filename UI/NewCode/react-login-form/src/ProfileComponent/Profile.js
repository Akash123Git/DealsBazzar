import React, { useState, useEffect } from 'react'
//import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom'
import "./Profile.css";
//import ProfileService from '../Service/ProfileService'
//import * as actions from '../Redux/Action/ProfileAction'
//import User from '../Redux/User'
import store from '../Redux/Store'
import Store from '../Redux/Store'
import UserService from '../Service/UserService'
import {ACTION_USER_UPDATE_TOKEN} from '../Redux/Action/UserAction'
import { ACTION_USER_LOGOUT} from '../Redux/Action/UserAction'
import {ACTION_LOAD_USER_DATA} from '../Redux/Action/UserAction'

var mapStateToProps = state => {
  return {
    user: state.user,
    token: state.user.token
  }
}

class Profile extends React.Component
{
       constructor() {
        super()
        //console.log(this.props.data)
         this.state={
          editStatus:false,
          name:'',
          phone:'',
          address:'',
          email:''
      }
      
      //user:{name:'',phone:'',address:'',email:''}
  } 

    /* componentDidUpdate() {
        this.name.value=this.state.user.name
        this.phone.value=this.state.user.phone
        this.address.value=this.state.user.address
        
    }
 */
    componentDidMount() {
        this.setState({name:this.props.user.userdetails.name,
          email:this.props.user.userdetails.email,
          phone:this.props.user.userdetails.phone,
          address:this.props.user.userdetails.address})
    }
    componentDidUnmount() {
      this.setState({editStatus:false})
    }

    

    updateProfile = (event) => {
        var ob = {
            userId:this.props.user.token,
            name:this.name.value,
            phone:this.phone.value,
            address:this.address.value,
            email:this.email.value
        }
        this.setState({editStatus:false})
        UserService.updateProfile(ob)
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            if(data.statusCode==200){
                alert("User Updated Successfully");
              Store.dispatch({
                  ...ACTION_LOAD_USER_DATA,
                  payload:{userdetails:data.data}
              })
              
          }
        });
        event.preventDefault()
    }


      render()
      {
          if(this.props.user.loginstatus==false)
          {
              return<Navigate to="/"></Navigate>
          }
          return <>
      
<div class="container bootstrap snippets bootdeys">
<div class="row">
  <div class="col-xs-12 col-sm-9">
    <form class="form-horizontal" onSubmit={this.updateProfile}>

    <div class="panel panel-default">

        <div class="panel-heading">
        <h4 class="panel-title">User info</h4>
        </div>

        <div class="panel-body">

          <div class="form-group">
            <label class="col-sm-2 control-label">User Name</label>
            <div class="col-sm-10">
              {this.state.editStatus!=false?
              <input type="text" class="form-control"
              onChange={(event)=>{
                this.setState({name:event.target.value})
              }}
              value={this.state.name} ref={c => this.name = c}></input>
              :<input type="text" class="form-control"
              value={this.state.name} ref={c => this.name = c}></input>}
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">User Email</label>
            <div class="col-sm-10">
            {this.state.editStatus!=false?
              <input type="text" class="form-control"
              onChange={(event)=>{
                this.setState({email:event.target.value})
              }}
              value={this.state.email} ref={c => this.email = c}></input>
              :<input type="text" class="form-control"
              value={this.state.email} ref={c => this.email = c}></input>}
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Mobile number</label>
            <div class="col-sm-10">
            {this.state.editStatus!=false?
              <input type="text" class="form-control"
              onChange={(event)=>{
                this.setState({phone:event.target.value})
              }}
              value={this.state.phone} ref={c => this.phone = c}></input>
              :<input type="text" class="form-control"
              value={this.state.phone} ref={c => this.phone = c}></input>}
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Address</label>
            <div class="col-sm-10">
            {this.state.editStatus!=false?
              <input type="text" class="form-control"
              onChange={(event)=>{
                this.setState({address:event.target.value})
              }}
              value={this.state.address} ref={c => this.address = c}></input>
              :<input type="text" class="form-control"
              value={this.state.address} ref={c => this.address = c}></input>}
            </div>
          </div>

          {this.state.editStatus!=false?
          <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              
              <button type="submit" class="btn btn-primary">UPDATE</button>
            </div>
          </div>
          :<h1></h1>}
        </div>
      </div>
    
    </form>
    {this.state.editStatus==false?
    <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
              
              <button type="submit" class="btn btn-primary" 
              onClick={(event) =>(this.setState({editStatus:true}))} >EDIT</button>
            </div>
    </div>
    :<h1></h1>}
  </div>
</div>
</div>
          </>
    
}
}
export default connect(mapStateToProps)(Profile);