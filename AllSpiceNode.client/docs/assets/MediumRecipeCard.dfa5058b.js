import{_ as a,o as r,c as d,a as e,t as o,u as n,p as _,e as p}from"./index.28fefcaa.js";const l={props:{recipe:{type:Object,required:!0}},setup(){let s=n();return{navToRecipe(c){console.log(c),s.push({name:"Recipe",params:{id:c}})}}}},u=s=>(_("data-v-d987b94d"),s=s(),p(),s),h={class:"component"},m={class:"bg-light rounded mb-4 card-container"},v={class:""},f=["src","alt"],x={class:"p-2"},b={class:"text-primary"},g={class:"d-flex"},y={class:"text-primary"},R=u(()=>e("span",{class:"text-dark"},"By: ",-1)),k=["href"];function B(s,c,t,i,I,S){return r(),d("div",h,[e("div",m,[e("div",v,[e("img",{src:t.recipe.picture,class:"recipe-img rounded-top",onClick:c[0]||(c[0]=C=>i.navToRecipe(t.recipe.id)),alt:t.recipe.title},null,8,f)]),e("div",x,[e("h4",b,o(t.recipe.title),1),e("p",null,o(t.recipe.subtitle),1),e("div",g,[e("p",y,[R,e("a",{href:`/#/profile/${t.recipe.creator.id}`},[e("u",null,o(t.recipe.creator.name),1)],8,k)])])])])])}const T=a(l,[["render",B],["__scopeId","data-v-d987b94d"]]);export{T as M};
