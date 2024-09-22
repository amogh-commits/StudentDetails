const apiUrl = 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students'; 

function submitForm() {
  const rollNumber = document.getElementById('rollNumber').value;
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const email = document.getElementById('email').value;

  const studentData = {
    rollNumber,
    name,
    age,
    email
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('studentForm').reset(); 
      alert("Student Registered Successfully");
      fetchStudents();
    } else {
      console.error('Failed to register student.');
    }
  })
  .catch(error => console.error('Error:', error));

  return false; 
}

function fetchStudents() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const studentTable = document.getElementById('studentTable');
      studentTable.innerHTML = ''; 

      data.forEach((student, index) => {
        const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td><button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Delete</button></td>
          </tr>
        `;
        studentTable.innerHTML += row;
      });
    })
    .catch(error => console.error('Error:', error));
}

function deleteStudent(id) {
  console.log(id);  
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (response.ok) {
      fetchStudents(); 
    } else {
      console.error('Failed to delete student.');
    }
  })
  .catch(error => console.error('Error deleting student:', error));
}

window.onload = fetchStudents;
