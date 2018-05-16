'use strict';

const initialUsers = [
  {
    id: '-s19a6hqce',
    login: 'mangozedog@mail.com',
    password: 'qwe123zv',
    isActive: true
  },
  {
    id: '-qkpzenjxe',
    login: 'polysweet@skynet.ze',
    password: '123zxc78',
    isActive: true
  },
  {
    id: '-e51cpd4di',
    login: 'ajax2k@change.ua',
    password: 'ert234qw',
    isActive: false
  }
];

const initialPosts = {
  '-s19a6hqce': [
    { id: '-5sgljaskg', text: 'post #1', likes: 3 },
    { id: '-199hb6igr', text: 'post #2', likes: 5 },
    { id: '-hy0eyw5qo', text: 'post #3', likes: 13 }
  ],
  '-qkpzenjxe': [
    { id: '-5tu69g5rf', text: 'post #1', likes: 8 },
    { id: '-bje766393', text: 'post #2', likes: 15 }
  ],
  '-e51cpd4di': [
    { id: '-9y6nkmlj4', text: 'post #1', likes: 18 },
    { id: '-i03pbhy3s', text: 'post #2', likes: 45 }
  ]
};

function SocialBook(users = [], posts = {}) {
  this.users = users;
  this.posts = posts;

  this.getId = function() {
    return (
      '-' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  this.getAllUsers = function() {
    return this.users.map(user => user.id);
  };

  this.getUserByLogin = function(login) {
    const user = this.users.find(user => user.login === login);
    if (user) {
      return user;
    }
    alert('Такого юзера нет !');
  };

  this.getUserStatus = function(userId) {
    let idx = 0;
    const user = this.users.find((users, index) => {
      if (users.id === userId) {
        idx = index;
        return true;
      }
      return false;
    });
    if (user) {
      alert(idx);
      return user.isActive ? 'active' : 'inactive';
    }
    alert('Такого юзера нет !');
  };

  this.addUser = function(user) {
    if (this.users.find(users => users.login === user.login)) {
      alert('Юзер с таким логином уже есть!');
      return;
    }
    user.id = this.getId();
    user.isActive = false;
    this.users.push(user);
  };

  this.removeUserById = function(userId) {
    const idx = this.users.indexOf(
      this.users.find(users => users.id === userId)
    );
    if (idx >= 0) {
      this.users.splice(idx, 1);
      return;
    }
    alert('Такого юзера нет !');
  };

  this.getUserCount = function() {
    return this.users.length;
  };

  //----------- Доп.задания-----------//

  this.getUserPosts = function(userId) {
    if (!(userId in this.posts)) {
      alert('Такого юзера нет !');
      return;
    }
    return this.posts[userId].map(user => user.text);
  };

  this.addPost = function(userId, post) {
    const newPost = {};
    newPost.id = this.getId();
    newPost.text = post;
    newPost.likes = 0;
    this.posts[userId].push(newPost);
  };

  this.removePost = function(userId, postId) {
    if (!(userId in this.posts)) {
      alert('Такого юзера нет !');
      return;
    }
    let idx = -1; //.filter для слабаков
    this.posts[userId].find((post, index) => {
      if (post.id === postId) {
        idx = index;
        return true;
      }
      return false;
    });
    if (idx >= 0) {
      this.posts[userId].splice(idx, 1);
      return;
    }
    alert('Такого поста нет !');
  };

  this.getAllLikes = function(userId) {
    if (!(userId in this.posts)) {
      alert('Такого юзера нет !');
      return;
    }
    return this.posts[userId].reduce((acc, post) => acc + post.likes, 0);
  };

  this.addPostLike = function(userId, postId) {
    if (!(userId in this.posts)) {
      alert('Такого юзера нет !');
      return;
    }
    const post = this.posts[userId].find(post => post.id === postId);
    if (post) {
      post.likes += 1;
      return;
    }
    alert('Такого поста нет !');
  };

  this.getPostsCount = function(userId) {
    if (!(userId in this.posts)) {
      alert('Такого юзера нет !');
      return;
    }
    return this.posts[userId].length;
  };
}

const socialBook = new SocialBook(initialUsers, initialPosts);

const mockUser = {
  login: 'jax2k@change.ua',
  password: 'zxc345rfd'
};

//console.log(socialBook.getAllUsers());
//console.log(socialBook.getUserByLogin('polysweet@skynet.ze'));
//console.log(socialBook.getUserStatus('-qkpzenjxe'));
//console.log(socialBook.addUser(mockUser), socialBook.users);
//console.log(socialBook.removeUserById('-e51cpd4di'));
//console.log(socialBook.getUserCount());

//--------Доп. задания---------//

//console.log(socialBook.getUserPosts('-s19a6hqce'));
//console.log(socialBook.addPost('-s19a6hqce', 'Added New Post'));
//console.log(socialBook.removePost('-s19a6hqce', '-199hb6igr'));
//console.log(socialBook.getAllLikes('-e51cpd4di'));
//console.log(socialBook.addPostLike('-e51cpd4di', '-i03pbhy3s'));
//console.log(socialBook.getPostsCount('s19a6hqce'));

//console.log(socialBook);
