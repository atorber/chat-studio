import{d as J,q as W,ck as lt,cl as dt,h as b,cp as ue,dg as ct,dh as K,di as bt,O as ft,b as pt,s as q,_ as ut,$ as vt,N as ht,e as gt,dj as xt,W as mt,f as r,j as i,k as C,g as A,l as yt,P as wt,n as Ce,dk as ve,c3 as ee,bM as St,w as te,B as Ct,t as F,dl as Rt,bX as zt,z as j,A as G,D as Tt,E as he,co as ge,dm as $t,S as Y,x as ae,ab as Pt,ac as Wt,dn as Lt,dp as At}from"./index-6a9cab4f.js";const Bt=ue(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[ue("&::-webkit-scrollbar",{width:0,height:0})]),_t=J({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=W(null);function n(l){!(l.currentTarget.offsetWidth<l.currentTarget.scrollWidth)||l.deltaY===0||(l.currentTarget.scrollLeft+=l.deltaY+l.deltaX,l.preventDefault())}const d=lt();return Bt.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:dt,ssr:d}),Object.assign({selfRef:e,handleWheel:n},{scrollTo(...l){var h;(h=e.value)===null||h===void 0||h.scrollTo(...l)}})},render(){return b("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var kt=/\s/;function Et(e){for(var n=e.length;n--&&kt.test(e.charAt(n)););return n}var jt=/^\s+/;function It(e){return e&&e.slice(0,Et(e)+1).replace(jt,"")}var xe=0/0,Ot=/^[-+]0x[0-9a-f]+$/i,Ht=/^0b[01]+$/i,Ft=/^0o[0-7]+$/i,Mt=parseInt;function me(e){if(typeof e=="number")return e;if(ct(e))return xe;if(K(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=K(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=It(e);var d=Ht.test(e);return d||Ft.test(e)?Mt(e.slice(2),d?2:8):Ot.test(e)?xe:+e}var Dt=function(){return bt.Date.now()};const re=Dt;var Nt="Expected a function",Vt=Math.max,Xt=Math.min;function Ut(e,n,d){var u,l,h,v,f,g,x=0,y=!1,w=!1,m=!0;if(typeof e!="function")throw new TypeError(Nt);n=me(n)||0,K(d)&&(y=!!d.leading,w="maxWait"in d,h=w?Vt(me(d.maxWait)||0,n):h,m="trailing"in d?!!d.trailing:m);function S(c){var T=u,I=l;return u=l=void 0,x=c,v=e.apply(I,T),v}function R(c){return x=c,f=setTimeout(B,n),y?S(c):v}function L(c){var T=c-g,I=c-x,H=n-T;return w?Xt(H,h-I):H}function $(c){var T=c-g,I=c-x;return g===void 0||T>=n||T<0||w&&I>=h}function B(){var c=re();if($(c))return z(c);f=setTimeout(B,L(c))}function z(c){return f=void 0,m&&u?S(c):(u=l=void 0,v)}function _(){f!==void 0&&clearTimeout(f),x=0,u=g=l=f=void 0}function E(){return f===void 0?v:z(re())}function p(){var c=re(),T=$(c);if(u=arguments,l=this,g=c,T){if(f===void 0)return R(g);if(w)return clearTimeout(f),f=setTimeout(B,n),S(g)}return f===void 0&&(f=setTimeout(B,n)),v}return p.cancel=_,p.flush=E,p}var Gt="Expected a function";function ne(e,n,d){var u=!0,l=!0;if(typeof e!="function")throw new TypeError(Gt);return K(d)&&(u="leading"in d?!!d.leading:u,l="trailing"in d?!!d.trailing:l),Ut(e,n,{leading:u,maxWait:n,trailing:l})}const Yt=J({name:"Add",render(){return b("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},b("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),Re=ft("n-tabs"),qt={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Kt=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},mt(qt,["displayDirective"])),ie=J({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:Kt,setup(e){const{mergedClsPrefixRef:n,valueRef:d,typeRef:u,closableRef:l,tabStyleRef:h,tabChangeIdRef:v,onBeforeLeaveRef:f,triggerRef:g,handleAdd:x,activateTab:y,handleClose:w}=pt(Re);return{trigger:g,mergedClosable:q(()=>{if(e.internalAddable)return!1;const{closable:m}=e;return m===void 0?l.value:m}),style:h,clsPrefix:n,value:d,type:u,handleClose(m){m.stopPropagation(),!e.disabled&&w(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){x();return}const{name:m}=e,S=++v.id;if(m!==d.value){const{value:R}=f;R?Promise.resolve(R(e.name,d.value)).then(L=>{L&&v.id===S&&y(m)}):y(m)}}}},render(){const{internalAddable:e,clsPrefix:n,name:d,disabled:u,label:l,tab:h,value:v,mergedClosable:f,style:g,trigger:x,$slots:{default:y}}=this,w=l??h;return b("div",{class:`${n}-tabs-tab-wrapper`},this.internalLeftPadded?b("div",{class:`${n}-tabs-tab-pad`}):null,b("div",Object.assign({key:d,"data-name":d,"data-disabled":u?!0:void 0},ut({class:[`${n}-tabs-tab`,v===d&&`${n}-tabs-tab--active`,u&&`${n}-tabs-tab--disabled`,f&&`${n}-tabs-tab--closable`,e&&`${n}-tabs-tab--addable`],onClick:x==="click"?this.activateTab:void 0,onMouseenter:x==="hover"?this.activateTab:void 0,style:e?void 0:g},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),b("span",{class:`${n}-tabs-tab__label`},e?b(vt,null,b("div",{class:`${n}-tabs-tab__height-placeholder`}," "),b(ht,{clsPrefix:n},{default:()=>b(Yt,null)})):y?y():typeof w=="object"?w:gt(w??d)),f&&this.type==="card"?b(xt,{clsPrefix:n,class:`${n}-tabs-tab__close`,onClick:this.handleClose,disabled:u}):null))}}),Jt=r("tabs",`
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[i("segment-type",[r("tabs-rail",[C("&.transition-disabled","color: red;",[r("tabs-tab",`
 transition: none;
 `)])])]),i("top",[r("tab-pane",`
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]),i("left",[r("tab-pane",`
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]),i("left, right",`
 flex-direction: row;
 `,[r("tabs-bar",`
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 padding: var(--n-tab-padding-vertical); 
 `)]),i("right",`
 flex-direction: row-reverse;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `),r("tabs-bar",`
 left: 0;
 `)]),i("bottom",`
 flex-direction: column-reverse;
 justify-content: flex-end;
 `,[r("tab-pane",`
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `),r("tabs-bar",`
 top: 0;
 `)]),r("tabs-rail",`
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[r("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[r("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[i("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 `),C("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),i("flex",[r("tabs-nav",{width:"100%"},[r("tabs-wrapper",{width:"100%"},[r("tabs-tab",{marginRight:0})])])]),r("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[A("prefix, suffix",`
 display: flex;
 align-items: center;
 `),A("prefix","padding-right: 16px;"),A("suffix","padding-left: 16px;")]),i("top, bottom",[r("tabs-nav-scroll-wrapper",[C("&::before",`
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `),C("&::after",`
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `),i("shadow-start",[C("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),i("shadow-end",[C("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])]),i("left, right",[r("tabs-nav-scroll-wrapper",[C("&::before",`
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),C("&::after",`
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `),i("shadow-start",[C("&::before",`
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]),i("shadow-end",[C("&::after",`
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])]),r("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[r("tabs-nav-y-scroll",`
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `,[C("&::-webkit-scrollbar",`
 width: 0;
 height: 0;
 `)]),C("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]),r("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 width: fit-content;
 box-sizing: border-box;
 `),r("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),r("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),r("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[i("disabled",{cursor:"not-allowed"}),A("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),A("label",`
 display: flex;
 align-items: center;
 `)]),r("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[C("&.transition-disabled",`
 transition: none;
 `),i("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),r("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),r("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[C("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),C("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),C("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),C("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),C("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),r("tabs-tab-pad",`
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),i("line-type, bar-type",[r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[C("&:hover",{color:"var(--n-tab-text-color-hover)"}),i("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),i("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),r("tabs-nav",[i("line-type",[i("top",[A("prefix, suffix",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 bottom: -1px;
 `)]),i("left",[A("prefix, suffix",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-right: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 right: -1px;
 `)]),i("right",[A("prefix, suffix",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-left: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 left: -1px;
 `)]),i("bottom",[A("prefix, suffix",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-nav-scroll-content",`
 border-top: 1px solid var(--n-tab-border-color);
 `),r("tabs-bar",`
 top: -1px;
 `)]),A("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-bar",`
 border-radius: 0;
 `)]),i("card-type",[A("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),r("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 `),r("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[i("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[A("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),yt("disabled",[C("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),i("closable","padding-right: 8px;"),i("active",`
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),i("disabled","color: var(--n-tab-text-color-disabled);")]),r("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")]),i("left, right",[r("tabs-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-wrapper",`
 flex-direction: column;
 `,[r("tabs-tab-pad",`
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])])]),i("top",[i("card-type",[r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `,[i("active",`
 border-bottom: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]),i("left",[i("card-type",[r("tabs-tab",`
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `,[i("active",`
 border-right: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-right: 1px solid var(--n-tab-border-color);
 `)])]),i("right",[i("card-type",[r("tabs-tab",`
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[i("active",`
 border-left: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-left: 1px solid var(--n-tab-border-color);
 `)])]),i("bottom",[i("card-type",[r("tabs-tab",`
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `,[i("active",`
 border-top: 1px solid #0000;
 `)]),r("tabs-tab-pad",`
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]),Qt=Object.assign(Object.assign({},Ce.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},placement:{type:String,default:"top"},tabStyle:[String,Object],barWidth:Number,paneClass:String,paneStyle:[String,Object],paneWrapperClass:String,paneWrapperStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ea=J({name:"Tabs",props:Qt,setup(e,{slots:n}){var d,u,l,h;const{mergedClsPrefixRef:v,inlineThemeDisabled:f}=wt(e),g=Ce("Tabs","-tabs",Jt,$t,e,v),x=W(null),y=W(null),w=W(null),m=W(null),S=W(null),R=W(!0),L=W(!0),$=ve(e,["labelSize","size"]),B=ve(e,["activeName","value"]),z=W((u=(d=B.value)!==null&&d!==void 0?d:e.defaultValue)!==null&&u!==void 0?u:n.default?(h=(l=ee(n.default())[0])===null||l===void 0?void 0:l.props)===null||h===void 0?void 0:h.name:null),_=St(B,z),E={id:0},p=q(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});te(_,()=>{E.id=0,H(),se()});function c(){var t;const{value:a}=_;return a===null?null:(t=x.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${a}"]`)}function T(t){if(e.type==="card")return;const{value:a}=y;if(a&&t){const o=`${v.value}-tabs-bar--disabled`,{barWidth:s,placement:P}=e;if(t.dataset.disabled==="true"?a.classList.add(o):a.classList.remove(o),["top","bottom"].includes(P)){if(I(["top","maxHeight","height"]),typeof s=="number"&&t.offsetWidth>=s){const k=Math.floor((t.offsetWidth-s)/2)+t.offsetLeft;a.style.left=`${k}px`,a.style.maxWidth=`${s}px`}else a.style.left=`${t.offsetLeft}px`,a.style.maxWidth=`${t.offsetWidth}px`;a.style.width="8192px",a.offsetWidth}else{if(I(["left","maxWidth","width"]),typeof s=="number"&&t.offsetHeight>=s){const k=Math.floor((t.offsetHeight-s)/2)+t.offsetTop;a.style.top=`${k}px`,a.style.maxHeight=`${s}px`}else a.style.top=`${t.offsetTop}px`,a.style.maxHeight=`${t.offsetHeight}px`;a.style.height="8192px",a.offsetHeight}}}function I(t){const{value:a}=y;if(a)for(const o of t)a.style[o]=""}function H(){if(e.type==="card")return;const t=c();t&&T(t)}function se(t){var a;const o=(a=S.value)===null||a===void 0?void 0:a.$el;if(!o)return;const s=c();if(!s)return;const{scrollLeft:P,offsetWidth:k}=o,{offsetLeft:D,offsetWidth:X}=s;P>D?o.scrollTo({top:0,left:D,behavior:"smooth"}):D+X>P+k&&o.scrollTo({top:0,left:D+X-k,behavior:"smooth"})}const N=W(null);let Q=0,O=null;function ze(t){const a=N.value;if(a){Q=t.getBoundingClientRect().height;const o=`${Q}px`,s=()=>{a.style.height=o,a.style.maxHeight=o};O?(s(),O(),O=null):O=s}}function Te(t){const a=N.value;if(a){const o=t.getBoundingClientRect().height,s=()=>{document.body.offsetHeight,a.style.maxHeight=`${o}px`,a.style.height=`${Math.max(Q,o)}px`};O?(O(),O=null,s()):O=s}}function $e(){const t=N.value;if(t){t.style.maxHeight="",t.style.height="";const{paneWrapperStyle:a}=e;if(typeof a=="string")t.style.cssText=a;else if(a){const{maxHeight:o,height:s}=a;o!==void 0&&(t.style.maxHeight=o),s!==void 0&&(t.style.height=s)}}}const le={value:[]},de=W("next");function Pe(t){const a=_.value;let o="next";for(const s of le.value){if(s===a)break;if(s===t){o="prev";break}}de.value=o,We(t)}function We(t){const{onActiveNameChange:a,onUpdateValue:o,"onUpdate:value":s}=e;a&&Y(a,t),o&&Y(o,t),s&&Y(s,t),z.value=t}function Le(t){const{onClose:a}=e;a&&Y(a,t)}function ce(){const{value:t}=y;if(!t)return;const a="transition-disabled";t.classList.add(a),H(),t.classList.remove(a)}let be=0;function Ae(t){var a;if(t.contentRect.width===0&&t.contentRect.height===0||be===t.contentRect.width)return;be=t.contentRect.width;const{type:o}=e;(o==="line"||o==="bar")&&ce(),o!=="segment"&&Z((a=S.value)===null||a===void 0?void 0:a.$el)}const Be=ne(Ae,64);te([()=>e.justifyContent,()=>e.size],()=>{ae(()=>{const{type:t}=e;(t==="line"||t==="bar")&&ce()})});const V=W(!1);function _e(t){var a;const{target:o,contentRect:{width:s}}=t,P=o.parentElement.offsetWidth;if(!V.value)P<s&&(V.value=!0);else{const{value:k}=m;if(!k)return;P-s>k.$el.offsetWidth&&(V.value=!1)}Z((a=S.value)===null||a===void 0?void 0:a.$el)}const ke=ne(_e,64);function Ee(){const{onAdd:t}=e;t&&t(),ae(()=>{const a=c(),{value:o}=S;!a||!o||o.scrollTo({left:a.offsetLeft,top:0,behavior:"smooth"})})}function Z(t){if(!t)return;const{placement:a}=e;if(a==="top"||a==="bottom"){const{scrollLeft:o,scrollWidth:s,offsetWidth:P}=t;R.value=o<=0,L.value=o+P>=s}else{const{scrollTop:o,scrollHeight:s,offsetHeight:P}=t;R.value=o<=0,L.value=o+P>=s}}const je=ne(t=>{Z(t.target)},64);Ct(Re,{triggerRef:F(e,"trigger"),tabStyleRef:F(e,"tabStyle"),paneClassRef:F(e,"paneClass"),paneStyleRef:F(e,"paneStyle"),mergedClsPrefixRef:v,typeRef:F(e,"type"),closableRef:F(e,"closable"),valueRef:_,tabChangeIdRef:E,onBeforeLeaveRef:F(e,"onBeforeLeave"),activateTab:Pe,handleClose:Le,handleAdd:Ee}),Rt(()=>{H(),se()}),zt(()=>{const{value:t}=w;if(!t)return;const{value:a}=v,o=`${a}-tabs-nav-scroll-wrapper--shadow-start`,s=`${a}-tabs-nav-scroll-wrapper--shadow-end`;R.value?t.classList.remove(o):t.classList.add(o),L.value?t.classList.remove(s):t.classList.add(s)});const fe=W(null);te(_,()=>{if(e.type==="segment"){const t=fe.value;t&&ae(()=>{t.classList.add("transition-disabled"),t.offsetWidth,t.classList.remove("transition-disabled")})}});const Ie={syncBarPosition:()=>{H()}},pe=q(()=>{const{value:t}=$,{type:a}=e,o={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[a],s=`${t}${o}`,{self:{barColor:P,closeIconColor:k,closeIconColorHover:D,closeIconColorPressed:X,tabColor:Oe,tabBorderColor:He,paneTextColor:Fe,tabFontWeight:Me,tabBorderRadius:De,tabFontWeightActive:Ne,colorSegment:Ve,fontWeightStrong:Xe,tabColorSegment:Ue,closeSize:Ge,closeIconSize:Ye,closeColorHover:qe,closeColorPressed:Ke,closeBorderRadius:Je,[j("panePadding",t)]:U,[j("tabPadding",s)]:Qe,[j("tabPaddingVertical",s)]:Ze,[j("tabGap",s)]:et,[j("tabGap",`${s}Vertical`)]:tt,[j("tabTextColor",a)]:at,[j("tabTextColorActive",a)]:rt,[j("tabTextColorHover",a)]:nt,[j("tabTextColorDisabled",a)]:ot,[j("tabFontSize",t)]:it},common:{cubicBezierEaseInOut:st}}=g.value;return{"--n-bezier":st,"--n-color-segment":Ve,"--n-bar-color":P,"--n-tab-font-size":it,"--n-tab-text-color":at,"--n-tab-text-color-active":rt,"--n-tab-text-color-disabled":ot,"--n-tab-text-color-hover":nt,"--n-pane-text-color":Fe,"--n-tab-border-color":He,"--n-tab-border-radius":De,"--n-close-size":Ge,"--n-close-icon-size":Ye,"--n-close-color-hover":qe,"--n-close-color-pressed":Ke,"--n-close-border-radius":Je,"--n-close-icon-color":k,"--n-close-icon-color-hover":D,"--n-close-icon-color-pressed":X,"--n-tab-color":Oe,"--n-tab-font-weight":Me,"--n-tab-font-weight-active":Ne,"--n-tab-padding":Qe,"--n-tab-padding-vertical":Ze,"--n-tab-gap":et,"--n-tab-gap-vertical":tt,"--n-pane-padding-left":G(U,"left"),"--n-pane-padding-right":G(U,"right"),"--n-pane-padding-top":G(U,"top"),"--n-pane-padding-bottom":G(U,"bottom"),"--n-font-weight-strong":Xe,"--n-tab-color-segment":Ue}}),M=f?Tt("tabs",q(()=>`${$.value[0]}${e.type[0]}`),pe,e):void 0;return Object.assign({mergedClsPrefix:v,mergedValue:_,renderedNames:new Set,tabsRailElRef:fe,tabsPaneWrapperRef:N,tabsElRef:x,barElRef:y,addTabInstRef:m,xScrollInstRef:S,scrollWrapperElRef:w,addTabFixed:V,tabWrapperStyle:p,handleNavResize:Be,mergedSize:$,handleScroll:je,handleTabsResize:ke,cssVars:f?void 0:pe,themeClass:M==null?void 0:M.themeClass,animationDirection:de,renderNameListRef:le,onAnimationBeforeLeave:ze,onAnimationEnter:Te,onAnimationAfterEnter:$e,onRender:M==null?void 0:M.onRender},Ie)},render(){const{mergedClsPrefix:e,type:n,placement:d,addTabFixed:u,addable:l,mergedSize:h,renderNameListRef:v,onRender:f,paneWrapperClass:g,paneWrapperStyle:x,$slots:{default:y,prefix:w,suffix:m}}=this;f==null||f();const S=y?ee(y()).filter(p=>p.type.__TAB_PANE__===!0):[],R=y?ee(y()).filter(p=>p.type.__TAB__===!0):[],L=!R.length,$=n==="card",B=n==="segment",z=!$&&!B&&this.justifyContent;v.value=[];const _=()=>{const p=b("div",{style:this.tabWrapperStyle,class:[`${e}-tabs-wrapper`]},z?null:b("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),L?S.map((c,T)=>(v.value.push(c.props.name),oe(b(ie,Object.assign({},c.props,{internalCreatedByPane:!0,internalLeftPadded:T!==0&&(!z||z==="center"||z==="start"||z==="end")}),c.children?{default:c.children.tab}:void 0)))):R.map((c,T)=>(v.value.push(c.props.name),oe(T!==0&&!z?Se(c):c))),!u&&l&&$?we(l,(L?S.length:R.length)!==0):null,z?null:b("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));return b("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},$&&l?b(ge,{onResize:this.handleTabsResize},{default:()=>p}):p,$?b("div",{class:`${e}-tabs-pad`}):null,$?null:b("div",{ref:"barElRef",class:`${e}-tabs-bar`}))},E=B?"top":d;return b("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${n}-type`,`${e}-tabs--${h}-size`,z&&`${e}-tabs--flex`,`${e}-tabs--${E}`],style:this.cssVars},b("div",{class:[`${e}-tabs-nav--${n}-type`,`${e}-tabs-nav--${E}`,`${e}-tabs-nav`]},he(w,p=>p&&b("div",{class:`${e}-tabs-nav__prefix`},p)),B?b("div",{class:`${e}-tabs-rail`,ref:"tabsRailElRef"},L?S.map((p,c)=>(v.value.push(p.props.name),b(ie,Object.assign({},p.props,{internalCreatedByPane:!0,internalLeftPadded:c!==0}),p.children?{default:p.children.tab}:void 0))):R.map((p,c)=>(v.value.push(p.props.name),c===0?p:Se(p)))):b(ge,{onResize:this.handleNavResize},{default:()=>b("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},["top","bottom"].includes(E)?b(_t,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:_}):b("div",{class:`${e}-tabs-nav-y-scroll`,onScroll:this.handleScroll},_()))}),u&&l&&$?we(l,!0):null,he(m,p=>p&&b("div",{class:`${e}-tabs-nav__suffix`},p))),L&&(this.animated&&(E==="top"||E==="bottom")?b("div",{ref:"tabsPaneWrapperRef",style:x,class:[`${e}-tabs-pane-wrapper`,g]},ye(S,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):ye(S,this.mergedValue,this.renderedNames)))}});function ye(e,n,d,u,l,h,v){const f=[];return e.forEach(g=>{const{name:x,displayDirective:y,"display-directive":w}=g.props,m=R=>y===R||w===R,S=n===x;if(g.key!==void 0&&(g.key=x),S||m("show")||m("show:lazy")&&d.has(x)){d.has(x)||d.add(x);const R=!m("if");f.push(R?Pt(g,[[Wt,S]]):g)}}),v?b(Lt,{name:`${v}-transition`,onBeforeLeave:u,onEnter:l,onAfterEnter:h},{default:()=>f}):f}function we(e,n){return b(ie,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:n,disabled:typeof e=="object"&&e.disabled})}function Se(e){const n=At(e);return n.props?n.props.internalLeftPadded=!0:n.props={internalLeftPadded:!0},n}function oe(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}export{ea as N,ie as a};
