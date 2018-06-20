'use strict';

const body = document.querySelector('body');

const galleryContainer1 = document.createElement('div');
galleryContainer1.textContent = 'MAZAFAKA GALLERY 1';
galleryContainer1.classList.add('image-gallery', 'size-1');
body.insertBefore(galleryContainer1, document.querySelector('script'));
const gallery1 = new Gallery(galleryItems, galleryContainer1, 1);

const galleryContainer2 = document.createElement('div');
galleryContainer2.textContent = 'MAZAFAKA GALLERY 2';
galleryContainer2.classList.add('image-gallery', 'size-2');
body.insertBefore(galleryContainer2, document.querySelector('script'));
const gallery2 = new Gallery(galleryItems, galleryContainer2, 3);

const galleryContainer3 = document.createElement('div');
galleryContainer3.textContent = 'MAZAFAKA GALLERY 3';
galleryContainer3.classList.add('image-gallery', 'size-3');
body.insertBefore(galleryContainer3, document.querySelector('script'));
const gallery3 = new Gallery(galleryItems, galleryContainer3, 5);
