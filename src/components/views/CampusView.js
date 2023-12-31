/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus} = props;
  // If there is no campus, display a message.
  if (props.campus.id == null) {
    return (
      <div>
        <p>This campus no longer exists.</p>
      </div>
    );
  }

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      {/* Display image from url */}
      <img src={campus.imageUrl} width={500} alt="school"/>
      <br></br>
      {/* Buttons to edit and delete campus */}
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      <br></br>
      <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      <hr></hr>
      
      <h1>List of Students:</h1>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}

      {/* Print out a message if there are no students enrolled */}
      {campus.students.length == 0 ? (
        <div><p>There are no students enrolled at this campus.</p></div>
      ) : ("")}

    </div>
  );
};

export default CampusView;