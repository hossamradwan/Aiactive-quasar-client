(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"4b86":function(t,e,a){"use strict";var o=a("5339"),s=a.n(o);s.a},"4cd5":function(t,e,a){},5339:function(t,e,a){},"60da1":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("grid-layout",{attrs:{layout:t.layout,"col-num":t.colNum,"row-height":30,responsive:!1,"is-draggable":t.draggable,"is-resizable":t.resizable,"vertical-compact":!1,"use-css-transforms":!0,autoSize:!0,maxRows:12/Math.sqrt(t.devicesPerRow)},on:{"update:layout":function(e){t.layout=e}}},t._l(t.layout,(function(e,o){return a("grid-item",{key:o,attrs:{x:e.x,y:e.y,w:e.w,h:e.h,i:e.i}},[a("video-feed",{attrs:{index:o,monitorId:t.watchMonitors[o]}})],1)})),1)],1)},s=[],i=(a("c975"),a("a434"),a("ded3")),r=a.n(i),n=a("7be8"),l=a("2f62"),d={components:{GridLayout:n["GridLayout"],GridItem:n["GridItem"],"video-feed":a("855f").default},data(){return{layout:[{x:0,y:0,w:12,h:12,i:0}],draggable:!1,resizable:!1,colNum:12,index:0}},mounted(){this.setGrid(),this.index=this.layout.length},computed:r()(r()(r()({},Object(l["d"])("facial",["selectedCameraIndex","devicesPerRow","activeDevices","url"])),Object(l["d"])("shinobi",["watchMonitors"])),Object(l["c"])("facial",["cameras"])),methods:{addItem:function(){let t=this.layout[this.layout.length-1],e=t.x+t.w<12?t.x+t.w:0,a=t.x+t.w>=12?t.y+t.h:t.y;this.layout.push({x:e,y:a,w:this.layout[0].w,h:this.layout[0].h,i:this.index}),this.index++},removeItem:function(t){const e=this.layout.map(t=>t.i).indexOf(t);this.layout.splice(e,1)},setGrid(){let t=()=>{for(var t=0;t<this.layout.length;t++)if(this.layout[t].h=12/Math.sqrt(this.devicesPerRow),this.layout[t].w=12/Math.sqrt(this.devicesPerRow),0!=t){let e=this.layout[t-1];this.layout[t].x=e.x+e.w<12?e.x+e.w:0,this.layout[t].y=e.x+e.w>11?e.y+e.h:e.y}},e=this.devicesPerRow-this.layout.length;if(e>0){t();for(var a=0;a<e;a++)this.addItem()}else e<0&&(this.layout.splice(e),t())}},watch:{devicesPerRow:function(){this.setGrid()}}},c=d,u=(a("4b86"),a("2877")),y=Object(u["a"])(c,o,s,!1,null,null,null);e["default"]=y.exports},"6dbe":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"column",attrs:{padding:""}},[a("tool-bar",{attrs:{moduleName:t.moduleName}}),a("q-card",{staticClass:"settings-tabs col"},[a("vms-record")],1)],1)},s=[],i=a("ded3"),r=a.n(i),n=a("2f62"),l={name:"PageVms",data(){return{moduleName:"Vms-module"}},created(){this.getDevices(),this.getMonitors()},computed:r()({},Object(n["d"])("shinobi",["monitors"])),methods:r()(r()({},Object(n["b"])("devices",["getDevices"])),Object(n["b"])("shinobi",["getMonitors","addMonitor"])),components:{"tool-bar":a("5bd4").default,"vms-record":a("60da1").default}},d=l,c=a("2877"),u=a("9989"),y=a("f09f"),p=a("eebe"),h=a.n(p),f=Object(c["a"])(d,o,s,!1,null,null,null);e["default"]=f.exports;h()(f,"components",{QPage:u["a"],QCard:y["a"]})},"7b15":function(t,e,a){"use strict";var o=a("4cd5"),s=a.n(o);s.a},"855f":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"100%",border:"3px solid white"}},["undefined"!=typeof t.monitorId?a("div",{staticStyle:{height:"100%"},on:{mouseover:function(e){t.showToolbar=!0},mouseleave:function(e){t.showToolbar=!1}}},[a("div",{staticClass:"player"},[a("video-player",{ref:"videoPlayer",staticClass:"vjs-custom-skin",attrs:{options:t.playerOptions},on:{play:function(e){return t.onPlayerPlay(e)},ready:function(e){return t.onPlayerReady(e)}}})],1)]):a("span",{staticStyle:{color:"white","font-size":"large"}},[t._v("No Content "+t._s(t.monitorId))])])},s=[],i=(a("ddb0"),a("ded3")),r=a.n(i),n=a("2f62"),l=a("89f1"),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.rootClass},[a("script2",{attrs:{type:"text/javascript",async:"true",src:t.ADS_SCRIPT}}),a("ins",{staticClass:"adsbygoogle",class:t.insClass,staticStyle:{display:"block","text-align":"center"},attrs:{"data-ad-layout":"in-article","data-ad-format":t.dataAdFormat,"data-ad-client":t.dataAdClient,"data-ad-slot":t.dataAdSlot,"data-full-width-responsive":t.dataFullWidthResponsive}}),t.isNonPersonalizedAds?a("script2",{attrs:{type:"text/javascript"}},[t._v("(adsbygoogle = window.adsbygoogle ||\n    []).push({}).requestNonPersonalizedAds = 1;\n  ")]):t._e()],1)},c=[],u={ADS_SCRIPT:"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"},y={rootClass:{type:String,default:"adswrapper"},insClass:{type:String,default:""},isNonPersonalizedAds:{type:Boolean,default:!1},dataAdClient:{type:String,default:"ca-pub-1893384651266286"},dataAdSlot:{type:String,default:"1627649589"},dataAdLayoutKey:{type:String,default:"-6t+ed+2i-1n-4w"},dataAdTest:{type:String,default:"off"},dataAdFormat:{type:String,default:"auto"},dataFullWidthResponsive:{type:Boolean,default:!0}},p={__assign(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var a=Object(t),o=1;o<arguments.length;o++){var s=arguments[o];if(null!=s)for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(a[i]=s[i])}return a}},h={name:"InArticleAdsense",props:p.__assign(y,{dataAdFormat:{type:String,default:"fluid"}}),data(){return{ADS_SCRIPT:u.ADS_SCRIPT}}},f=h,m=a("2877"),b=Object(m["a"])(f,d,c,!1,null,null,null),g=(b.exports,a("a5bc"),{components:{VideoPlayer:l["a"]},props:["monitorId"],data(){return{showToolbar:!1,facesDrawer:!1,autoplay:!1,playerOptions:{autoplay:!0,controls:!0,controlBar:{timeDivider:!1,durationDisplay:!1}}}},mounted(){},computed:r()(r()(r()({},Object(n["d"])("facial",["cameras","selectedCameraIndex"])),Object(n["d"])("shinobi",["ip","port","keys","monitors","watchMonitors"])),{},{player(){return this.$refs.videoPlayer.player}}),methods:r()(r()(r()({},Object(n["b"])("facial",["addDevice","removeDevice","enableFaceRecognition","enableFaceDetection","pauseDevice","updateMessage"])),Object(n["b"])("shinobi",["getMonitors","addMonitor"])),{},{fullscreen(t){const e=t.target.parentNode.parentNode.parentNode;this.$q.fullscreen.toggle(e).then(()=>{}).catch(t=>{alert(t)})},onPlayerPlay(t){console.log("player play")},onPlayerReady(t){this.player.play();const e=`http://${this.ip}:${this.port}/${this.keys.API_KEY}/hls/${this.keys.GROUP_KEY}/${this.monitorId}/s.m3u8`;console.log("src:",e),this.playVideo(e)},playVideo:function(t){const e={withCredentials:!1,type:"application/x-mpegurl",src:t};this.player.reset(),this.player.src(e),this.player.play()}})}),v=g,w=(a("7b15"),Object(m["a"])(v,o,s,!1,null,"25844e11",null));e["default"]=w.exports}}]);