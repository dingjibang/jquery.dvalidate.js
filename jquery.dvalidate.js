(function($){
	$.fn.validate = function(options) {
		var i18n = typeof $.dvalidate != "undefined" && typeof $.dvalidate.i18n != "undefined" ? $.dvalidate.i18n : {
			"number":"此属性必须为数字",
			"empty":"此属性不能为空"
		};
		
		//如果没有查询到dom元素则跳过
		if($(this).length == 0) return;
		var that = $(this);
		
		//提示器
		var message = function(dom){
			
			//如果有自定义除错事件则直接调用，否则使用layer进行提示
			if(typeof($._data(dom,"events")) != "undefined" && typeof($._data(dom,"events").error) != "undefined"){
				$(dom).error();
			}else{
				layTip.tips(dom.error.msg, dom, {tipsMore:true});
			}
				
		};
		
		var _checker = function(that, returnFaild){
			if(!returnFaild) that.error = {has:false};
			var isRadio = $(that).is("input") && $(that).attr("type") == "radio";
			//阻止IE8进入事件监听死循环
			if(typeof(window.event) != "undefined" && typeof(window.event.propertyName) != "undefined" && window.event.propertyName != "value") return;
			
			//获取验证类型
			var check = function(str){
				var arr = $(that).attr("check").split(" ");
				for(var i in arr)
					if(str == arr[i])
						return true;
				return false;
			};
			
			//向dom元素内存入错误信息
			var faild = function(str, type){
				var error = {msg:str, dom:that, "type":type, has:true};
				if(returnFaild) 
					return error;
				that.error = error;
			};
			
			//验证：必须是数字
			if(check("number") && isNaN($(that).val()))
				return faild(i18n.number,"number");
			//验证：不为空
			console.log(that);
			if((check("empty") && $(that).val().length == 0) || (isRadio && $(that).parents("form").find("input[type='radio'][name='"+$(that).attr("name")+"']:checked").val() == undefined))
				return faild(i18n.empty,"empty");
		};
		
		//遍历表单
		if(typeof this.validateEnable == "undefined")
		$(this).each(function(){
			var form = $(this);
			//验证器
			var checker = function(){
				_checker(this, false);
			};
			
			//注入监听事件
			$(this).find("input[check],select[check]").not("[disabled]").on("blur change input",checker);
			
			//注入表单提交事件
			$(this).submit(function(e){
				var hasError = false;
				//查询表单是否有错
				$(this).find("input[check],select[check]").not("[disabled]").each(checker).each(function(){
					hasError = this.error.has ? true : hasError;
					if(this.error.has && !($(this).is("input") && $(this).attr("type") == "radio" && this != form.find("input[type='radio'][name='"+$(this).attr("name")+"']")[0]))
						message($(this)[0]);
				});
				
				//有错误则拦截表单提交
				if(hasError) e.preventDefault();
				
				return true;
			});
		});
		
		this.validateEnable = true;

		return {
			check:function(selector){
				var s = typeof selector == "string" ? that.find(selector) : selector;
				var checkedResult =  _checker(s, true);
				return checkedResult == undefined ? {"has":false} : checkedResult;
			},
		};
	};
	
})(jQuery);

$(function(){
	//自动注册
	$("form[validate]").validate();
});


/*!
 @Name：layer v2.4 弹层组件精简版，只保留tips功能，集成css
 @Author：贤心
 @Site：http://layer.layui.com
 @License：LGPL
    
 */
!function(n,q){var f,l,g={getPath:function(){var b=document.scripts,b=b[b.length-1],a=b.src;if(!b.getAttribute("merge"))return a.substring(0,a.lastIndexOf("/")+1)}(),enter:function(b){13===b.keyCode&&b.preventDefault()},config:{},end:{},btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"]},k={v:"2.4",ie6:!!n.ActiveXObject&&!n.XMLHttpRequest,index:0,path:g.getPath,config:function(b,a){var e=0;b=b||{};k.cache=g.config=f.extend(g.config,b);k.path=g.config.path||
k.path;"string"===typeof b.extend&&(b.extend=[b.extend]);k.use("skin/layer.css",b.extend&&0<b.extend.length?function d(){var f=b.extend;k.use(f[f[e]?e:e-1],e<f.length?function(){++e;return d}():a)}():a);return this},use:function(b,a,e){var c=f("head")[0];b=b.replace(/\s/g,"");var d=/\.css$/.test(b),h=document.createElement(d?"link":"script"),g="layui_layer_"+b.replace(/\.|\//g,"");if(k.path)return d&&(h.rel="stylesheet"),h[d?"href":"src"]=/^http:\/\//.test(b)?b:k.path+b,h.id=g,f("#"+g)[0]||c.appendChild(h),
function p(){if(d?1989===parseInt(f("#"+g).css("width")):k[e||g]){a&&a();try{d||c.removeChild(h)}catch(b){}}else setTimeout(p,100)}(),this},tips:function(b,a,e){return k.open(f.extend({type:4,content:[b,a],closeBtn:!1,time:3E3,shade:!1,fix:!1,maxWidth:210},e))}},m=function(b){this.index=++k.index;this.config=f.extend({},this.config,g.config,b);this.creat()};m.pt=m.prototype;var h=["layui-layer"];h.anim=["layer-anim"];m.pt.config={type:0,shade:.3,fix:!0,move:h[1],title:"&#x4FE1;&#x606F;",offset:"auto",
area:"auto",time:0,zIndex:19891014,maxWidth:360,shift:0,tips:2};m.pt.vessel=function(b,a){var e=this.index,c=this.config,d=c.zIndex+e,f="object"===typeof c.title,f=c.title?'<div class="layui-layer-title" style="'+(f?c.title[1]:"")+'">'+(f?c.title[0]:c.title)+"</div>":"";c.zIndex=d;a([c.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+e+'" times="'+e+'" style="'+("z-index:"+(d-1)+"; background-color:"+(c.shade[1]||"#000")+"; opacity:"+(c.shade[0]||c.shade)+"; filter:alpha(opacity="+(100*
c.shade[0]||100*c.shade)+");")+'"></div>':"",'<div class="'+h[0]+(" layui-layer-"+g.type[c.type])+(0!=c.type&&2!=c.type||c.shade?"":" layui-layer-border")+" "+(c.skin||"")+'" id="'+h[0]+e+'" type="'+g.type[c.type]+'" times="'+e+'" showtime="'+c.time+'" conType="'+(b?"object":"string")+'" style="z-index: '+d+"; width:"+c.area[0]+";height:"+c.area[1]+(c.fix?"":";position:absolute;")+'">'+(b&&2!=c.type?"":f)+'<div id="'+(c.id||"")+'" class="layui-layer-content'+(0==c.type&&-1!==c.icon?" layui-layer-padding":
"")+(3==c.type?" layui-layer-loading"+c.icon:"")+'">'+(1==c.type&&b?"":c.content||"")+'</div><span class="layui-layer-setwin"></span></div>'],f);return this};m.pt.creat=function(){var b=this,a=b.config,e=b.index,c=a.content,d="object"===typeof c;if(!f("#"+a.id)[0]){"string"===typeof a.area&&(a.area="auto"===a.area?["",""]:[a.area,""]);switch(a.type){case 0:a.btn="btn"in a?a.btn:g.btn[0];k.closeAll("dialog");break;case 2:c=a.content=d?a.content:[a.content||"http://layer.layui.com","auto"];a.content=
'<iframe scrolling="'+(a.content[1]||"auto")+'" allowtransparency="true" id="'+h[4]+""+e+'" name="'+h[4]+""+e+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+a.content[0]+'"></iframe>';break;case 3:a.title=!1;a.closeBtn=!1;-1===a.icon&&0===a.icon;k.closeAll("loading");break;case 4:d||(a.content=[a.content,"body"]),a.follow=a.content[1],a.content=a.content[0]+'<i class="layui-layer-TipsG"></i>',a.title=!1,a.tips="object"===typeof a.tips?a.tips:[a.tips,!0],a.tipsMore||
k.closeAll("tips")}b.vessel(d,function(g,k){f("body").append(g[0]);d?2==a.type||4==a.type?f("body").append(g[1]):c.parents("."+h[0])[0]||(c.show().addClass("layui-layer-wrap").wrap(g[1]),f("#"+h[0]+e).find("."+h[5]).before(k)):f("body").append(g[1]);b.layero=f("#"+h[0]+e);a.scrollbar||h.html.css("overflow","hidden").attr("layer-full",e)}).auto(e);2==a.type&&k.ie6&&b.layero.find("iframe").attr("src",c[0]);f(document).off("keydown",g.enter).on("keydown",g.enter);b.layero.on("keydown",function(a){f(document).off("keydown",
g.enter)});4==a.type?b.tips():b.offset();if(a.fix)l.on("resize",function(){b.offset();(/^\d+%$/.test(a.area[0])||/^\d+%$/.test(a.area[1]))&&b.auto(e);4==a.type&&b.tips()});0>=a.time||setTimeout(function(){k.close(b.index)},a.time);h.anim[a.shift]&&b.layero.addClass(h.anim[a.shift])}};m.pt.auto=function(b){function a(a){a=c.find(a);a.height(d[1]-g-k-2*(parseFloat(a.css("padding"))|0))}var e=this.config,c=f("#"+h[0]+b);""===e.area[0]&&0<e.maxWidth&&(/MSIE 7/.test(navigator.userAgent)&&e.btn&&c.width(c.innerWidth()),
c.outerWidth()>e.maxWidth&&c.width(e.maxWidth));var d=[c.innerWidth(),c.innerHeight()],g=c.find(h[1]).outerHeight()||0,k=c.find("."+h[6]).outerHeight()||0;switch(e.type){case 2:a("iframe");break;default:""===e.area[1]?e.fix&&d[1]>=l.height()&&(d[1]=l.height(),a("."+h[5])):a("."+h[5])}return this};m.pt.tips=function(){var b=this.config,a=this.layero,e=[a.outerWidth(),a.outerHeight()],c=f(b.follow);c[0]||(c=f("body"));var d={width:c.outerWidth(),height:c.outerHeight(),top:c.offset().top,left:c.offset().left},
g=a.find(".layui-layer-TipsG"),c=b.tips[0];b.tips[1]||g.remove();d.autoLeft=function(){0<d.left+e[0]-l.width()?(d.tipLeft=d.left+d.width-e[0],g.css({right:12,left:"auto"})):d.tipLeft=d.left};d.where=[function(){d.autoLeft();d.tipTop=d.top-e[1]-10;g.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",b.tips[1])},function(){d.tipLeft=d.left+d.width+10;d.tipTop=d.top;g.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",b.tips[1])},
function(){d.autoLeft();d.tipTop=d.top+d.height+10;g.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",b.tips[1])},function(){d.tipLeft=d.left-e[0]-10;d.tipTop=d.top;g.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",b.tips[1])}];d.where[c-1]();1===c?0>d.top-(l.scrollTop()+e[1]+16)&&d.where[2]():2===c?0<l.width()-(d.left+d.width+e[0]+16)||d.where[3]():3===c?0<d.top-l.scrollTop()+d.height+e[1]+16-l.height()&&d.where[0]():
4===c&&0<e[0]+16-d.left&&d.where[1]();a.find("."+h[5]).css({"background-color":b.tips[1],"padding-right":b.closeBtn?"30px":""});a.css({left:d.tipLeft-(b.fix?l.scrollLeft():0),top:d.tipTop-(b.fix?l.scrollTop():0)})};g.reselect=function(){f.each(f("select"),function(b,a){var e=f(this);e.parents("."+h[0])[0]||1==e.attr("layer")&&1>f("."+h[0]).length&&e.removeAttr("layer").show()})};m.pt.IE6=function(b){function a(){b.css({top:c+(e.config.fix?l.scrollTop():0)})}var e=this,c=b.offset().top;a();l.scroll(a);
f("select").each(function(a,b){var c=f(this);c.parents("."+h[0])[0]||"none"===c.css("display")||c.attr({layer:"1"}).hide()})};g.rescollbar=function(b){h.html.attr("layer-full")==b&&(h.html[0].style.removeProperty?h.html[0].style.removeProperty("overflow"):h.html[0].style.removeAttribute("overflow"),h.html.removeAttr("layer-full"))};n.layTip=k;k.close=function(b){var a=f("#"+h[0]+b),e=a.attr("type");if(a[0]){if(e===g.type[1]&&"object"===a.attr("conType"))for(a.children(":not(."+h[5]+")").remove(),
e=0;2>e;e++)a.find(".layui-layer-wrap").unwrap().hide();else{if(e===g.type[2])try{var c=f("#"+h[4]+b)[0];c.contentWindow.document.write("");c.contentWindow.close();a.find("."+h[5])[0].removeChild(c)}catch(d){}a[0].innerHTML="";a.remove()}f("#layui-layer-moves, #layui-layer-shade"+b).remove();k.ie6&&g.reselect();g.rescollbar(b);f(document).off("keydown",g.enter);"function"===typeof g.end[b]&&g.end[b]();delete g.end[b]}};k.closeAll=function(b){f.each(f("."+h[0]),function(){var a=f(this);(b?a.attr("type")===
b:1)&&k.close(a.attr("times"))})};g.run=function(){f=jQuery;l=f(n);h.html=f("html");f("<style>.layui-layer{border-radius:2px;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:.3s;animation-duration:.3s}@keyframes bounceIn{0%{opacity:0;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}}.layer-anim{-webkit-animation-name:bounceIn;animation-name:bounceIn}.layui-layer-tips{background:0 0;box-shadow:none;border:none}.layui-layer-tips .layui-layer-content{position:relative;line-height:22px;min-width:12px;padding:5px 10px;font-size:12px;border-radius:3px;box-shadow:1px 1px 3px rgba(0,0,0,.3);background-color:#F90;color:#fff}.layui-layer-tips .layui-layer-close{right:-2px;top:-1px}.layui-layer-tips i.layui-layer-TipsG{position:absolute;width:0;height:0;border-width:8px;border-color:transparent;border-style:dashed}.layui-layer-tips i.layui-layer-TipsB,.layui-layer-tips i.layui-layer-TipsT{left:5px;border-right-style:solid;border-right-color:#F90}.layui-layer-tips i.layui-layer-TipsT{bottom:-8px}.layui-layer-tips i.layui-layer-TipsB{top:-8px}.layui-layer-tips i.layui-layer-TipsL,.layui-layer-tips i.layui-layer-TipsR{top:1px;border-bottom-style:solid;border-bottom-color:#F90}.layui-layer-tips i.layui-layer-TipsR{left:-8px}.layui-layer-tips i.layui-layer-TipsL{right:-8px}</style>").appendTo(f("head"));
k.open=function(b){return(new m(b)).index}};"function"===typeof define?define(function(){g.run();return k}):g.run()}(window);
