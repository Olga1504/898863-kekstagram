const arrComments = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const nameArr = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}
function getRandomArrayValue(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
function newComment(arr) {
  const countQantity = randomInteger(1, 2);
  var resultComment = '';
  for (var i = 0; i < countQantity; ++i) {
    resultComment = resultComment + getRandomArrayValue(arr);
  }
  return resultComment;
}
function newUserComment(i, arrComment) {
  return {
    avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
    name: getRandomArrayValue(nameArr),
    message: newComment(arrComment)
  };
}
function newArrUserComment() {
  const count = randomInteger(1, 10);
  var arr= [];
  for (var i = 0; i < count; ++i) {
    arr[i] = newUserComment(i, arrComments);
  }
  return arr;
}
function newObject(i) {
  return {
    url: 'photos/' + i + '.jpg',
    likes: randomInteger(15, 200),
    comments: newArrUserComment(),
    description: "Это учебный проект по JS"
  };
}

function createArrFoto() {
  var arrFoto =[];
  for (var i = 0; i < 25; i++) {
    arrFoto[i] = newObject(i+1);
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

const arrFotoObject = createArrFoto();
newDOMFoto(arrFotoObject);

document.querySelector('.big-picture').classList.remove('hidden');

//путь к основной фотографии
var big_picture = document.querySelector('.big-picture__img');
big_picture.querySelector('img').src = arrFotoObject[0].url;
//инфо о фото
var social = document.querySelector('.big-picture__social');

const countComments = arrFotoObject[0].comments.length;
social.querySelector('.likes-count').textContent = arrFotoObject[0].likes;
social.querySelector('.comments-count').textContent = countComments;
social.querySelector('.social__caption').textContent = arrFotoObject[0].description;

//комментарии вывод
function newDOMComment (avatar, name, message, fragment, s) {
  newComm = s.cloneNode(true);
  newComm.querySelector('img').src = avatar;
  newComm.querySelector('img').alt = name;
  newComm.querySelector('p.social__text').textContent = message;
  fragment.appendChild(newComm);
}
const arrUserComm = arrFotoObject[0].comments;

var social_comment = document.querySelector('.social__comment');
var listComments =  document.querySelector('.social__comments');

var fragmentComments = document.createDocumentFragment();

for (var i = 0; i < countComments; ++i) {
  newDOMComment(arrUserComm[i].avatar,
                arrUserComm[i].name,
                arrUserComm[i].message,
                fragmentComments,
                social_comment);
}
//удаляем старые комментарии
while( listComments.children.length>0){
  listComments.removeChild(listComments.firstChild );
}
listComments.appendChild(fragmentComments);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
