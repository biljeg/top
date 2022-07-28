import { createGlobalStyle } from "styled-components/macro"

const GlobalStyle = createGlobalStyle`
/* Box sizing rules */
*,
*::before,
*::after {
	box-sizing: border-box;
}

a:not([class]) {
	text-decoration-skip-ink: auto;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
h5,
p {
	margin: 0;
}
html{
	margin: 0;
	padding: 0;
	font-size: 62.5%;  
}


/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */

/* Set core root defaults */
html:focus-within {
	scroll-behavior: smooth;
}

body {
	text-rendering: optimizeSpeed;
	position: relative;
	font-family: "Inter", sans-serif;
	width: 100%;
	background-color: ${props => props.theme.colors.white};
}

/* Make images easier to work with */
img,
picture {
	max-width: 100%;
	max-height: 100%;
	display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
	font-family: inherit;
}

a {
	color: inherit;
	text-decoration: inherit; /* no underline */
}

ul,
ol {
	list-style: none;
	padding: 0;
}

/* Accessability */
@media (prefers-reduced-motion: reduce) {
	html:focus-within {
		scroll-behavior: auto;
	}
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}

//CUSTOM STYLES

.swiper-button-disabled {
	opacity: 0.5;
		&:hover{
		cursor: auto;
	}
}

.swiper-hero-next {
	display: flex;
	align-items: center;
	position: absolute;
	height: 100%;
	top: 0;
	right: 0px;
	padding: 0 6px;
	z-index: 1;
	@media(max-width: ${props => props.theme.breakpoints.tablet}) {
		display: none;
	}
}

.swiper-hero-prev {
	display: flex;
	align-items: center;
	position: absolute;
	height: 100%;
	top: 0;
	padding: 0 6px;
	z-index: 1;
    @media(max-width: ${props => props.theme.breakpoints.tablet}) {
	  display:none;
    }
}

.swiper-hero-prev::after {
  display: none;
}
.swiper-hero-next::after {
	display: none;
}


.swiper-product-prev, .swiper-product-next {
	display: flex;
	align-items: center;
	width: 22px;
	height: 100%;
	z-index: 1;
	position: absolute;
	top: 0;
	&:hover{
		cursor:pointer;
	}
  	@media(max-width: ${props => props.theme.breakpoints.tablet}) {
		display:none;
  	}
}

.swiper-product-next {
	right: 1px;
}

.swiper-product-prev::after {
  display: none;
}
.swiper-product-next::after {
	display: none;
}	

.swiper-slide-product {
	width: 170px;
	@media(min-width:${props => props.theme.breakpoints.tablet}){
		width: 180px;
	}
	@media(min-width:${props => props.theme.breakpoints.desktop}){
		width: 190px;
	}
}

`

export default GlobalStyle
