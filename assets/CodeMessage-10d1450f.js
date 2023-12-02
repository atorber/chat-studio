import{b as F,dI as O,s as j,L as K,k as C,f as U,j as L,g as Z,d as H,P as A,q as N,o as G,w as _,t as M,n as S,D as J,h as z,a0 as W,a1 as o,a4 as Q,a5 as X,a6 as Y,a7 as g,aa as p,a8 as v,ab as ee,ac as ne,a9 as te,av as oe,a2 as le}from"./index-60f5c441.js";function se(e,n){const l=F(O,null);return j(()=>e.hljs||(l==null?void 0:l.mergedHljsRef.value))}const ie=e=>{const{textColor2:n,fontSize:l,fontWeightStrong:s,textColor3:h}=e;return{textColor:n,fontSize:l,fontWeightStrong:s,"mono-3":"#a0a1a7","hue-1":"#0184bb","hue-2":"#4078f2","hue-3":"#a626a4","hue-4":"#50a14f","hue-5":"#e45649","hue-5-2":"#c91243","hue-6":"#986801","hue-6-2":"#c18401",lineNumberTextColor:h}},re={name:"Code",common:K,self:ie},ae=re,ce=C([U("code",`
 font-size: var(--n-font-size);
 font-family: var(--n-font-family);
 `,[L("show-line-numbers",`
 display: flex;
 `),Z("line-numbers",`
 user-select: none;
 padding-right: 12px;
 text-align: right;
 transition: color .3s var(--n-bezier);
 color: var(--n-line-number-text-color);
 `),L("word-wrap",[C("pre",`
 white-space: pre-wrap;
 word-break: break-all;
 `)]),C("pre",`
 margin: 0;
 line-height: inherit;
 font-size: inherit;
 font-family: inherit;
 `),C("[class^=hljs]",`
 color: var(--n-text-color);
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),({props:e})=>{const n=`${e.bPrefix}code`;return[`${n} .hljs-comment,
 ${n} .hljs-quote {
 color: var(--n-mono-3);
 font-style: italic;
 }`,`${n} .hljs-doctag,
 ${n} .hljs-keyword,
 ${n} .hljs-formula {
 color: var(--n-hue-3);
 }`,`${n} .hljs-section,
 ${n} .hljs-name,
 ${n} .hljs-selector-tag,
 ${n} .hljs-deletion,
 ${n} .hljs-subst {
 color: var(--n-hue-5);
 }`,`${n} .hljs-literal {
 color: var(--n-hue-1);
 }`,`${n} .hljs-string,
 ${n} .hljs-regexp,
 ${n} .hljs-addition,
 ${n} .hljs-attribute,
 ${n} .hljs-meta-string {
 color: var(--n-hue-4);
 }`,`${n} .hljs-built_in,
 ${n} .hljs-class .hljs-title {
 color: var(--n-hue-6-2);
 }`,`${n} .hljs-attr,
 ${n} .hljs-variable,
 ${n} .hljs-template-variable,
 ${n} .hljs-type,
 ${n} .hljs-selector-class,
 ${n} .hljs-selector-attr,
 ${n} .hljs-selector-pseudo,
 ${n} .hljs-number {
 color: var(--n-hue-6);
 }`,`${n} .hljs-symbol,
 ${n} .hljs-bullet,
 ${n} .hljs-link,
 ${n} .hljs-meta,
 ${n} .hljs-selector-id,
 ${n} .hljs-title {
 color: var(--n-hue-2);
 }`,`${n} .hljs-emphasis {
 font-style: italic;
 }`,`${n} .hljs-strong {
 font-weight: var(--n-font-weight-strong);
 }`,`${n} .hljs-link {
 text-decoration: underline;
 }`]}]),he=Object.assign(Object.assign({},S.props),{language:String,code:{type:String,default:""},trim:{type:Boolean,default:!0},hljs:Object,uri:Boolean,inline:Boolean,wordWrap:Boolean,showLineNumbers:Boolean,internalFontSize:Number,internalNoHighlight:Boolean}),ue=H({name:"Code",props:he,setup(e,{slots:n}){const{internalNoHighlight:l}=e,{mergedClsPrefixRef:s,inlineThemeDisabled:h}=A(),r=N(null),d=l?{value:void 0}:se(e),$=(t,a,i)=>{const{value:c}=d;return!c||!(t&&c.getLanguage(t))?null:c.highlight(i?a.trim():a,{language:t}).value},w=j(()=>e.inline||e.wordWrap?!1:e.showLineNumbers),k=()=>{if(n.default)return;const{value:t}=r;if(!t)return;const{language:a}=e,i=e.uri?window.decodeURIComponent(e.code):e.code;if(a){const u=$(a,i,e.trim);if(u!==null){if(e.inline)t.innerHTML=u;else{const b=t.querySelector(".__code__");b&&t.removeChild(b);const f=document.createElement("pre");f.className="__code__",f.innerHTML=u,t.appendChild(f)}return}}if(e.inline){t.textContent=i;return}const c=t.querySelector(".__code__");if(c)c.textContent=i;else{const u=document.createElement("pre");u.className="__code__",u.textContent=i,t.innerHTML="",t.appendChild(u)}};G(k),_(M(e,"language"),k),_(M(e,"code"),k),l||_(d,k);const R=S("Code","-code",ce,ae,e,s),x=j(()=>{const{common:{cubicBezierEaseInOut:t,fontFamilyMono:a},self:{textColor:i,fontSize:c,fontWeightStrong:u,lineNumberTextColor:b,"mono-3":f,"hue-1":B,"hue-2":V,"hue-3":P,"hue-4":E,"hue-5":T,"hue-5-2":I,"hue-6":q,"hue-6-2":D}}=R.value,{internalFontSize:y}=e;return{"--n-font-size":y?`${y}px`:c,"--n-font-family":a,"--n-font-weight-strong":u,"--n-bezier":t,"--n-text-color":i,"--n-mono-3":f,"--n-hue-1":B,"--n-hue-2":V,"--n-hue-3":P,"--n-hue-4":E,"--n-hue-5":T,"--n-hue-5-2":I,"--n-hue-6":q,"--n-hue-6-2":D,"--n-line-number-text-color":b}}),m=h?J("code",j(()=>`${e.internalFontSize||"a"}`),x,e):void 0;return{mergedClsPrefix:s,codeRef:r,mergedShowLineNumbers:w,lineNumbers:j(()=>{let t=1;const a=[];let i=!1;for(const c of e.code)c===`
`?(i=!0,a.push(t++)):i=!1;return i||a.push(t++),a.join(`
`)}),cssVars:h?void 0:x,themeClass:m==null?void 0:m.themeClass,onRender:m==null?void 0:m.onRender}},render(){var e,n;const{mergedClsPrefix:l,wordWrap:s,mergedShowLineNumbers:h,onRender:r}=this;return r==null||r(),z("code",{class:[`${l}-code`,this.themeClass,s&&`${l}-code--word-wrap`,h&&`${l}-code--show-line-numbers`],style:this.cssVars,ref:"codeRef"},h?z("pre",{class:`${l}-code__line-numbers`},this.lineNumbers):null,(n=(e=this.$slots).default)===null||n===void 0?void 0:n.call(e))}}),de=W("copy",!0,function(e){return o("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[o("path",{d:"M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),o("path",{d:"M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z",fill:e.colors[1],stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linejoin":e.strokeLinejoin},null)])}),me=W("stretching",!0,function(e){return o("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[o("g",{"clip-path":"url(#"+e.id+"44a4c228)"},[o("path",{d:"M23.0005 5.99951H8.00049C6.89592 5.99951 6.00049 6.89494 6.00049 7.99951V39.9999C6.00049 41.1044 6.89592 41.9998 8.00049 41.9998H40.0005C41.1051 41.9998 42.0005 41.1044 42.0005 39.9998V24.9998",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),o("path",{d:"M24.001 15.9998V23.9998",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),o("path",{d:"M42 5.99951V13.9995",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),o("path",{d:"M32.001 23.9998H24.001",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null),o("path",{d:"M42 5.99951L24 23.9995",stroke:e.colors[0],"stroke-width":e.strokeWidth},null),o("path",{d:"M42.0005 5.99951H34.0005",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap},null)]),o("defs",null,[o("clipPath",{id:e.id+"44a4c228"},[o("rect",{width:"48",height:"48",fill:e.colors[2]},null)])])])}),fe=function(){return window.$message},ge={class:"el-header tools"},ve=["lineMumber"],je=H({__name:"CodeMessage",props:{extra:{},data:{},maxWidth:{}},setup(e){const n=e,l=n.extra.code.trim().split(`
`).length,s=N(!1),h=()=>{oe(n.extra.code,()=>{fe().success("复制成功")})};return(r,d)=>{const $=Q("n-icon");return X(),Y("section",{class:te(["im-message-code el-container is-vertical",{maxwidth:r.maxWidth,full:s.value}])},[g("header",ge,[g("p",null,"# "+p(r.extra.lang),1),g("p",null,[o($,{class:"icon",component:v(me),onClick:d[0]||(d[0]=w=>s.value=!s.value)},null,8,["component"]),o($,{class:"icon",component:v(de),onClick:h},null,8,["component"])])]),g("main",{class:"el-main me-scrollbar me-scrollbar-thumb",lineMumber:v(l)},[o(v(ue),{language:r.extra.lang,code:r.extra.code,"show-line-numbers":""},null,8,["language","code"]),ee(g("div",{class:"el-footer mask pointer",onClick:d[1]||(d[1]=w=>s.value=!s.value)}," 查看更多 ",512),[[ne,v(l)>20]])],8,ve)],2)}}});const ke=le(je,[["__scopeId","data-v-5204e1ad"]]);export{ke as default};
