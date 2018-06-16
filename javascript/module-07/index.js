'use strict';

const posts = [
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    stats: {
      likes: 6,
      dislikes: 2,
      fav: 3
    }
  },
  {
    img: 'https://placeimg.com/400/150/nature',
    title: 'Post title 2',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    stats: {
      likes: 124,
      dislikes: 8,
      fav: 36
    }
  },
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 3',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    stats: {
      likes: 800,
      dislikes: 36,
      fav: 147
    }
  }
];

function createCards(posts) {
  const arrDOM = [];
  posts.forEach(element => arrDOM.push(createPostCard(element)));
  return arrDOM;
}

function createPostCard(data) {
  const post = document.createElement('div');
  post.classList.add('post');

  const postImage = document.createElement('img');
  postImage.classList.add('post__image');
  postImage.setAttribute('src', data.img);

  const postTitle = document.createElement('h2');
  postTitle.classList.add('post__title');
  postTitle.textContent = data.title;

  const postText = document.createElement('p');
  postText.classList.add('post__text');
  postText.textContent = data.text;

  const postActions = document.createElement('ul');
  postActions.classList.add('actions', 'post__actions');

  const actionItem1 = document.createElement('li');
  actionItem1.classList.add('actions__item');
  const actionItem2 = actionItem1.cloneNode(false);
  const actionItem3 = actionItem1.cloneNode(false);

  const actionButton1 = document.createElement('button');
  actionButton1.classList.add('actions__btn');
  const actionButton2 = actionButton1.cloneNode(false);
  const actionButton3 = actionButton1.cloneNode(false);

  const actionIcon1 = document.createElement('span');
  actionIcon1.classList.add('actions__icon', 'actions__icon--like');
  const actionIcon2 = document.createElement('span');
  actionIcon2.classList.add('actions__icon', 'actions__icon--dislike');
  const actionIcon3 = document.createElement('span');
  actionIcon3.classList.add('actions__icon', 'actions__icon--fav');

  const actionCount1 = document.createElement('span');
  actionCount1.classList.add('actions__count');
  const actionCount2 = actionCount1.cloneNode(false);
  const actionCount3 = actionCount1.cloneNode(false);

  actionCount1.textContent = data.stats.likes;
  actionCount2.textContent = data.stats.dislikes;
  actionCount3.textContent = data.stats.fav;

  actionButton1.appendChild(actionIcon1);
  actionButton1.appendChild(actionCount1);
  actionButton2.appendChild(actionIcon2);
  actionButton2.appendChild(actionCount2);
  actionButton3.appendChild(actionIcon3);
  actionButton3.appendChild(actionCount3);

  actionItem1.appendChild(actionButton1);
  actionItem2.appendChild(actionButton2);
  actionItem3.appendChild(actionButton3);

  postActions.appendChild(actionItem1);
  postActions.appendChild(actionItem2);
  postActions.appendChild(actionItem3);

  post.appendChild(postImage);
  post.appendChild(postTitle);
  post.appendChild(postText);
  post.appendChild(postActions);

  return post;
}

const postsContainer = document.querySelector('.postsContainer');
createCards(posts).forEach(el => postsContainer.appendChild(el));
