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
      
      {/* Print out a message if there are no students enrolled */}
      {campus.students.length == 0 ? (
        <div><p>There are no students enrolled at this campus.</p></div>
      ) : ("")}
      
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

      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      <br></br>
      <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      
    </div>
  );
};

export default CampusView;