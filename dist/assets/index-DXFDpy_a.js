import{g as xn,R as Me}from"./main-Da7mm-km.js";var pt={exports:{}},gt,te;function An(){if(te)return gt;te=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return gt=t,gt}var ht,ee;function wn(){if(ee)return ht;ee=1;var t=An();function e(){}function n(){}return n.resetWarningCache=e,ht=function(){function a(i,s,c,f,u,p){if(p!==t){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}}a.isRequired=a;function r(){return a}var o={array:a,bigint:a,bool:a,func:a,number:a,object:a,string:a,symbol:a,any:a,arrayOf:r,element:a,elementType:a,instanceOf:r,node:a,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:n,resetWarningCache:e};return o.PropTypes=o,o},ht}var ne;function Pn(){return ne||(ne=1,pt.exports=wn()()),pt.exports}var On=Pn();const g=xn(On);/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */function Sn(t,e,n){return(e=En(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ae(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?ae(Object(n),!0).forEach(function(a){Sn(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ae(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function kn(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function En(t){var e=kn(t,"string");return typeof e=="symbol"?e:e+""}const re=()=>{};let Ht={},Le={},Re=null,je={mark:re,measure:re};try{typeof window<"u"&&(Ht=window),typeof document<"u"&&(Le=document),typeof MutationObserver<"u"&&(Re=MutationObserver),typeof performance<"u"&&(je=performance)}catch{}const{userAgent:oe=""}=Ht.navigator||{},R=Ht,h=Le,ie=Re,nt=je;R.document;const N=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",ze=~oe.indexOf("MSIE")||~oe.indexOf("Trident/");var In=/fa(s|r|l|t|d|dr|dl|dt|b|k|kd|ss|sr|sl|st|sds|sdr|sdl|sdt)?[\-\ ]/,Cn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,De={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fab:"brands","fa-brands":"brands"},duotone:{fa:"solid",fad:"solid","fa-solid":"solid","fa-duotone":"solid",fadr:"regular","fa-regular":"regular",fadl:"light","fa-light":"light",fadt:"thin","fa-thin":"thin"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid",fasdr:"regular","fa-regular":"regular",fasdl:"light","fa-light":"light",fasdt:"thin","fa-thin":"thin"}},Tn={GROUP:"duotone-group",PRIMARY:"primary",SECONDARY:"secondary"},We=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],P="classic",ft="duotone",Nn="sharp",_n="sharp-duotone",Ye=[P,ft,Nn,_n],Fn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},duotone:{900:"fad",400:"fadr",300:"fadl",100:"fadt"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds",400:"fasdr",300:"fasdl",100:"fasdt"}},Mn={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad",400:"fadr",normal:"fadr",300:"fadl",100:"fadt"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds",400:"fasdr",normal:"fasdr",300:"fasdl",100:"fasdt"}},Ln=new Map([["classic",{defaultShortPrefixId:"fas",defaultStyleId:"solid",styleIds:["solid","regular","light","thin","brands"],futureStyleIds:[],defaultFontWeight:900}],["sharp",{defaultShortPrefixId:"fass",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["duotone",{defaultShortPrefixId:"fad",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}],["sharp-duotone",{defaultShortPrefixId:"fasds",defaultStyleId:"solid",styleIds:["solid","regular","light","thin"],futureStyleIds:[],defaultFontWeight:900}]]),Rn={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",brands:"fab"},duotone:{solid:"fad",regular:"fadr",light:"fadl",thin:"fadt"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds",regular:"fasdr",light:"fasdl",thin:"fasdt"}},jn=["fak","fa-kit","fakd","fa-kit-duotone"],se={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},zn=["kit"],Dn={kit:{"fa-kit":"fak"}},Wn=["fak","fakd"],Yn={kit:{fak:"fa-kit"}},le={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}},at={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},Un=["fa-classic","fa-duotone","fa-sharp","fa-sharp-duotone"],Hn=["fak","fa-kit","fakd","fa-kit-duotone"],Gn={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},$n={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},duotone:{"fa-regular":"fadr","fa-light":"fadl","fa-thin":"fadt"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds","fa-regular":"fasdr","fa-light":"fasdl","fa-thin":"fasdt"}},Bn={classic:["fas","far","fal","fat","fad"],duotone:["fadr","fadl","fadt"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds","fasdr","fasdl","fasdt"]},Pt={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},duotone:{fadr:"fa-regular",fadl:"fa-light",fadt:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid",fasdr:"fa-regular",fasdl:"fa-light",fasdt:"fa-thin"}},Vn=["fa-solid","fa-regular","fa-light","fa-thin","fa-duotone","fa-brands"],Ot=["fa","fas","far","fal","fat","fad","fadr","fadl","fadt","fab","fass","fasr","fasl","fast","fasds","fasdr","fasdl","fasdt",...Un,...Vn],Xn=["solid","regular","light","thin","duotone","brands"],Ue=[1,2,3,4,5,6,7,8,9,10],qn=Ue.concat([11,12,13,14,15,16,17,18,19,20]),Kn=[...Object.keys(Bn),...Xn,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",at.GROUP,at.SWAP_OPACITY,at.PRIMARY,at.SECONDARY].concat(Ue.map(t=>"".concat(t,"x"))).concat(qn.map(t=>"w-".concat(t))),Qn={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}};const C="___FONT_AWESOME___",St=16,He="fa",Ge="svg-inline--fa",W="data-fa-i2svg",kt="data-fa-pseudo-element",Jn="data-fa-pseudo-element-pending",Gt="data-prefix",$t="data-icon",fe="fontawesome-i2svg",Zn="async",ta=["HTML","HEAD","STYLE","SCRIPT"],$e=(()=>{try{return!0}catch{return!1}})();function Z(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[P]}})}const Be=l({},De);Be[P]=l(l(l(l({},{"fa-duotone":"duotone"}),De[P]),se.kit),se["kit-duotone"]);const ea=Z(Be),Et=l({},Rn);Et[P]=l(l(l(l({},{duotone:"fad"}),Et[P]),le.kit),le["kit-duotone"]);const ce=Z(Et),It=l({},Pt);It[P]=l(l({},It[P]),Yn.kit);const Bt=Z(It),Ct=l({},$n);Ct[P]=l(l({},Ct[P]),Dn.kit);Z(Ct);const na=In,Ve="fa-layers-text",aa=Cn,ra=l({},Fn);Z(ra);const oa=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],yt=Tn,ia=[...zn,...Kn],q=R.FontAwesomeConfig||{};function sa(t){var e=h.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function la(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}h&&typeof h.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=la(sa(n));r!=null&&(q[a]=r)});const Xe={styleDefault:"solid",familyDefault:P,cssPrefix:He,replacementClass:Ge,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};q.familyPrefix&&(q.cssPrefix=q.familyPrefix);const B=l(l({},Xe),q);B.autoReplaceSvg||(B.observeMutations=!1);const m={};Object.keys(Xe).forEach(t=>{Object.defineProperty(m,t,{enumerable:!0,set:function(e){B[t]=e,K.forEach(n=>n(m))},get:function(){return B[t]}})});Object.defineProperty(m,"familyPrefix",{enumerable:!0,set:function(t){B.cssPrefix=t,K.forEach(e=>e(m))},get:function(){return B.cssPrefix}});R.FontAwesomeConfig=m;const K=[];function fa(t){return K.push(t),()=>{K.splice(K.indexOf(t),1)}}const M=St,E={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function ca(t){if(!t||!N)return;const e=h.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=h.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const o=n[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=o)}return h.head.insertBefore(e,a),t}const ua="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Q(){let t=12,e="";for(;t-- >0;)e+=ua[Math.random()*62|0];return e}function V(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Vt(t){return t.classList?V(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function qe(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ma(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(qe(t[n]),'" '),"").trim()}function ct(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function Xt(t){return t.size!==E.size||t.x!==E.x||t.y!==E.y||t.rotate!==E.rotate||t.flipX||t.flipY}function da(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(e.x*32,", ").concat(e.y*32,") "),i="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),c={transform:"".concat(o," ").concat(i," ").concat(s)},f={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:c,path:f}}function pa(t){let{transform:e,width:n=St,height:a=St,startCentered:r=!1}=t,o="";return r&&ze?o+="translate(".concat(e.x/M-n/2,"em, ").concat(e.y/M-a/2,"em) "):r?o+="translate(calc(-50% + ".concat(e.x/M,"em), calc(-50% + ").concat(e.y/M,"em)) "):o+="translate(".concat(e.x/M,"em, ").concat(e.y/M,"em) "),o+="scale(".concat(e.size/M*(e.flipX?-1:1),", ").concat(e.size/M*(e.flipY?-1:1),") "),o+="rotate(".concat(e.rotate,"deg) "),o}var ga=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-regular: normal 400 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-light: normal 300 1em/1 "Font Awesome 6 Duotone";
  --fa-font-duotone-thin: normal 100 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-regular: normal 400 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-light: normal 300 1em/1 "Font Awesome 6 Sharp Duotone";
  --fa-font-sharp-duotone-thin: normal 100 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}`;function Ke(){const t=He,e=Ge,n=m.cssPrefix,a=m.replacementClass;let r=ga;if(n!==t||a!==e){const o=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");r=r.replace(o,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(s,".".concat(a))}return r}let ue=!1;function bt(){m.autoAddCss&&!ue&&(ca(Ke()),ue=!0)}var ha={mixout(){return{dom:{css:Ke,insertCss:bt}}},hooks(){return{beforeDOMElementCreation(){bt()},beforeI2svg(){bt()}}}};const T=R||{};T[C]||(T[C]={});T[C].styles||(T[C].styles={});T[C].hooks||(T[C].hooks={});T[C].shims||(T[C].shims=[]);var I=T[C];const Qe=[],Je=function(){h.removeEventListener("DOMContentLoaded",Je),it=1,Qe.map(t=>t())};let it=!1;N&&(it=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),it||h.addEventListener("DOMContentLoaded",Je));function ya(t){N&&(it?setTimeout(t,0):Qe.push(t))}function tt(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?qe(t):"<".concat(e," ").concat(ma(n),">").concat(a.map(tt).join(""),"</").concat(e,">")}function me(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var vt=function(e,n,a,r){var o=Object.keys(e),i=o.length,s=n,c,f,u;for(a===void 0?(c=1,u=e[o[0]]):(c=0,u=a);c<i;c++)f=o[c],u=s(u,e[f],f,e);return u};function ba(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const o=t.charCodeAt(n++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Tt(t){const e=ba(t);return e.length===1?e[0].toString(16):null}function va(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function de(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function Nt(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=de(e);typeof I.hooks.addPack=="function"&&!a?I.hooks.addPack(t,de(e)):I.styles[t]=l(l({},I.styles[t]||{}),r),t==="fas"&&Nt("fa",e)}const{styles:J,shims:xa}=I,Ze=Object.keys(Bt),Aa=Ze.reduce((t,e)=>(t[e]=Object.keys(Bt[e]),t),{});let qt=null,tn={},en={},nn={},an={},rn={};function wa(t){return~ia.indexOf(t)}function Pa(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!wa(r)?r:null}const on=()=>{const t=a=>vt(J,(r,o,i)=>(r[i]=vt(o,a,{}),r),{});tn=t((a,r,o)=>(r[3]&&(a[r[3]]=o),r[2]&&r[2].filter(s=>typeof s=="number").forEach(s=>{a[s.toString(16)]=o}),a)),en=t((a,r,o)=>(a[o]=o,r[2]&&r[2].filter(s=>typeof s=="string").forEach(s=>{a[s]=o}),a)),rn=t((a,r,o)=>{const i=r[2];return a[o]=o,i.forEach(s=>{a[s]=o}),a});const e="far"in J||m.autoFetchSvg,n=vt(xa,(a,r)=>{const o=r[0];let i=r[1];const s=r[2];return i==="far"&&!e&&(i="fas"),typeof o=="string"&&(a.names[o]={prefix:i,iconName:s}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:i,iconName:s}),a},{names:{},unicodes:{}});nn=n.names,an=n.unicodes,qt=ut(m.styleDefault,{family:m.familyDefault})};fa(t=>{qt=ut(t.styleDefault,{family:m.familyDefault})});on();function Kt(t,e){return(tn[t]||{})[e]}function Oa(t,e){return(en[t]||{})[e]}function D(t,e){return(rn[t]||{})[e]}function sn(t){return nn[t]||{prefix:null,iconName:null}}function Sa(t){const e=an[t],n=Kt("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function j(){return qt}const ln=()=>({prefix:null,iconName:null,rest:[]});function ka(t){let e=P;const n=Ze.reduce((a,r)=>(a[r]="".concat(m.cssPrefix,"-").concat(r),a),{});return Ye.forEach(a=>{(t.includes(n[a])||t.some(r=>Aa[a].includes(r)))&&(e=a)}),e}function ut(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=P}=e,a=ea[n][t];if(n===ft&&!t)return"fad";const r=ce[n][t]||ce[n][a],o=t in I.styles?t:null;return r||o||null}function Ea(t){let e=[],n=null;return t.forEach(a=>{const r=Pa(m.cssPrefix,a);r?n=r:a&&e.push(a)}),{iconName:n,rest:e}}function pe(t){return t.sort().filter((e,n,a)=>a.indexOf(e)===n)}function mt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e;let a=null;const r=Ot.concat(Hn),o=pe(t.filter(p=>r.includes(p))),i=pe(t.filter(p=>!Ot.includes(p))),s=o.filter(p=>(a=p,!We.includes(p))),[c=null]=s,f=ka(o),u=l(l({},Ea(i)),{},{prefix:ut(c,{family:f})});return l(l(l({},u),Na({values:t,family:f,styles:J,config:m,canonical:u,givenPrefix:a})),Ia(n,a,u))}function Ia(t,e,n){let{prefix:a,iconName:r}=n;if(t||!a||!r)return{prefix:a,iconName:r};const o=e==="fa"?sn(r):{},i=D(a,r);return r=o.iconName||i||r,a=o.prefix||a,a==="far"&&!J.far&&J.fas&&!m.autoFetchSvg&&(a="fas"),{prefix:a,iconName:r}}const Ca=Ye.filter(t=>t!==P||t!==ft),Ta=Object.keys(Pt).filter(t=>t!==P).map(t=>Object.keys(Pt[t])).flat();function Na(t){const{values:e,family:n,canonical:a,givenPrefix:r="",styles:o={},config:i={}}=t,s=n===ft,c=e.includes("fa-duotone")||e.includes("fad"),f=i.familyDefault==="duotone",u=a.prefix==="fad"||a.prefix==="fa-duotone";if(!s&&(c||f||u)&&(a.prefix="fad"),(e.includes("fa-brands")||e.includes("fab"))&&(a.prefix="fab"),!a.prefix&&Ca.includes(n)&&(Object.keys(o).find(d=>Ta.includes(d))||i.autoFetchSvg)){const d=Ln.get(n).defaultShortPrefixId;a.prefix=d,a.iconName=D(a.prefix,a.iconName)||a.iconName}return(a.prefix==="fa"||r==="fa")&&(a.prefix=j()||"fas"),a}class _a{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(o=>{this.definitions[o]=l(l({},this.definitions[o]||{}),r[o]),Nt(o,r[o]);const i=Bt[P][o];i&&Nt(i,r[o]),on()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:o,iconName:i,icon:s}=a[r],c=s[2];e[o]||(e[o]={}),c.length>0&&c.forEach(f=>{typeof f=="string"&&(e[o][f]=s)}),e[o][i]=s}),e}}let ge=[],G={};const $={},Fa=Object.keys($);function Ma(t,e){let{mixoutsTo:n}=e;return ge=t,G={},Object.keys($).forEach(a=>{Fa.indexOf(a)===-1&&delete $[a]}),ge.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(o=>{typeof r[o]=="function"&&(n[o]=r[o]),typeof r[o]=="object"&&Object.keys(r[o]).forEach(i=>{n[o]||(n[o]={}),n[o][i]=r[o][i]})}),a.hooks){const o=a.hooks();Object.keys(o).forEach(i=>{G[i]||(G[i]=[]),G[i].push(o[i])})}a.provides&&a.provides($)}),n}function _t(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(G[t]||[]).forEach(i=>{e=i.apply(null,[e,...a])}),e}function Y(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(G[t]||[]).forEach(o=>{o.apply(null,n)})}function z(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return $[t]?$[t].apply(null,e):void 0}function Ft(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||j();if(e)return e=D(n,e)||e,me(fn.definitions,n,e)||me(I.styles,n,e)}const fn=new _a,La=()=>{m.autoReplaceSvg=!1,m.observeMutations=!1,Y("noAuto")},Ra={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return N?(Y("beforeI2svg",t),z("pseudoElements2svg",t),z("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;m.autoReplaceSvg===!1&&(m.autoReplaceSvg=!0),m.observeMutations=!0,ya(()=>{za({autoReplaceSvgRoot:e}),Y("watch",t)})}},ja={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:D(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=ut(t[0]);return{prefix:n,iconName:D(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(m.cssPrefix,"-"))>-1||t.match(na))){const e=mt(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||j(),iconName:D(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=j();return{prefix:e,iconName:D(e,t)||t}}}},S={noAuto:La,config:m,dom:Ra,parse:ja,library:fn,findIconDefinition:Ft,toHtml:tt},za=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=h}=t;(Object.keys(I.styles).length>0||m.autoFetchSvg)&&N&&m.autoReplaceSvg&&S.dom.i2svg({node:e})};function dt(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>tt(n))}}),Object.defineProperty(t,"node",{get:function(){if(!N)return;const n=h.createElement("div");return n.innerHTML=t.html,n.children}}),t}function Da(t){let{children:e,main:n,mask:a,attributes:r,styles:o,transform:i}=t;if(Xt(i)&&n.found&&!a.found){const{width:s,height:c}=n,f={x:s/c/2,y:.5};r.style=ct(l(l({},o),{},{"transform-origin":"".concat(f.x+i.x/16,"em ").concat(f.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function Wa(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:o}=t;const i=o===!0?"".concat(e,"-").concat(m.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:l(l({},r),{},{id:i}),children:a}]}]}function Qt(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:o,symbol:i,title:s,maskId:c,titleId:f,extra:u,watchable:p=!1}=t,{width:d,height:x}=n.found?n:e,O=Wn.includes(a),A=[m.replacementClass,r?"".concat(m.cssPrefix,"-").concat(r):""].filter(F=>u.classes.indexOf(F)===-1).filter(F=>F!==""||!!F).concat(u.classes).join(" ");let b={children:[],attributes:l(l({},u.attributes),{},{"data-prefix":a,"data-icon":r,class:A,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(d," ").concat(x)})};const y=O&&!~u.classes.indexOf("fa-fw")?{width:"".concat(d/x*16*.0625,"em")}:{};p&&(b.attributes[W]=""),s&&(b.children.push({tag:"title",attributes:{id:b.attributes["aria-labelledby"]||"title-".concat(f||Q())},children:[s]}),delete b.attributes.title);const v=l(l({},b),{},{prefix:a,iconName:r,main:e,mask:n,maskId:c,transform:o,symbol:i,styles:l(l({},y),u.styles)}),{children:w,attributes:_}=n.found&&e.found?z("generateAbstractMask",v)||{children:[],attributes:{}}:z("generateAbstractIcon",v)||{children:[],attributes:{}};return v.children=w,v.attributes=_,i?Wa(v):Da(v)}function he(t){const{content:e,width:n,height:a,transform:r,title:o,extra:i,watchable:s=!1}=t,c=l(l(l({},i.attributes),o?{title:o}:{}),{},{class:i.classes.join(" ")});s&&(c[W]="");const f=l({},i.styles);Xt(r)&&(f.transform=pa({transform:r,startCentered:!0,width:n,height:a}),f["-webkit-transform"]=f.transform);const u=ct(f);u.length>0&&(c.style=u);const p=[];return p.push({tag:"span",attributes:c,children:[e]}),o&&p.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),p}function Ya(t){const{content:e,title:n,extra:a}=t,r=l(l(l({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),o=ct(a.styles);o.length>0&&(r.style=o);const i=[];return i.push({tag:"span",attributes:r,children:[e]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}const{styles:xt}=I;function Mt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(m.cssPrefix,"-").concat(yt.GROUP)},children:[{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(yt.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(m.cssPrefix,"-").concat(yt.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const Ua={found:!1,width:512,height:512};function Ha(t,e){!$e&&!m.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Lt(t,e){let n=e;return e==="fa"&&m.styleDefault!==null&&(e=j()),new Promise((a,r)=>{if(n==="fa"){const o=sn(t)||{};t=o.iconName||t,e=o.prefix||e}if(t&&e&&xt[e]&&xt[e][t]){const o=xt[e][t];return a(Mt(o))}Ha(t,e),a(l(l({},Ua),{},{icon:m.showMissingIcons&&t?z("missingIconAbstract")||{}:{}}))})}const ye=()=>{},Rt=m.measurePerformance&&nt&&nt.mark&&nt.measure?nt:{mark:ye,measure:ye},X='FA "6.7.2"',Ga=t=>(Rt.mark("".concat(X," ").concat(t," begins")),()=>cn(t)),cn=t=>{Rt.mark("".concat(X," ").concat(t," ends")),Rt.measure("".concat(X," ").concat(t),"".concat(X," ").concat(t," begins"),"".concat(X," ").concat(t," ends"))};var Jt={begin:Ga,end:cn};const rt=()=>{};function be(t){return typeof(t.getAttribute?t.getAttribute(W):null)=="string"}function $a(t){const e=t.getAttribute?t.getAttribute(Gt):null,n=t.getAttribute?t.getAttribute($t):null;return e&&n}function Ba(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(m.replacementClass)}function Va(){return m.autoReplaceSvg===!0?ot.replace:ot[m.autoReplaceSvg]||ot.replace}function Xa(t){return h.createElementNS("http://www.w3.org/2000/svg",t)}function qa(t){return h.createElement(t)}function un(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?Xa:qa}=e;if(typeof t=="string")return h.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])}),(t.children||[]).forEach(function(o){a.appendChild(un(o,{ceFn:n}))}),a}function Ka(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const ot={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(un(n),e)}),e.getAttribute(W)===null&&m.keepOriginalSource){let n=h.createComment(Ka(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~Vt(e).indexOf(m.replacementClass))return ot.replace(t);const a=new RegExp("".concat(m.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const o=n[0].attributes.class.split(" ").reduce((i,s)=>(s===m.replacementClass||s.match(a)?i.toSvg.push(s):i.toNode.push(s),i),{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}const r=n.map(o=>tt(o)).join(`
`);e.setAttribute(W,""),e.innerHTML=r}};function ve(t){t()}function mn(t,e){const n=typeof e=="function"?e:rt;if(t.length===0)n();else{let a=ve;m.mutateApproach===Zn&&(a=R.requestAnimationFrame||ve),a(()=>{const r=Va(),o=Jt.begin("mutate");t.map(r),o(),n()})}}let Zt=!1;function dn(){Zt=!0}function jt(){Zt=!1}let st=null;function xe(t){if(!ie||!m.observeMutations)return;const{treeCallback:e=rt,nodeCallback:n=rt,pseudoElementsCallback:a=rt,observeMutationsRoot:r=h}=t;st=new ie(o=>{if(Zt)return;const i=j();V(o).forEach(s=>{if(s.type==="childList"&&s.addedNodes.length>0&&!be(s.addedNodes[0])&&(m.searchPseudoElements&&a(s.target),e(s.target)),s.type==="attributes"&&s.target.parentNode&&m.searchPseudoElements&&a(s.target.parentNode),s.type==="attributes"&&be(s.target)&&~oa.indexOf(s.attributeName))if(s.attributeName==="class"&&$a(s.target)){const{prefix:c,iconName:f}=mt(Vt(s.target));s.target.setAttribute(Gt,c||i),f&&s.target.setAttribute($t,f)}else Ba(s.target)&&n(s.target)})}),N&&st.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function Qa(){st&&st.disconnect()}function Ja(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(a[i]=s.join(":").trim()),a},{})),n}function Za(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=mt(Vt(t));return r.prefix||(r.prefix=j()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Oa(r.prefix,t.innerText)||Kt(r.prefix,Tt(t.innerText))),!r.iconName&&m.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function tr(t){const e=V(t.attributes).reduce((r,o)=>(r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return m.autoA11y&&(n?e["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(a||Q()):(e["aria-hidden"]="true",e.focusable="false")),e}function er(){return{iconName:null,title:null,titleId:null,prefix:null,transform:E,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ae(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=Za(t),o=tr(t),i=_t("parseNodeAttributes",{},t);let s=e.styleParser?Ja(t):[];return l({iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:E,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:s,attributes:o}},i)}const{styles:nr}=I;function pn(t){const e=m.autoReplaceSvg==="nest"?Ae(t,{styleParser:!1}):Ae(t);return~e.extra.classes.indexOf(Ve)?z("generateLayersText",t,e):z("generateSvgReplacementMutation",t,e)}function ar(){return[...jn,...Ot]}function we(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!N)return Promise.resolve();const n=h.documentElement.classList,a=u=>n.add("".concat(fe,"-").concat(u)),r=u=>n.remove("".concat(fe,"-").concat(u)),o=m.autoFetchSvg?ar():We.concat(Object.keys(nr));o.includes("fa")||o.push("fa");const i=[".".concat(Ve,":not([").concat(W,"])")].concat(o.map(u=>".".concat(u,":not([").concat(W,"])"))).join(", ");if(i.length===0)return Promise.resolve();let s=[];try{s=V(t.querySelectorAll(i))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();const c=Jt.begin("onTree"),f=s.reduce((u,p)=>{try{const d=pn(p);d&&u.push(d)}catch(d){$e||d.name==="MissingIcon"&&console.error(d)}return u},[]);return new Promise((u,p)=>{Promise.all(f).then(d=>{mn(d,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),c(),u()})}).catch(d=>{c(),p(d)})})}function rr(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;pn(t).then(n=>{n&&mn([n],e)})}function or(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:Ft(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Ft(r||{})),t(a,l(l({},n),{},{mask:r}))}}const ir=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=E,symbol:a=!1,mask:r=null,maskId:o=null,title:i=null,titleId:s=null,classes:c=[],attributes:f={},styles:u={}}=e;if(!t)return;const{prefix:p,iconName:d,icon:x}=t;return dt(l({type:"icon"},t),()=>(Y("beforeDOMElementCreation",{iconDefinition:t,params:e}),m.autoA11y&&(i?f["aria-labelledby"]="".concat(m.replacementClass,"-title-").concat(s||Q()):(f["aria-hidden"]="true",f.focusable="false")),Qt({icons:{main:Mt(x),mask:r?Mt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:p,iconName:d,transform:l(l({},E),n),symbol:a,title:i,maskId:o,titleId:s,extra:{attributes:f,styles:u,classes:c}})))};var sr={mixout(){return{icon:or(ir)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=we,t.nodeCallback=rr,t}}},provides(t){t.i2svg=function(e){const{node:n=h,callback:a=()=>{}}=e;return we(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:o,prefix:i,transform:s,symbol:c,mask:f,maskId:u,extra:p}=n;return new Promise((d,x)=>{Promise.all([Lt(a,i),f.iconName?Lt(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(O=>{let[A,b]=O;d([e,Qt({icons:{main:A,mask:b},prefix:i,iconName:a,transform:s,symbol:c,maskId:u,title:r,titleId:o,extra:p,watchable:!0})])}).catch(x)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:o,styles:i}=e;const s=ct(i);s.length>0&&(a.style=s);let c;return Xt(o)&&(c=z("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),n.push(c||r.icon),{children:n,attributes:a}}}},lr={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return dt({type:"layer"},()=>{Y("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(o=>{a=a.concat(o.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(m.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},fr={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:o={}}=e;return dt({type:"counter",content:t},()=>(Y("beforeDOMElementCreation",{content:t,params:e}),Ya({content:t.toString(),title:n,extra:{attributes:r,styles:o,classes:["".concat(m.cssPrefix,"-layers-counter"),...a]}})))}}}},cr={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=E,title:a=null,classes:r=[],attributes:o={},styles:i={}}=e;return dt({type:"text",content:t},()=>(Y("beforeDOMElementCreation",{content:t,params:e}),he({content:t,transform:l(l({},E),n),title:a,extra:{attributes:o,styles:i,classes:["".concat(m.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:o}=n;let i=null,s=null;if(ze){const c=parseInt(getComputedStyle(e).fontSize,10),f=e.getBoundingClientRect();i=f.width/c,s=f.height/c}return m.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([e,he({content:e.innerHTML,width:i,height:s,transform:r,title:a,extra:o,watchable:!0})])}}};const ur=new RegExp('"',"ug"),Pe=[1105920,1112319],Oe=l(l(l(l({},{FontAwesome:{normal:"fas",400:"fas"}}),Mn),Qn),Gn),zt=Object.keys(Oe).reduce((t,e)=>(t[e.toLowerCase()]=Oe[e],t),{}),mr=Object.keys(zt).reduce((t,e)=>{const n=zt[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function dr(t){const e=t.replace(ur,""),n=va(e,0),a=n>=Pe[0]&&n<=Pe[1],r=e.length===2?e[0]===e[1]:!1;return{value:Tt(r?e[0]:e),isSecondary:a||r}}function pr(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(zt[n]||{})[r]||mr[n]}function Se(t,e){const n="".concat(Jn).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const i=V(t.children).filter(d=>d.getAttribute(kt)===e)[0],s=R.getComputedStyle(t,e),c=s.getPropertyValue("font-family"),f=c.match(aa),u=s.getPropertyValue("font-weight"),p=s.getPropertyValue("content");if(i&&!f)return t.removeChild(i),a();if(f&&p!=="none"&&p!==""){const d=s.getPropertyValue("content");let x=pr(c,u);const{value:O,isSecondary:A}=dr(d),b=f[0].startsWith("FontAwesome");let y=Kt(x,O),v=y;if(b){const w=Sa(O);w.iconName&&w.prefix&&(y=w.iconName,x=w.prefix)}if(y&&!A&&(!i||i.getAttribute(Gt)!==x||i.getAttribute($t)!==v)){t.setAttribute(n,v),i&&t.removeChild(i);const w=er(),{extra:_}=w;_.attributes[kt]=e,Lt(y,x).then(F=>{const et=Qt(l(l({},w),{},{icons:{main:F,mask:ln()},prefix:x,iconName:v,extra:_,watchable:!0})),U=h.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(U,t.firstChild):t.appendChild(U),U.outerHTML=et.map(H=>tt(H)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function gr(t){return Promise.all([Se(t,"::before"),Se(t,"::after")])}function hr(t){return t.parentNode!==document.head&&!~ta.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(kt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function ke(t){if(N)return new Promise((e,n)=>{const a=V(t.querySelectorAll("*")).filter(hr).map(gr),r=Jt.begin("searchPseudoElements");dn(),Promise.all(a).then(()=>{r(),jt(),e()}).catch(()=>{r(),jt(),n()})})}var yr={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=ke,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=h}=e;m.searchPseudoElements&&ke(n)}}};let Ee=!1;var br={mixout(){return{dom:{unwatch(){dn(),Ee=!0}}}},hooks(){return{bootstrap(){xe(_t("mutationObserverCallbacks",{}))},noAuto(){Qa()},watch(t){const{observeMutationsRoot:e}=t;Ee?jt():xe(_t("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const Ie=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),o=r[0];let i=r.slice(1).join("-");if(o&&i==="h")return n.flipX=!0,n;if(o&&i==="v")return n.flipY=!0,n;if(i=parseFloat(i),isNaN(i))return n;switch(o){case"grow":n.size=n.size+i;break;case"shrink":n.size=n.size-i;break;case"left":n.x=n.x-i;break;case"right":n.x=n.x+i;break;case"up":n.y=n.y-i;break;case"down":n.y=n.y+i;break;case"rotate":n.rotate=n.rotate+i;break}return n},e)};var vr={mixout(){return{parse:{transform:t=>Ie(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=Ie(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:o}=e;const i={transform:"translate(".concat(r/2," 256)")},s="translate(".concat(a.x*32,", ").concat(a.y*32,") "),c="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),f="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(s," ").concat(c," ").concat(f)},p={transform:"translate(".concat(o/2*-1," -256)")},d={outer:i,inner:u,path:p};return{tag:"g",attributes:l({},d.outer),children:[{tag:"g",attributes:l({},d.inner),children:[{tag:n.icon.tag,children:n.icon.children,attributes:l(l({},n.icon.attributes),d.path)}]}]}}}};const At={x:0,y:0,width:"100%",height:"100%"};function Ce(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function xr(t){return t.tag==="g"?t.children:[t]}var Ar={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?mt(n.split(" ").map(r=>r.trim())):ln();return a.prefix||(a.prefix=j()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:o,maskId:i,transform:s}=e;const{width:c,icon:f}=r,{width:u,icon:p}=o,d=da({transform:s,containerWidth:u,iconWidth:c}),x={tag:"rect",attributes:l(l({},At),{},{fill:"white"})},O=f.children?{children:f.children.map(Ce)}:{},A={tag:"g",attributes:l({},d.inner),children:[Ce(l({tag:f.tag,attributes:l(l({},f.attributes),d.path)},O))]},b={tag:"g",attributes:l({},d.outer),children:[A]},y="mask-".concat(i||Q()),v="clip-".concat(i||Q()),w={tag:"mask",attributes:l(l({},At),{},{id:y,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[x,b]},_={tag:"defs",children:[{tag:"clipPath",attributes:{id:v},children:xr(p)},w]};return n.push(_,{tag:"rect",attributes:l({fill:"currentColor","clip-path":"url(#".concat(v,")"),mask:"url(#".concat(y,")")},At)}),{children:n,attributes:a}}}},wr={provides(t){let e=!1;R.matchMedia&&(e=R.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:l(l({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});const o=l(l({},r),{},{attributeName:"opacity"}),i={tag:"circle",attributes:l(l({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||i.children.push({tag:"animate",attributes:l(l({},r),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:l(l({},o),{},{values:"1;0;1;1;0;1;"})}),n.push(i),n.push({tag:"path",attributes:l(l({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:l(l({},o),{},{values:"1;0;0;0;0;1;"})}]}),e||n.push({tag:"path",attributes:l(l({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:l(l({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Pr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},Or=[ha,sr,lr,fr,cr,yr,br,vr,Ar,wr,Pr];Ma(Or,{mixoutsTo:S});S.noAuto;S.config;S.library;S.dom;const Dt=S.parse;S.findIconDefinition;S.toHtml;const Sr=S.icon;S.layer;S.text;S.counter;var kr={};function Wt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=Array(e);n<e;n++)a[n]=t[n];return a}function Er(t){if(Array.isArray(t))return t}function Ir(t){if(Array.isArray(t))return Wt(t)}function L(t,e,n){return(e=Rr(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Cr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Tr(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var a,r,o,i,s=[],c=!0,f=!1;try{if(o=(n=n.call(t)).next,e!==0)for(;!(c=(a=o.call(n)).done)&&(s.push(a.value),s.length!==e);c=!0);}catch(u){f=!0,r=u}finally{try{if(!c&&n.return!=null&&(i=n.return(),Object(i)!==i))return}finally{if(f)throw r}}return s}}function Nr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _r(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Te(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Te(Object(n),!0).forEach(function(a){L(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Te(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function Fr(t,e){if(t==null)return{};var n,a,r=Mr(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)===-1&&{}.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}function Mr(t,e){if(t==null)return{};var n={};for(var a in t)if({}.hasOwnProperty.call(t,a)){if(e.indexOf(a)!==-1)continue;n[a]=t[a]}return n}function Ne(t,e){return Er(t)||Tr(t,e)||gn(t,e)||Nr()}function Yt(t){return Ir(t)||Cr(t)||gn(t)||_r()}function Lr(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var a=n.call(t,e);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Rr(t){var e=Lr(t,"string");return typeof e=="symbol"?e:e+""}function lt(t){"@babel/helpers - typeof";return lt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},lt(t)}function gn(t,e){if(t){if(typeof t=="string")return Wt(t,e);var n={}.toString.call(t).slice(8,-1);return n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set"?Array.from(t):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Wt(t,e):void 0}}var jr="7.0.0",Ut;try{var zr=require("@fortawesome/fontawesome-svg-core/package.json");Ut=zr.version}catch{Ut=typeof process<"u"&&kr.FA_VERSION||"7.0.0"}function Dr(t){var e=t.beat,n=t.fade,a=t.beatFade,r=t.bounce,o=t.shake,i=t.flash,s=t.spin,c=t.spinPulse,f=t.spinReverse,u=t.pulse,p=t.fixedWidth,d=t.inverse,x=t.border,O=t.listItem,A=t.flip,b=t.size,y=t.rotation,v=t.pull,w=t.swapOpacity,_=t.rotateBy,F=t.widthAuto,et=Wr(Ut,jr),U=L(L(L(L(L(L({"fa-beat":e,"fa-fade":n,"fa-beat-fade":a,"fa-bounce":r,"fa-shake":o,"fa-flash":i,"fa-spin":s,"fa-spin-reverse":f,"fa-spin-pulse":c,"fa-pulse":u,"fa-fw":p,"fa-inverse":d,"fa-border":x,"fa-li":O,"fa-flip":A===!0,"fa-flip-horizontal":A==="horizontal"||A==="both","fa-flip-vertical":A==="vertical"||A==="both"},"fa-".concat(b),typeof b<"u"&&b!==null),"fa-rotate-".concat(y),typeof y<"u"&&y!==null&&y!==0),"fa-pull-".concat(v),typeof v<"u"&&v!==null),"fa-swap-opacity",w),"fa-rotate-by",et&&_),"fa-width-auto",et&&F);return Object.keys(U).map(function(H){return U[H]?H:null}).filter(function(H){return H})}function Wr(t,e){for(var n=t.split("-"),a=Ne(n,2),r=a[0],o=a[1],i=e.split("-"),s=Ne(i,2),c=s[0],f=s[1],u=r.split("."),p=c.split("."),d=0;d<Math.max(u.length,p.length);d++){var x=u[d]||"0",O=p[d]||"0",A=parseInt(x,10),b=parseInt(O,10);if(A!==b)return A>b}for(var y=0;y<Math.max(u.length,p.length);y++){var v=u[y]||"0",w=p[y]||"0";if(v!==w&&v.length!==w.length)return v.length<w.length}return!(o&&!f)}function Yr(t){return t=t-0,t===t}function hn(t){return Yr(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var Ur=["style"];function Hr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Gr(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=hn(n.slice(0,a)),o=n.slice(a+1).trim();return r.startsWith("webkit")?e[Hr(r)]=o:e[r]=o,e},{})}function yn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(c){return yn(t,c)}),r=Object.keys(e.attributes||{}).reduce(function(c,f){var u=e.attributes[f];switch(f){case"class":c.attrs.className=u,delete e.attributes.class;break;case"style":c.attrs.style=Gr(u);break;default:f.indexOf("aria-")===0||f.indexOf("data-")===0?c.attrs[f.toLowerCase()]=u:c.attrs[hn(f)]=u}return c},{attrs:{}}),o=n.style,i=o===void 0?{}:o,s=Fr(n,Ur);return r.attrs.style=k(k({},r.attrs.style),i),t.apply(void 0,[e.tag,k(k({},r.attrs),s)].concat(Yt(a)))}var bn=!1;try{bn=!0}catch{}function $r(){if(!bn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function _e(t){if(t&&lt(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Dt.icon)return Dt.icon(t);if(t===null)return null;if(t&&lt(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function wt(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?L({},t,e):{}}var Fe={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,rotateBy:!1,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1,widthAuto:!1},vn=Me.forwardRef(function(t,e){var n=k(k({},Fe),t),a=n.icon,r=n.mask,o=n.symbol,i=n.className,s=n.title,c=n.titleId,f=n.maskId,u=_e(a),p=wt("classes",[].concat(Yt(Dr(n)),Yt((i||"").split(" ")))),d=wt("transform",typeof n.transform=="string"?Dt.transform(n.transform):n.transform),x=wt("mask",_e(r)),O=Sr(u,k(k(k(k({},p),d),x),{},{symbol:o,title:s,titleId:c,maskId:f}));if(!O)return $r("Could not find icon",u),null;var A=O.abstract,b={ref:e};return Object.keys(n).forEach(function(y){Fe.hasOwnProperty(y)||(b[y]=n[y])}),Br(A[0],b)});vn.displayName="FontAwesomeIcon";vn.propTypes={beat:g.bool,border:g.bool,beatFade:g.bool,bounce:g.bool,className:g.string,fade:g.bool,flash:g.bool,mask:g.oneOfType([g.object,g.array,g.string]),maskId:g.string,fixedWidth:g.bool,inverse:g.bool,flip:g.oneOf([!0,!1,"horizontal","vertical","both"]),icon:g.oneOfType([g.object,g.array,g.string]),listItem:g.bool,pull:g.oneOf(["right","left"]),pulse:g.bool,rotation:g.oneOf([0,90,180,270]),rotateBy:g.bool,shake:g.bool,size:g.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:g.bool,spinPulse:g.bool,spinReverse:g.bool,symbol:g.oneOfType([g.bool,g.string]),title:g.string,titleId:g.string,transform:g.oneOfType([g.string,g.object]),swapOpacity:g.bool,widthAuto:g.bool};var Br=yn.bind(null,Me.createElement);/*!
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2024 Fonticons, Inc.
 */const Xr={prefix:"fas",iconName:"circle-check",icon:[512,512,[61533,"check-circle"],"f058","M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},qr={prefix:"fas",iconName:"question",icon:[320,512,[10067,10068,61736],"3f","M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"]},Kr={prefix:"fas",iconName:"chevron-left",icon:[320,512,[9001],"f053","M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"]},Qr={prefix:"fas",iconName:"chevron-right",icon:[320,512,[9002],"f054","M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"]},Jr={prefix:"fas",iconName:"exclamation",icon:[128,512,[10069,10071,61738],"21","M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L96 64zM64 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"]};export{vn as F,qr as a,Xr as b,Kr as c,Qr as d,Jr as f};
