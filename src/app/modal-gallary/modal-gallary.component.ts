import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal-gallary',
  templateUrl: './modal-gallary.component.html',
  styleUrls: ['./modal-gallary.component.scss'],
})
export class ModalGalleryComponent implements OnInit {
  constructor() {}

  imgs: any[] = [
    {
      id: 1,
      src: '../../assets/img/first.jpg',
    },
    {
      id: 2,
      src: '../../assets/img/second.jpg',
    },
    {
      id: 3,
      src: '../../assets/img/third.jpg',
    },
    {
      id: 3,
      src: '../../assets/img/fifth.jpg',
    },
  ];

  imageCount= this.imgs.length;

  ngOnInit(): void {}

  openModal() {
    document.getElementById('myModal').style.display = 'block';
  }

  closeModal() {
    document.getElementById('myModal').style.display = 'none';
  }

  slideIndex = 1;
  // showSlides(slideIndex);

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n) {
    this.showSlides((this.slideIndex += n));
  }

  // @ViewChild('caption') caption:ElementRef;
  // @ViewChild('mySlides') mySlides:ElementRef;
  // @ViewChild('demo') demo:ElementRef;
  showSlides(n) {
    let i;
    let slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName('demo') as HTMLCollectionOf<
      HTMLElement
    >;
    // let slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    // let dots = document.getElementsByClassName('demo') as HTMLCollectionOf<HTMLElement>;
    let captionText = document.querySelector('#caption') as HTMLElement;
    // let captionText = this.caption.nativeElement.innerHTML;
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
    // captionText = dots[this.slideIndex - 1].alt;
  }
}
