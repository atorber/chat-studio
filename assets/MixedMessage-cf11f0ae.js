import{t as h}from"./emojis-8bc4b3f0.js";import{t as f}from"./strings-8042df5b.js";import{g as x}from"./functions-6cdcd192.js";import{d as g,a5 as a,a6 as n,a7 as d,al as t,$ as i,ah as _,a8 as s,de as u,a1 as y,ad as M,a9 as k,a2 as v}from"./index-4fb8a37c.js";import{N as w}from"./Image-3bee88dd.js";import"./ImageGroup-838b89eb.js";const N=["innerHTML"],I=g({__name:"MixedMessage",props:{extra:{},data:{},maxWidth:{}},setup(l){const p=l.data.float,c=(r,o=200)=>{const e=x(r);if(e.width==0||e.height==0)return{};if(e.width<o)return{width:`${e.width}px`,height:`${e.height}px`};let m=e.height/(e.width/o);return{width:o+"px",height:m+"px"}};return(r,o)=>(a(),n("div",{class:k(["im-message-mixed",{left:s(p)=="left",right:s(p)=="right",maxwidth:r.maxWidth}])},[d("pre",null,[t("      "),(a(!0),n(i,null,_(r.extra.items,e=>(a(),n(i,{key:e.id},[t(`
   
        `),e.type===1?(a(),n(i,{key:0},[t(`
               `),d("span",{innerHTML:s(h)(s(f)(e.content))},null,8,N),t(`
        `)],64)):e.type===3?(a(),n(i,{key:1},[t(`
          `),d("div",{style:u([c(e.content,300),{display:"flex",margin:"5px 0","border-radius":"8px",overflow:"hidden"}])},[t(`
            `),y(s(w),{src:e.content},null,8,["src"]),t(`
          `)],4),t(`
        `)],64)):M("",!0),t(`
      `)],64))),128)),t(`
    `)])],2))}});const z=v(I,[["__scopeId","data-v-a9b95f44"]]);export{z as default};
