import{_ as k,m as L,r as g,o as r,c as d,b as e,h as m,F as C,f as U,t as u,d as n,w as q,g as w,e as b,i as V,v as x,j as f}from"./index-010d87b4.js";import{a as v,c as F,d as O}from"./apiPath-d235c8af.js";const A={name:"CartView",data(){return{cart:{},form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{...L(w,["setLoading"]),getCart(){this.setLoading(1),this.$http.get(v).then(a=>{this.cart=a.data.data}).catch(a=>{alert(a.response.data.message)}).then(()=>{this.setLoading(-1)})},updateCart(a){this.setLoading(1);const t={product_id:a.product_id,qty:a.qty};this.$http.put(`${v}/${a.id}`,{data:t}).then(h=>{alert(h.data.message),this.setLoading(-1),this.getCart()}).catch(h=>{alert(h.response.data.message),this.setLoading(-1)})},deleteAllCarts(){this.setLoading(1),this.$http.delete(F).then(a=>{alert(a.data.message),this.getCart()}).catch(a=>{alert(a.response.data.message),this.setLoading(-1)})},removeCartItem(a){this.setLoading(1),this.$http.delete(`${v}/${a}`).then(t=>{alert(t.data.message),this.setLoading(-1),this.getCart()}).catch(t=>{alert(t.response.data.message)}).then(()=>{this.setLoading(-1)})},createOrder(){const a=this.form;if(this.cart.carts.length<1)return alert("購物車為空，請加入商品"),!1;this.setLoading(1),this.$http.post(O,{data:a}).then(t=>{alert(t.data.message),this.$refs.form.resetForm(),this.form.message="",this.getCart()}).catch(t=>{alert(t.response.data.message)}).then(()=>{this.setLoading(-1)})}},mounted(){this.getCart()}},N={class:"text-end"},S={class:"table align-middle"},B=e("thead",null,[e("tr",null,[e("th"),e("th",null,"品名"),e("th",{style:{width:"150px"}},"數量/單位"),e("th",null,"單價")])],-1),E=["onClick"],j=e("i",{class:"fas fa-spinner fa-pulse"},null,-1),D={key:0,class:"text-success"},I={class:"input-group input-group-sm"},T={class:"input-group mb-3"},z=["onUpdate:modelValue","onChange"],M={class:"input-group-text",id:"basic-addon2"},G={class:"text-end"},H={key:0,class:"text-success"},J=e("td",{colspan:"3",class:"text-end"},"總計",-1),K={class:"text-end"},P={key:0},Q=e("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),R={class:"text-end text-success"},W={class:"my-5 row justify-content-center"},X={class:"mb-3"},Y=e("label",{for:"email",class:"form-label"},"Email",-1),Z={class:"mb-3"},$=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),ee={class:"mb-3"},te=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),se={class:"mb-3"},ae=e("label",{for:"address",class:"form-label"},"收件人地址",-1),le={class:"mb-3"},oe=e("label",{for:"message",class:"form-label"},"留言",-1),ne={class:"text-end"},re=["disabled"];function de(a,t,h,ie,s,c){const _=g("VField"),p=g("error-message"),y=g("VForm");return r(),d(C,null,[e("div",N,[s.cart.total?(r(),d("button",{key:0,class:"btn btn-outline-danger",type:"button",onClick:t[0]||(t[0]=(...l)=>c.deleteAllCarts&&c.deleteAllCarts(...l))}," 清空購物車 ")):m("",!0)]),e("table",S,[B,e("tbody",null,[s.cart.carts?(r(!0),d(C,{key:0},U(s.cart.carts,l=>(r(),d("tr",{key:l.id},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:i=>c.removeCartItem(l.id)},[j,b(" x ")],8,E)]),e("td",null,[b(u(l.product.title)+" ",1),l.coupon?(r(),d("div",D,"已套用優惠券")):m("",!0)]),e("td",null,[e("div",I,[e("div",T,[V(e("input",{min:"1","onUpdate:modelValue":i=>l.qty=i,onChange:i=>c.updateCart(l),type:"number",class:"form-control"},null,40,z),[[x,l.qty,void 0,{number:!0}]]),e("span",M,u(l.product.unit),1)])])]),e("td",G,[s.cart.final_total!==s.cart.total?(r(),d("small",H,"折扣價：")):m("",!0),b(" "+u(l.final_total),1)])]))),128)):m("",!0)]),e("tfoot",null,[e("tr",null,[J,e("td",K,u(s.cart.total),1)]),s.cart.final_total!==s.cart.total?(r(),d("tr",P,[Q,e("td",R,u(s.cart.final_total),1)])):m("",!0)])]),e("div",W,[n(y,{ref:"form",class:"col-md-6",onSubmit:c.createOrder},{default:q(({errors:l,meta:i})=>[e("div",X,[Y,n(_,{modelValue:s.form.user.email,"onUpdate:modelValue":t[1]||(t[1]=o=>s.form.user.email=o),id:"email",name:"email",type:"email",class:f(["form-control",{"is-invalid":l.email}]),placeholder:"請輸入 Email",rules:"email|required"},null,8,["modelValue","class"]),n(p,{name:"email",class:"invalid-feedback"})]),e("div",Z,[$,n(_,{modelValue:s.form.user.name,"onUpdate:modelValue":t[2]||(t[2]=o=>s.form.user.name=o),id:"name",name:"姓名",type:"text",class:f(["form-control",{"is-invalid":l.姓名}]),placeholder:"請輸入姓名",rules:"required"},null,8,["modelValue","class"]),n(p,{name:"姓名",class:"invalid-feedback"})]),e("div",ee,[te,n(_,{modelValue:s.form.user.tel,"onUpdate:modelValue":t[3]||(t[3]=o=>s.form.user.tel=o),id:"tel",name:"電話",type:"tel",class:f(["form-control",{"is-invalid":l.電話}]),placeholder:"請輸入電話",rules:"required|min:8|max:10"},null,8,["modelValue","class"]),n(p,{name:"電話",class:"invalid-feedback"})]),e("div",se,[ae,n(_,{modelValue:s.form.user.address,"onUpdate:modelValue":t[4]||(t[4]=o=>s.form.user.address=o),id:"address",name:"地址",type:"text",class:f(["form-control",{"is-invalid":l.地址}]),placeholder:"請輸入地址",rules:"required"},null,8,["modelValue","class"]),n(p,{name:"地址",class:"invalid-feedback"})]),e("div",le,[oe,V(e("textarea",{"onUpdate:modelValue":t[5]||(t[5]=o=>s.form.message=o),id:"message",class:"form-control",cols:"30",rows:"10"},null,512),[[x,s.form.message]])]),e("div",ne,[e("button",{disabled:!(s.cart.total&&i.dirty&&i.valid),type:"submit",class:"btn btn-danger"}," 送出訂單 ",8,re)])]),_:1},8,["onSubmit"])])],64)}const ue=k(A,[["render",de]]);export{ue as default};
