import{_,R as m,a as f,k,r as i,o as a,c as d,b as n,d as o,w as s,e,l as x,p as h,g as w}from"./index-6c1bda23.js";const V={name:"AdminView",components:{RouterLink:m,RouterView:f},methods:{logout(){document.cookie="token=;",this.$router.push("/")}},computed:{...k(w,["isLogin"])}},g=n("h2",{class:"text-center"},"後台頁面",-1),R={class:"mb-2"},L={class:"d-flex justify-content-center"};function v(l,c,B,y,C,r){const t=i("RouterLink"),u=i("RouterView");return a(),d("div",null,[g,n("header",R,[n("nav",L,[o(t,{class:"px-3",to:"/"},{default:s(()=>[e("前台首頁")]),_:1}),e(" | "),o(t,{class:"px-3",to:"/admin/products"},{default:s(()=>[e("管理產品")]),_:1}),e(" | "),o(t,{class:"px-3",to:"/admin/orders"},{default:s(()=>[e("管理訂單")]),_:1}),e(" | "),l.isLogin?(a(),d("a",{key:0,class:"px-3",href:"#",onClick:c[0]||(c[0]=x((...p)=>r.logout&&r.logout(...p),["prevent"]))},"登出")):(a(),h(t,{key:1,class:"px-3",to:"/admin/login"},{default:s(()=>[e("登入")]),_:1})),e(" | ")])]),o(u)])}const $=_(V,[["render",v]]);export{$ as default};
