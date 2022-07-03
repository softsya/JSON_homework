const loadUserInfo = async () => {
  const userId = new URL(window.location.href).searchParams.get("userId");

  //container
  const containerEl = document.querySelector('.container');

  if (!userId) {
    //render error message
    const errorEl = document.createElement('div');
    errorEl.classList.add('error-message');
    errorEl.innerText = 'No user id found!';
    containerEl.appendChild(errorEl);
  } else {
    //loading el
    const loadingEl = document.createElement('div');
    loadingEl.classList.add('loading');
    loadingEl.innerText = 'Loading...';
    containerEl.appendChild(loadingEl);

    //fetch user data
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const userData = await userResponse.json();

    //fetch todos
    const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
    const todosData = await todoResponse.json();

    //fetch albums
    const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
    const albumsData = await albumsResponse.json();

    //render user data

    //title
    const titleEl = document.createElement('h1');
    titleEl.classList.add('users-title');
    titleEl.innerText = userData.name;
    containerEl.appendChild(titleEl);

    //user info
    const userWrapEl = document.createElement('article');
    userWrapEl.classList.add('user_wrap');
    const userInfoEl = document.createElement('ul');
    const userAddress = userData.address;
    userInfoEl.innerHTML = `
      <li class="user-info-point"><span>Username: </span>${userData.name}</li>
      <li class="user-info-point"><span>Email: </span> <a href="mailto:${userData.email}">${userData.email}</a></li>
      <li class="user-info-point"><span>Address: </span> <a href="https://www.google.com/maps/search/${userData.address.geo.lat},${userData.address.geo.lng}">
      ${userAddress.street}, ${userAddress.suite}, ${userAddress.city}, ${userAddress.zipcode}</a></li>
      <li class="user-info-point"><span>Phone: </span> <a href="tel:${userData.phone}">${userData.phone}</a></li>
      <li class="user-info-point"><span>Website: </span> <a href="${userData.website}">${userData.website}</a></li>
      <li class="user-info-point"><span>Company: </span> ${userData.company.name}</li>`
    containerEl.appendChild(userInfoEl);

    //todo list
    const todosWrapEl = document.createElement('div');
    todosWrapEl.classList.add('todos_wrap');
    const todosTitleEl = document.createElement('h3');
    todosTitleEl.classList.add('todos_wrap_title');
    todosTitleEl.innerText = 'Todos:';
    todosWrapEl.appendChild(todosTitleEl);

    todosData.forEach(item => {
      const todoWrapEl = document.createElement('div');
      todoWrapEl.classList.add('todo_wrap');
      const todoTitleEl = document.createElement('div');
      todoTitleEl.classList.add('todo_wrap_title');
      if (item.completed) {
        todoWrapEl.classList.add('completed');
      }
      todoTitleEl.innerText = item.title;
      todoWrapEl.appendChild(todoTitleEl);
      todosWrapEl.appendChild(todoWrapEl);
    });
    containerEl.appendChild(todosWrapEl);

    //albums
    const albumsWrapEl = document.createElement('div');
    albumsWrapEl.classList.add('albums_wrap');
    const albumsTitleEl = document.createElement('h3');
    albumsTitleEl.classList.add('albums_wrap_title');
    albumsTitleEl.innerText = 'Albums';
    albumsWrapEl.appendChild(albumsTitleEl);

    albumsData.forEach(item => {
      const albumEl = document.createElement('div');
      albumEl.classList.add('album');
      const albumLink = document.createElement('a');
      albumLink.setAttribute('href', `photos.html?albumId=${item.id}`);
      const albumTitleEl = document.createElement('span');
      albumTitleEl.innerText = item.title;
      albumLink.appendChild(albumTitleEl);
      albumEl.appendChild(albumLink);
      albumsWrapEl.appendChild(albumEl);
    });
      
    containerEl.appendChild(albumsWrapEl);

    // remove loading el
    loadingEl.remove();
  }

};

loadUserInfo();
