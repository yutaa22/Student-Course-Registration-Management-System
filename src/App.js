import React, { useState, useEffect } from "react";
import "./App.css";
import supabase from "./supabase";

function App() {

  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("id", { ascending: true });

  if (!error) {
    setCourses(data);
  }
}

  async function saveCourse() {

    if (courseName === "" || faculty === "") {
      alert("Please fill all fields");
      return;
    }

    if (editId) {

      const { error } = await supabase
        .from("courses")
        .update({
          course: courseName,
          faculty: faculty
        })
        .eq("id", editId);

      if (!error) {
        fetchCourses();
        setCourseName("");
        setFaculty("");
        setEditId(null);
      }

    } else {

      const { error } = await supabase
        .from("courses")
        .insert([
          {
            course: courseName,
            faculty: faculty
          }
        ]);

      if (!error) {
        fetchCourses();
        setCourseName("");
        setFaculty("");
      }
    }
  }

  function editCourse(course) {
    setCourseName(course.course);
    setFaculty(course.faculty);
    setEditId(course.id);
  }

  async function deleteCourse(id) {

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchCourses();
    }
  }

  return (
    <div className="container">

      <h1>Student Course Registration</h1>

      <h3>Total Courses: {courses.length}</h3>

      <div className="form-box">

        <input
          type="text"
          placeholder="Enter Course Name"
          value={courseName}
          onChange={(e) =>
            setCourseName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Enter Faculty Name"
          value={faculty}
          onChange={(e) =>
            setFaculty(e.target.value)
          }
        />

        <button onClick={saveCourse}>
          {editId ? "Save Changes" : "Add Course"}
        </button>

        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setCourseName("");
              setFaculty("");
            }}
          >
            Cancel
          </button>
        )}

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

                <button
                  onClick={() => editCourse(c)}
                >
                  Update
                </button>

                <button
                  onClick={() =>
                    deleteCourse(c.id)
                  }
                >
                  Delete
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