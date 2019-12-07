/*************************************************************************************/
/* Vinyl - My own web music player                                                   */
/* Copyright 2019 Dardan Rrafshi                                                     */
/* Licensed under Apache 2.0 (https://github.com/DonColon/vinyl/blob/master/LICENSE) */
/*************************************************************************************/
import content from './slider.html';
import style from './slider.css';


class VanillaSlider extends HTMLElement
{
	static get observedAttributes() 
	{
		return ['min', 'max', 'step', 'value', 'orientation', 'showRange'];
	}

	constructor()
	{
		super();
		if(!this.shadowRoot) {
			this.attachShadow({mode: 'open'});
			this.shadowRoot.appendChild(template.content.cloneNode(true));

			this.min = Number(this.getAttribute('min')) || 0;
			this.max = Number(this.getAttribute('max')) || 100;
			this.step = Number(this.getAttribute('step')) || 1;
			this.value = Number(this.getAttribute('value')) || 0;
			this.orientation = this.getAttribute('orientation') || 'horizontal';
			this.showRange = (this.getAttribute('showRange') == 'true') ? true : false;
		}
	}

	connectedCallback()
	{
		this.sliderLine = this.shadowRoot.getElementById('slider-line');
		this.sliderRange = this.shadowRoot.getElementById('slider-range');
		this.sliderHandle = this.shadowRoot.getElementById('slider-handle');

		this.slideTo((100 / this.max) * this.value);

		this.addEventListener('mousemove', this.slide.bind(this));
		this.sliderHandle.addEventListener('mousedown', this.startSlide.bind(this));
		this.ownerDocument.addEventListener('mouseup', this.stopSlide.bind(this));
	}

	attributeChangedCallback(name, oldValue, newValue)
	{
		this[name] = newValue;
	}

	disconnectedCallback()
	{
		this.removeEventListener('mousemove', this.slide);
		this.sliderHandle.removeEventListener('mousedown', this.startSlide);
		this.ownerDocument.removeEventListener('mouseup', this.stopSlide);
	}

	slide(event)
	{
		if(this.isSliding) {
			const ratio = (event.pageX - this.sliderLine.offsetLeft) / (this.sliderLine.offsetWidth),
				percentage = ratio.toFixed(2) * 100,
				value = Number(this.max) * ratio + Number(this.min);

			if(percentage >= 0 && percentage < 100) {
				this.slideTo(percentage);
				this.value = value;
			}
		}
	}

	slideTo(percentage)
	{
		this.sliderHandle.style.left = `${percentage}%`;
		if(this.showRange)
			this.sliderRange.style.width = `${percentage}%`;
	}

	startSlide()
	{
		this.isSliding = true;
	}

	stopSlide()
	{
		this.isSliding = false;
	}
}


const template = document.createElement('template');
template.innerHTML = `<style>${style}</style>${content}`;

customElements.define('vanilla-slider', VanillaSlider);
