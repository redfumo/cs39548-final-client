/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  // If the student has been deleted, display a message.
  /*
  if (student == null) {
    return (
      <div>
        <p>This student has been deleted.</p>
      </div>
    );
  } */
  
  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
   
      {/* Prints out message if the student is not enrolled anywhere */}
      {student.campusId == null ? (
        <div><h3>This student is not enrolled at any campus.</h3></div>
      ) : (
      <Link to={`/campus/${student.campusId}`}>
        <h3>{student.campus.name}</h3>
      </Link>
      )
      }

      {/*Redirect to the list of all students after deleting a student*/}
      <Link to={`/students`}>
        <button onClick={() => deleteStudent(student.id)}>Delete Student</button>
      </Link>

    </div>
  );
};

export default StudentView;