import React, { useState } from "react";
import "./App.css";

function App() {

  const [courses, setCourses] = useState([
    {
      id: 1,
      course: "React JS",
      faculty: "Rahul Sir"
    }
  ]);

  const [courseName, setCourseName] = useState("");
  const [faculty, setFaculty] = useState("");

  // Add Course
  const addCourse = () => {

    if(courseName === "" || faculty === "") {
      alert("Please fill all fields");
      return;
    }

    const newCourse = {
      id: courses.length + 1,
      course: courseName,
      faculty: faculty
    };

    setCourses([...courses, newCourse]);

    setCourseName("");
    setFaculty("");
  };

  // Update Course
  const updateCourse = (id) => {

    const updatedName = prompt("Enter updated course name:");

    if(updatedName) {

      const updatedCourses = courses.map((c) =>
        c.id === id ? { ...c, course: updatedName } : c
      );

      setCourses(updatedCourses);
    }
  };

  return (

    <div className="container">

      <h1>Student Course Registration</h1>

      <div className="form-box">

        <input
          type="text"
          placeholder="Enter Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Faculty Name"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        />

        <button onClick={addCourse}>
          Add Course
        </button>

      </div>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Faculty</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {courses.map((c) => (

            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.course}</td>
              <td>{c.faculty}</td>

              <td>
                <button onClick={() => updateCourse(c.id)}>
                  Update
                </button>
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;

 