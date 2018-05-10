const SUPPORTED_HOSTS = {
	'm.youtube.com': {
		css: require('./css/m.youtube.com.css')
	},
	'm.kenh14.vn': {
		css: require('./css/m.kenh14.vn.css')
	},
	'm.facebook.com': {
		css: require('./css/m.facebook.com.css')
	},
	'news.zing.vn': {
		css: require('./css/news.zing.vn.css')
	}
};


export default class ExclusionHandler{
	isExclusion(host) {
		return !!SUPPORTED_HOSTS[host];
	}

	applyExclusion(host) {
		const rule = SUPPORTED_HOSTS[host];

		if(rule.css) {
			this.applyCSSRule(rule.css);
		}
	}

	applyCSSRule(css) {
		const style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}