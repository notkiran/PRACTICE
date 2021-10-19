document.body.innerHTML = `
<div class="user-form">
<input class="add-user-name" placeholder="Add user name"/>
<input class="add-user-avatar" placeholder="Add pic URL" /> 
<button onClick="addUser()" >ADD USER</button>
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
        <div class="user-container">
        <img class="user-avatar" src="${user.avatar}" alt=${user.name}/>
        <div>
        <p class="user-name">${user.name}</p>
        <button onClick="toggleEdit(${user.id})">Edit</button>
        <button onClick="deleteUser(${user.id})">DELETE</button>
        <div class="edit-user-form edit-${user.id}">
        <input class="edit-${user.id}-user-name" value="${user.name}" placeholder="Enter Name"/>
        <input class="edit-${user.id}-user-avatar" value="${user.avatar}" placeholder="Enter Pic URL" />
        <button onClick="editUser(${user.id})">Save</button>
        </div>
        </div>
        </div>
        `;
  });
  console.log(users);
}

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
