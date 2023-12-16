import{t as h}from"./emojis-8bc4b3f0.js";import{t as x}from"./strings-8042df5b.js";import{g as f}from"./functions-482ce1a5.js";import{d as g,c as a,i as n,f as d,A as t,F as i,y as _,a as s,b$ as u,g as y,aO as M,l as k,j as v,_ as w}from"./index-3ccc3e49.js";const N=["innerHTML"],I=g({__name:"MixedMessage",props:{extra:{},data:{},maxWidth:{}},setup(p){const l=p.data.float,c=(r,o=200)=>{const e=f(r);if(e.width==0||e.height==0)return{};if(e.width<o)return{width:`${e.width}px`,height:`${e.height}px`};let m=e.height/(e.width/o);return{width:o+"px",height:m+"px"}};return(r,o)=>(a(),n("div",{class:v(["im-message-mixed",{left:s(l)=="left",right:s(l)=="right",maxwidth:r.maxWidth}])},[d("pre",null,[t("      "),(a(!0),n(i,null,_(r.extra.items,e=>(a(),n(i,{key:e.id},[t(`
   
        `),e.type===1?(a(),n(i,{key:0},[t(`
               `),d("span",{innerHTML:s(h)(s(x)(e.content))},null,8,N),t(`
        `)],64)):e.type===3?(a(),n(i,{key:1},[t(`
          `),d("div",{style:u([c(e.content,300),{display:"flex",margin:"5px 0","border-radius":"8px",overflow:"hidden"}])},[t(`
            `),y(s(M),{src:e.content},null,8,["src"]),t(`
          `)],4),t(`
        `)],64)):k("",!0),t(`
      `)],64))),128)),t(`
    `)])],2))}});const $=w(I,[["__scopeId","data-v-90737924"]]);export{$ as default};
