/*************************************************************************************/
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
import content from './slider.html';
import style from './slider.css';


class Slider extends HTMLElement
{
    static get observedAttributes()
    {
        return ['min', 'max', 'step', 'value', 'orientation'];
    }

    constructor()
    {
        super();
    }

    connectedCallback()
    {
        if(!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.sliderRange = this.shadowRoot.getElementById('slider-range');
            this.sliderHandle = this.shadowRoot.getElementById('slider-handle');

            this.min = this.getAttribute('min') || 0;
            this.max = this.getAttribute('max') || 100;
            this.step = this.getAttribute('step') || 1;
            this.value = this.getAttribute('value') || 0;
            this.orientation = this.getAttribute('orientation') || 'horizontal';

            this.classList.add(`slider-${this.orientation}`);
            this.addEventListener('mousedown', this.startSlide, false);
            this.addEventListener('mouseup', this.stopSlide, false);
        }
    }

    attributeChangedCallback(name, oldValue, newValue)
    {
        this[name] = newValue;
    }

    startSlide(event)
    {
        const percentage = ((((event.clientX - this.offsetLeft) / this.offsetWidth)).toFixed(2));
        this.addEventListener('mousemove', this.moveSlide, false);
        this.sliderRange.style.width = (percentage * 100) + '%';
        this.sliderHandle.style.left = (percentage * 100) + '%';
    }

    stopSlide(event)
    {
        const percentage = ((((event.clientX - this.offsetLeft) / this.offsetWidth)).toFixed(2));
        this.removeEventListener('mousemove', this.moveSlide, false);
        this.sliderRange.style.width = (percentage * 100) + '%';
        this.sliderHandle.style.left = (percentage * 100) + '%';
    }

    moveSlide(event)
    {
        const percentage = ((((event.clientX - this.offsetLeft) / this.offsetWidth)).toFixed(2));
        this.sliderRange.style.width = (percentage * 100) + '%';
        this.sliderHandle.style.left = (percentage * 100) + '%';
    }
}


const template = document.createElement('template');
template.innerHTML = `<style>${style}</style>${content}`;

customElements.define('vanilla-slider', Slider);
