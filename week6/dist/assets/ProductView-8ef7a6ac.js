import{_ as l,m as h,o as i,c as d,b as s,t as r,h as n,i as m,v as _,g}from"./index-010d87b4.js";import{b as y,a as v}from"./apiPath-d235c8af.js";const b={name:"ProductView",props:["productId"],data(){return{product:[],qty:1}},methods:{...h(g,["setLoading"]),getProduct(){this.setLoading(1),this.$http.get(`${y}/${this.productId}`).then(e=>{this.product=e.data.product}).catch(e=>{alert(e.response.data.message),this.$router.push("/products")}).then(()=>{this.setLoading(-1)})},addToCart(e,o=1){this.setLoading(1);const p={product_id:e,qty:o};this.$http.post(v,{data:p}).then(c=>{alert(c.data.message)}).catch(c=>{alert(c.response.data.message)}).then(()=>{this.setLoading(-1)})}},mounted(){this.getProduct()}},f={class:"row"},k={class:"col-sm-6"},C=["src"],L={class:"col-sm-6"},P={class:"badge bg-primary rounded-pill"},V={key:0,class:"h5"},q={key:1,class:"h6"},w={key:2,class:"h5"},x={class:"input-group"};function U(e,o,p,c,t,a){return i(),d("div",f,[s("div",k,[s("img",{class:"img-fluid",src:t.product.imagesUrl,alt:""},null,8,C)]),s("div",L,[s("span",P,r(t.product.category),1),s("p",null,"商品描述："+r(t.product.description),1),s("p",null,"商品內容："+r(t.product.content),1),t.product.price?n("",!0):(i(),d("div",V,r(t.product.origin_price)+" 元",1)),t.product.price?(i(),d("del",q,"原價 "+r(t.product.origin_price)+" 元",1)):n("",!0),t.product.price?(i(),d("div",w,"現在只要 "+r(t.product.price)+" 元",1)):n("",!0),s("div",null,[s("div",x,[m(s("input",{type:"number",class:"form-control","onUpdate:modelValue":o[0]||(o[0]=u=>t.qty=u),min:"1"},null,512),[[_,t.qty,void 0,{number:!0}]]),s("button",{type:"button",class:"btn btn-primary",onClick:o[1]||(o[1]=u=>a.addToCart(t.product.id,t.qty))}," 加入購物車 ")])])])])}const D=l(b,[["render",U]]);export{D as default};
