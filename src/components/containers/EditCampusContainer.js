/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
//const axios = require('axios');

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      address: "", 
      description: null, 
      imageUrl: null,
      redirect: false, 
      redirectId: null
    };
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    //console.log("mounted");
    //this.props.fetchCampus(this.props.match.params.id);
    //let res = axios.get(`/api/campuses/${this.props.match.params.id}`).then(response => {const currCampus = response.data});  
    //let res = axios.get(`/api/campuses/${this.props.match.params.id}`).then(response => console.log(response.data));  
    //console.log("_______________res stuff");
    //console.log(res);
    //console.log(res.data);
    //console.log(currCampus);
    
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl
    };

    //console.log(campus);
    campus.id = this.props.match.params.id; //set id to the same college id
    campus.students = []; //define students parameter
    //console.log(campus.id);
    //console.log(this.props.)
    // Add new campus in back-end database
    // let newCampus = await this.props.addCampus(campus);

    // Edit campus in back-end database
    await this.props.editCampus(campus);

    //console.log(newCampus);
    //console.log(this.props);

    // Update state, and trigger redirect to show the new campus
    this.setState({
      name: "", 
      address: "", 
      description: null, 
      imageUrl: null,
      redirect: true, 
      redirectId: this.props.match.params.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component and pass original campus data
    return (
      <div>
        <Header />
        <EditCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit} 
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        //addCampus: (campus) => dispatch(addCampusThunk(campus)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(EditCampusContainer);