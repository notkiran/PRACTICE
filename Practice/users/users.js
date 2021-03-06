document.body.innerHTML = `
<div class="col-md-6 col-md-4 user-form" align="center">
<i class="fas fa-user"></i> <input type="text" class="add-user-name" placeholder="Add User Name"/>
<i class="fas fa-link"></i> <input type="text" class="add-user-avatar" placeholder="Add Pic URL" /> 
<button class="btn btn-success" onClick="addUser()" ><i class="fas fa-user-plus"></i> ADD USER</button>
</div>
<section class="user-list"></section>`;

async function getAllUsers() {
  const data = await fetch(
    "https://6166c4dc13aa1d00170a66ff.mockapi.io/users",
    { method: "GET" }
  );
  const users = await data.json();

  const userContainer = document.querySelector(".user-list");

  userContainer.innerHTML = "";

  users.forEach((user) => {
    userContainer.innerHTML += `
        <div class="col-md-6 col-md-4 user-container" align="center">
        <img class="user-avatar" src="${user.avatar}" alt=${user.name}/>
        <div>
        <p class="user-name">${user.name}</p>
        <button class="btn btn-primary" onClick="toggleEdit(${user.id})"><i class="fas fa-user-edit"></i> Edit</button>
        <button class="btn btn-primary" onClick="deleteUser(${user.id})"><i class="fas fa-user-times"></i> DELETE</button>
        <div class="edit-user-form edit-${user.id}">
        <div class="form-floating">
        <input type="text" class="edit-${user.id}-user-name form-control" id="edit-${user.id}-user-name" placeholder="Enter Name" value="${user.name}">
        <label for="floatingInputValue">Enter Name</label>
        </div>
        <div class="form-floating">
        <input type="text" class="edit-${user.id}-user-avatar form-control" id="edit-${user.id}-user-avatar" placeholder="Enter Pic URL" value="${user.avatar}">
        <label for="floatingInputValue">Enter Pic URL</label>
        </div>
        <button class="btn btn-success" onClick="editUser(${user.id})"><i class="far fa-save"></i> Save</button>
        </div>
        </div>
        </div>
        `;
  });
  console.log(users);
}

// <input type="text" class="edit-${user.id}-user-name form-control" value="${user.name}" placeholder="Enter Name"/>
// <input type="text" class="edit-${user.id}-user-avatar form-control" value="${user.avatar}" placeholder="Enter Pic URL" />

getAllUsers();

async function deleteUser(userId) {
  const data = await fetch(
    "https://6166c4dc13aa1d00170a66ff.mockapi.io/users/" + userId,
    { method: "DELETE" }
  );
  getAllUsers();
}

async function addUser() {
  const name = document.querySelector(".add-user-name").value;
  const avatar = document.querySelector(".add-user-avatar").value;
  const data = await fetch(
    "https://6166c4dc13aa1d00170a66ff.mockapi.io/users/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, avatar: avatar }),
    }
  );

  getAllUsers();
}

function toggleEdit(userId) {
  const editUserForm = document.querySelector(`.edit-${userId}`);
  editUserForm.style.display =
    editUserForm.style.display === "block" ? "none" : "block";
}

async function editUser(userId) {
  const name = document.querySelector(`.edit-${userId}-user-name`).value;
  const avatar = document.querySelector(`.edit-${userId}-user-avatar`).value;
  const data = await fetch(
    "https://6166c4dc13aa1d00170a66ff.mockapi.io/users/" + userId,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, avatar: avatar }),
    }
  );

  getAllUsers();
}
