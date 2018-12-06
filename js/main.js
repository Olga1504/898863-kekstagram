/* eslint-disable no-unused-vars */
var ARREY_COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var ARREY_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function getRandomArrayValue(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
function newComment(arr) {
  var countQantity = randomInteger(1, 2);
  var resultComment = '';
  for (var i = 0; i < countQantity; ++i) {
    resultComment = resultComment + getRandomArrayValue(arr);
  }
  return resultComment;
}

function newArrUserComment() {
  var count = randomInteger(1, 10);
  var arr = [];
  for (var i = 0; i < count; ++i) {
    arr[i] = {
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      name: getRandomArrayValue(ARREY_NAMES),
      message: newComment(ARREY_COMMENTS)
    };
  }
  return arr;
}


function createArrFoto() {
  var arrFoto =[];
  for (var i = 0; i < 25; i++) {
    arrFoto[i] = {
      url: 'photos/' + (i+1) + '.jpg',
      likes: randomInteger(15, 200),
      comments: newArrUserComment(),
      description: "Это учебный проект по JS"
    }
  }
  return arrFoto;
}
function newDOMFoto(arrFoto) {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var pictureListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrFoto.length; i++) {
    var newFotoElement = pictureTemplate.cloneNode(true);
    document.querySelector('.big-picture__img').children[0].src = arrFoto[i].url;
    newFotoElement.querySelector('.picture__img').src = arrFoto[i].url;
    newFotoElement.querySelector('.picture__likes').textContent = arrFoto[i].likes;
    newFotoElement.querySelector('.picture__comments').textContent = arrFoto[i].message;
    fragment.appendChild(newFotoElement);
  }
  pictureListElement.appendChild(fragment);
}

function openFoto(arr, i) {
  document.querySelector('.big-picture').classList.remove('hidden');
  var bigPicture = document.querySelector('.big-picture__img');
  bigPicture.querySelector('img').src = arr[i].url;
  var social = document.querySelector('.big-picture__social');
  var countComments = arr[i].comments.length;
  social.querySelector('.likes-count').textContent = arr[i].likes;
  social.querySelector('.comments-count').textContent = countComments;
  social.querySelector('.social__caption').textContent = arr[i].description;
  var arrUserComments = arr[i].comments;

  var socialComment = document.querySelector('.social__comment');
  var listComments = document.querySelector('.social__comments');

  var fragmentComments = document.createDocumentFragment();
  for (var j = 0; j < countComments; ++j) {
    newComm = socialComment.cloneNode(true);
    newComm.querySelector('img').src = arrUserComments[j].avatar;
    newComm.querySelector('img').alt = arrUserComments[j].name;
    newComm.querySelector('p.social__text').textContent = arrUserComments[j].message;
    fragmentComments.appendChild(newComm);
  }
  while (listComments.children.length > 0) {
    listComments.removeChild(listComments.firstChild);
  }
  listComments.appendChild(fragmentComments);
}
function hideCommentCounters() {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
}

var arrFotoObjects = createArrFoto();
newDOMFoto(arrFotoObjects);
openFoto(arrFotoObjects, 0);
hideCommentCounters();


