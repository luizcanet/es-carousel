ECMAScript Carousel
===================

Native and Flexible Carousel Module

Installing
----------

Using NPM:

	npm i es-carousel

Usage
-----

This package is intended to be used as an ES6 module. So you can use one of the
loading forms shown below:

### As HTML script tag

	<script href="node_modules/es-carousel/es-carousel.js" type="module" />

### As JavaScript Module

	import Carousel from '../node_modules/es-carousel/es-carousel.js'


Markup and classes required
---------------------------

The carousel element must contain a child element with class name
`carousel__container`. Inside this element must exist an element with
`carousel__wrapper` as class name. And the items must be child items of the
carousel wrapper using class `carousel__item`.

Optionally the carousel can contain elements with `carousel-controls__previous`
and `carousel-controls__next` classes to use in conjunction with the
[enableControls()](https://github.com/luizcanet/es-carousel/wiki/API#enablecontrols)
method.

### Markup Example:

	<div class="carousel">
		<div class="carousel__container">
			<div class="carousel__wrapper">
				<div class="carousel__item"></div>
				<div class="carousel__item"></div>
				<div class="carousel__item"></div>
				<div class="carousel__item"></div>
				<div class="carousel__item"></div>
			</div>
		</div>
		<div class="carousel-controls">
			<button class="carousel-controls__previous"></button>
			<button class="carousel-controls__next"></button>
		</div>
	</div>

More examples can be found at the project page:
[https://luizcanet.github.io/es-carousel/](https://luizcanet.github.io/es-carousel/)

Links
-----
[Project Page](https://luizcanet.github.io/es-carousel/) |
[Wiki Documentation](https://github.com/luizcanet/es-carousel/wiki) |
[API](https://github.com/luizcanet/es-carousel/wiki/API)
