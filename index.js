import ExclusionHandler from './exclusion-handler'

const exclusionHandler = new ExclusionHandler();

const DARK_THRESHOLD = 128;

const EXCLUDES = [
	'#bluebarRoot', 	// Facebook header
	'.player-poster', 	// Player poster from Zing
	'#_header.header'	// header from tv.zing.vn
];

const ADDITIONAL_CHECK = [
	'header',
	'.header',
	'footer'
];

const BACK_INVERSE_TAGS = 'img, canvas, video, [style*="background-image"]';

class NightPage {
	constructor() {
		this.currentHost = this.getHost();

		if (!this.isExclusiveSupport()) {
			this.invertPage();
			this.backInverse();
			this.setObserver();
		} else {
			this.handleExclusion();
		}
	}

	getHost() {
		return document.location.host.replace('www.', '');
	}

	isExclusiveSupport() {
		return exclusionHandler.isExclusion(this.currentHost);
	}

	invertPage() {
		const bodyStyle = getComputedStyle(document.body);

		if (this._isDark(bodyStyle.backgroundColor)) {
			console.log('Website is already dark');
			return;
		}

		if (parseInt(bodyStyle.height) < window.outerHeight) {
			document.body.style.minHeight = '100vh';
		}

		this._i1(document.documentElement);
		document.body.style.background = 'rgb(230,230,230)'; // gray color
		document.body.style.margin = '0';
		document.documentElement.style.background = 'white';
	}

	backInverse() {
		Array.from(document.querySelectorAll(BACK_INVERSE_TAGS)).forEach(this._i1);

		Array.from(document.querySelectorAll(EXCLUDES.join(','))).forEach(el => {
			this._i1(el);
			Array.from(el.querySelectorAll(BACK_INVERSE_TAGS)).forEach(this._i0);
		});

		Array.from(document.querySelectorAll(ADDITIONAL_CHECK.join(','))).forEach(el => {
			const styles = window.getComputedStyle(el);
			Array.from(el.querySelectorAll(BACK_INVERSE_TAGS)).forEach(this._i0);
			if (styles.backgroundColor && this._isDark(styles.backgroundColor)) {
				this._i1(el);
			}
		});
	}

	setObserver() {
		/*
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.addedNodes && mutation.addedNodes.length) {
					Array.from(mutation.addedNodes).forEach(node => {
						if (node.matches && node.matches('img')) {
							debugger;
							node.style.filter = 'invert(1)';
						}
					});
				}
			});
		});

		observer.observe(document.body, {subtree: true, childList: true});
		*/
	}

	/**
	 * Runs a special rule for this website
	 */
	handleExclusion() {
		exclusionHandler.applyExclusion(this.currentHost);
	}

	_i1(el) {
		el.style.filter = 'invert(1)';
	}

	_i0(el) {
		el.style.filter = 'invert(0)';
	}

	_isDark(styleStr) {
		return styleStr !== 'rgba(0, 0, 0, 0)' && this._getBrightness(styleStr) < DARK_THRESHOLD;
	}

	_getBrightness(rgb) {
		if (typeof rgb === 'string') {
			rgb = this._toRGB(rgb);
		}
		return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	}

	_toRGB(styleStr) {
		const re = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})/i;
		styleStr = styleStr.replace(/\s+/g, '');
		const found = styleStr.match(re);
		if (found && found.length === 4) {
			return {r: found[1], g: found[2], b: found[3]};
		}
		return null;
	}
}

// Run
new NightPage();