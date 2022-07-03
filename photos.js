const loadPhotos = async () => {
  const albumId = new URL(window.location.href).searchParams.get("albumId");

  //container
  const containerEl = document.querySelector('.container');

  if (!albumId) {
    //render error message
    const errorEl = document.createElement('div');
    errorEl.classList.add('error-message');
    errorEl.innerText = 'No album id found!';
    containerEl.appendChild(errorEl);
  } else {
    //loading el
    const loadingEl = document.createElement('div');
    loadingEl.classList.add('loading');
    loadingEl.innerText = 'Loading...';
    containerEl.appendChild(loadingEl);

    //fetch album data
    const albumResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    const albumData = await albumResponse.json();

    //render user data

    //title
    const titleEl = document.createElement('h1');
    titleEl.classList.add('photos-title');
    titleEl.innerText = 'Photos';
    containerEl.appendChild(titleEl);

    //photos
    const photosWrapEl = document.createElement('div');
    photosWrapEl.classList.add('photos_wrap');

    albumData.forEach(item => {
      const photoWrapEl = document.createElement('div');
      photoWrapEl.classList.add('photo_wrap');
      const photoTitleEl = document.createElement('p');
      photoTitleEl.classList.add('photo_title');
      photoTitleEl.innerText = item.title;
      const photo = document.createElement('img');
      photo.src = item.url;
      photo.classList.add('photo');
      photoWrapEl.append(photo, photoTitleEl);
      photosWrapEl.appendChild(photoWrapEl);
    });

    containerEl.appendChild(photosWrapEl);

    //remove loading el
    loadingEl.remove();
  }

};

loadPhotos();
