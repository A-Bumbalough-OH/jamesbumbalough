!function(t){function r(t){t=t||{},this.settings=t,null==t.statusInterval&&(t.statusInterval=5e3),null==t.loggingDelay&&(t.loggingDelay=2e4),null==t.noProgressTimeout&&(t.noProgressTimeout=1/0);var r,s=[],n=[],o=Date.now(),a={QUEUED:0,WAITING:1,LOADED:2,ERROR:3,TIMEOUT:4},i=function(t){return null==t?[]:Array.isArray(t)?t:[t]};this.add=function(t){t.tags=new e(t.tags),null==t.priority&&(t.priority=1/0),s.push({resource:t,status:a.QUEUED})},this.addProgressListener=function(t,r){n.push({callback:t,tags:new e(r)})},this.addCompletionListener=function(t,r){n.push({tags:new e(r),callback:function(r){r.completedCount===r.totalCount&&t(r)}})};var u=function(t){t=i(t);var r=function(r){for(var e=r.resource,s=1/0,n=0;n<e.tags.length;n++)for(var o=0;o<Math.min(t.length,s)&&!(e.tags.all[n]===t[o]&&s>o&&(s=o,0===s))&&0!==s;o++);return s};return function(t,e){var s=r(t),n=r(e);return n>s?-1:s>n?1:t.priority<e.priority?-1:t.priority>e.priority?1:0}};this.start=function(t){r=Date.now();var e=u(t);s.sort(e);for(var n=0,o=s.length;o>n;n++){var i=s[n];i.status=a.WAITING,i.resource.start(this)}setTimeout(l,100)};var l=function(){for(var r=!1,e=Date.now()-o,n=e>=t.noProgressTimeout,i=e>=t.loggingDelay,u=0,c=s.length;c>u;u++){var h=s[u];h.status===a.WAITING&&(h.resource.checkStatus&&h.resource.checkStatus(),h.status===a.WAITING&&(n?h.resource.onTimeout():r=!0))}i&&r&&g(),r&&setTimeout(l,t.statusInterval)};this.isBusy=function(){for(var t=0,r=s.length;r>t;t++)if(s[t].status===a.QUEUED||s[t].status===a.WAITING)return!0;return!1};var c=function(t,r){var e,i,u,l,c,g=null;for(e=0,i=s.length;i>e;e++)if(s[e].resource===t){g=s[e];break}if(null!=g&&g.status===a.WAITING)for(g.status=r,o=Date.now(),u=t.tags.length,e=0,i=n.length;i>e;e++)l=n[e],c=0===l.tags.length?!0:t.tags.intersects(l.tags),c&&h(g,l)};this.onLoad=function(t){c(t,a.LOADED)},this.onError=function(t){c(t,a.ERROR)},this.onTimeout=function(t){c(t,a.TIMEOUT)};var h=function(t,r){var e,n,o,i,u=0,l=0;for(e=0,n=s.length;n>e;e++)o=s[e],i=!1,i=0===r.tags.length?!0:o.resource.tags.intersects(r.tags),i&&(l++,(o.status===a.LOADED||o.status===a.ERROR||o.status===a.TIMEOUT)&&u++);r.callback({resource:t.resource,loaded:t.status===a.LOADED,error:t.status===a.ERROR,timeout:t.status===a.TIMEOUT,completedCount:u,totalCount:l})},g=this.log=function(t){if(window.console){var e=Math.round((Date.now()-r)/1e3);window.console.log("PxLoader elapsed: "+e+" sec");for(var n=0,o=s.length;o>n;n++){var i=s[n];if(t||i.status===a.WAITING){var u="PxLoader: #"+n+" "+i.resource.getName();switch(i.status){case a.QUEUED:u+=" (Not Started)";break;case a.WAITING:u+=" (Waiting)";break;case a.LOADED:u+=" (Loaded)";break;case a.ERROR:u+=" (Error)";break;case a.TIMEOUT:u+=" (Timeout)"}i.resource.tags.length>0&&(u+=" Tags: ["+i.resource.tags.all.join(",")+"]"),window.console.log(u)}}}}}function e(t){if(this.all=[],this.first=null,this.length=0,this.lookup={},t){if(Array.isArray(t))this.all=t.slice(0);else if("object"==typeof t)for(var r in t)t.hasOwnProperty(r)&&this.all.push(r);else this.all.push(t);this.length=this.all.length,this.length>0&&(this.first=this.all[0]);for(var e=0;e<this.length;e++)this.lookup[this.all[e]]=!0}}e.prototype.intersects=function(t){if(0===this.length||0===t.length)return!1;if(1===this.length&&1===t.length)return this.first===t.first;if(t.length<this.length)return t.intersects(this);for(var r in this.lookup)if(t.lookup[r])return!0;return!1},"function"==typeof define&&define.amd&&define("PxLoader",[],function(){return r}),t.PxLoader=r}(this),Date.now||(Date.now=function(){return(new Date).getTime()}),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)});
function PxLoaderImage(n,e,t){var i=this,o=null;this.img=new Image,this.tags=e,this.priority=t;var a=function(){"complete"===i.img.readyState&&(m(),o.onLoad(i))},r=function(){m(),o.onLoad(i)},d=function(){m(),o.onError(i)},m=function(){i.unbind("load",r),i.unbind("readystatechange",a),i.unbind("error",d)};this.start=function(e){o=e,i.bind("load",r),i.bind("readystatechange",a),i.bind("error",d),i.img.src=n},this.checkStatus=function(){i.img.complete&&(m(),o.onLoad(i))},this.onTimeout=function(){m(),i.img.complete?o.onLoad(i):o.onTimeout(i)},this.getName=function(){return n},this.bind=function(n,e){i.img.addEventListener?i.img.addEventListener(n,e,!1):i.img.attachEvent&&i.img.attachEvent("on"+n,e)},this.unbind=function(n,e){i.img.removeEventListener?i.img.removeEventListener(n,e,!1):i.img.detachEvent&&i.img.detachEvent("on"+n,e)}}PxLoader.prototype.addImage=function(n,e,t){var i=new PxLoaderImage(n,e,t);return this.add(i),i.img},"function"==typeof define&&define.amd&&define("PxLoaderImage",[],function(){return PxLoaderImage});


$(document).ready(function(event) {
	var loader = new PxLoader();
	
    $('.slideshow img').each(function(index) {
        loader.addImage($(this).attr('src'));
    });

    loader.addCompletionListener(function(e) { 
        new Slideshow($('.slideshow'));
    }); 

    loader.start();
	
});

var CURRENT_SLIDESHOW_ITEM_CHANGED = 'currentSlideshowItemChanged';

var currentSlideshowItem = -1;
function setCurrentSlideshowItem(value) {
	if(currentSlideshowItem != value)
	{
		currentSlideshowItem = value;
		$(window).trigger(CURRENT_SLIDESHOW_ITEM_CHANGED);
	}
}

function Slideshow($el) {
	var self = this;
	$el.height($el.children('img').first().height());
	this.count = $el.children('img').length;
	$el.children('img').each(function(index) {
		new SlideshowItem($(this), index);
	});
	
	setInterval(function() {
		var temp = currentSlideshowItem + 1;
		if(temp > self.count - 1)
			temp = 0;
		setCurrentSlideshowItem(temp);
	}, 4000);
	
	setCurrentSlideshowItem(0);
	
	$(window).resize(function() {
		$el.height($el.children('img').first().height());
	});
}

function SlideshowItem($el, id) {
	$(window).on(CURRENT_SLIDESHOW_ITEM_CHANGED, function(event) {
		if(currentSlideshowItem == id)
			$el.addClass('active');
		else
			$el.removeClass('active');
	});
}