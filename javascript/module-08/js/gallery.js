'use strict';

class Gallery {
  constructor(items, parentNode, defaultActiveItem) {
    this.galleryItems = items;
    this.imgFullSize;
    this.previewList;
    this.defaultActiveItem = this.checkDefaultActiveItem(defaultActiveItem);
    this.gallery = this.renderGallery(parentNode);
    this.previewListItems = this.previewList.children;
    this.previewList.addEventListener('click', this.updateFullView.bind(this));
  }

  checkDefaultActiveItem(defaultActiveItem) {
    if (defaultActiveItem > 0 && defaultActiveItem <= galleryItems.length) {
      return defaultActiveItem;
    }
    return 1;
  }

  renderGallery(parentNode) {
    this.imgFullSize = document.createElement('img');
    this.imgFullSize.setAttribute(
      'src',
      this.galleryItems[this.defaultActiveItem - 1].fullview
    );
    this.imgFullSize.setAttribute(
      'alt',
      this.galleryItems[this.defaultActiveItem - 1].alt
    );

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('fullview');
    imgContainer.appendChild(this.imgFullSize);

    this.previewList = document.createElement('ul');
    this.previewList.classList.add('preview');

    const li = document.createElement('li');
    const previewImg = document.createElement('img');
    li.appendChild(previewImg);

    this.galleryItems.forEach(element => {
      this.previewList.appendChild(li.cloneNode(true));
      const imgAttr = this.previewList.lastElementChild.firstElementChild;
      imgAttr.setAttribute('src', element.preview);
      imgAttr.setAttribute('data-fullview', element.fullview);
      imgAttr.setAttribute('alt', element.alt);
    });

    this.previewList.children[
      this.defaultActiveItem - 1
    ].firstChild.classList.add('active');

    parentNode.appendChild(imgContainer);
    parentNode.appendChild(this.previewList);
    return parentNode;
  }

  updateFullView(event) {
    if (event.target.tagName !== 'IMG') {
      return;
    }
    this.imgFullSize.classList.toggle('show');
    this.imgFullSize.classList.add('hide');
    [...this.previewListItems].forEach(el =>
      el.firstChild.classList.remove('active')
    );
    event.target.classList.add('active');
    setTimeout(() => {
      this.imgFullSize.setAttribute('src', event.target.dataset.fullview);
      this.imgFullSize.setAttribute('alt', event.target.alt);
      this.imgFullSize.onload = () => {
        this.imgFullSize.classList.remove('hide');
        this.imgFullSize.classList.add('show');
      };
    }, 200);
  }
}
