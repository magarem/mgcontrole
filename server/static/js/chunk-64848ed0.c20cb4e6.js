(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64848ed0"],{2017:function(t,n,e){"use strict";var o=e("cafe"),s=e.n(o);s.a},"271a":function(t,n,e){"use strict";var o=e("9675"),s=e.n(o);s.a},9675:function(t,n,e){},"9ed6":function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"login-container"},[e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,autocomplete:"on","label-position":"left"}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[t._v("MG Control")])]),e("el-form-item",{attrs:{prop:"domain"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"star"}})],1),e("el-input",{ref:"domain",attrs:{placeholder:"Domínio",name:"domain",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.domain,callback:function(n){t.$set(t.loginForm,"domain",n)},expression:"loginForm.domain"}})],1),e("el-form-item",{attrs:{prop:"username"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"user"}})],1),e("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.username,callback:function(n){t.$set(t.loginForm,"username",n)},expression:"loginForm.username"}})],1),e("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(n){t.capsTooltip=n},expression:"capsTooltip"}},[e("el-form-item",{attrs:{prop:"password"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"password"}})],1),e("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"Password",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(n){t.capsTooltip=!1}},nativeOn:{keyup:[function(n){return t.checkCapslock(n)},function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.handleLogin(n)}]},model:{value:t.loginForm.password,callback:function(n){t.$set(t.loginForm,"password",n)},expression:"loginForm.password"}}),e("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[e("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1)],1),e("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(n){return n.preventDefault(),t.handleLogin(n)}}},[t._v("Login")]),e("div",{staticStyle:{position:"relative"}},[e("div",{staticClass:"tips"},[e("span",[t._v("Username : admin")]),e("span",[t._v("Password : any")])]),e("div",{staticClass:"tips"},[e("span",{staticStyle:{"margin-right":"18px"}},[t._v("Username : editor")]),e("span",[t._v("Password : any")])]),e("el-button",{staticClass:"thirdparty-button",attrs:{type:"primary"},on:{click:function(n){t.showDialog=!0}}},[t._v(" Or connect with ")])],1)],1),e("el-dialog",{attrs:{title:"Or connect with",visible:t.showDialog},on:{"update:visible":function(n){t.showDialog=n}}},[t._v(" Can not be simulated on local, so please combine you own business simulation! ! ! "),e("br"),e("br"),e("br"),e("social-sign")],1)],1)},s=[],a=(e("13d5"),e("b64b"),e("61f7")),i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"social-signup-container"},[e("div",{staticClass:"sign-btn",on:{click:function(n){return t.wechatHandleClick("wechat")}}},[e("span",{staticClass:"wx-svg-container"},[e("svg-icon",{staticClass:"icon",attrs:{"icon-class":"wechat"}})],1),t._v(" WeChat ")]),e("div",{staticClass:"sign-btn",on:{click:function(n){return t.tencentHandleClick("tencent")}}},[e("span",{staticClass:"qq-svg-container"},[e("svg-icon",{staticClass:"icon",attrs:{"icon-class":"qq"}})],1),t._v(" QQ ")])])},r=[],l={name:"SocialSignin",methods:{wechatHandleClick:function(t){alert("ok")},tencentHandleClick:function(t){alert("ok")}}},c=l,u=(e("d9fb"),e("2877")),d=Object(u["a"])(c,i,r,!1,null,"7309fbbb",null),p=d.exports,m={name:"Login",components:{SocialSign:p},data:function(){var t=function(t,n,e){Object(a["d"])(n)?e():e(new Error("Please enter the correct user name"))};return{loginForm:{domain:null,username:"admin",password:"111111"},loginRules:{domain:[{required:!0,trigger:"blur"}],username:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur"}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(t){var n=t.query;n&&(this.redirect=n.redirect,this.otherQuery=this.getOtherQuery(n))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{checkCapslock:function(t){var n=t.key;this.capsTooltip=n&&1===n.length&&n>="A"&&n<="Z"},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(n){if(!n)return console.log("error submit!!"),!1;t.loading=!0,console.log(t.loginForm),t.$store.dispatch("user/login",t.loginForm).then((function(){console.log("llll>1"),t.$router.push({path:t.redirect||"/",query:t.otherQuery}),t.loading=!1,console.log("llll>2")})).catch((function(){console.log("!"),t.loading=!1}))}))},getOtherQuery:function(t){return Object.keys(t).reduce((function(n,e){return"redirect"!==e&&(n[e]=t[e]),n}),{})}}},g=m,f=(e("2017"),e("271a"),Object(u["a"])(g,o,s,!1,null,"6529e1d8",null));n["default"]=f.exports},a9b3:function(t,n,e){},cafe:function(t,n,e){},d9fb:function(t,n,e){"use strict";var o=e("a9b3"),s=e.n(o);s.a}}]);