import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home'
import loginpage from '../page/loginPage'
import userHomepage from  '../page/userHomepage'
import dynamicPage from '../page/dynamicPage'
import messagePage from '../page/messagePage'
import dialogBoxPage from '../page/dialogBoxPage'
import registerPage from "../page/registerPage";
import releasePage from "../page/releasePage"
import diseasePage from '../page/diseasePage'
import diseaseLiPage from '../page/diseaseLiPage'
import diseaseContentPage from '../page/diseaseContentPage'
import sharePage from '../page/sharePage'
import searchPage from '../page/searchPage'
import personalInformationPage from '../page/personalInformationPage'
import hotPage from '../page/hotPage'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/login',
      name:'loginpage',
      component: loginpage
    },
    {
      path:'/register',
      name:'registerpage',
      component: registerPage,
    },
    {
      path:'/',
      name:'home',
      component: home
    },
    {
      path:'/homepage',
      name:'userHomepage',
      component: userHomepage
    },
    {
      path:'/dynamicpage',
      name:'dynamicPage',
      component:dynamicPage
    },
    {
      path:'/messagepage',
      name:'messagePage',
      component:messagePage,
    },
    {
      path:'/dialogboxpage',
      name:'dialogBoxPage',
      component:dialogBoxPage
    },
    {
      path:'/releasepage',
      name:'releasePage',
      component:releasePage
    },
    {
      path:'/diseasepage',
      name:'diseasePage',
      component:diseasePage
    },
    {
      path:'/diseaselipage',
      name:'diseaseLiPage',
      component:diseaseLiPage
    },
    {
      path:'/diseasecontentpage',
      name:'diseaseContentPage',
      component:diseaseContentPage
    },
    {
      path:'/sharepage',
      name:'sharePage',
      component:sharePage
    },
    {
      path:'/searchpage',
      name:'searchPage',
      component:searchPage
    },
    {
      path:'/personalinformationpage',
      name:'personalInformationPage',
      component:personalInformationPage
    },
    {
      path:'/hotpage',
      name:'hotPage',
      component:hotPage
    },
  ]
})
new Vue({
  el: '#app',
  Router,//将这样的router放到根目录里面
  //  es6 通过render方法来使用外部引入的App组件
  Render: h => h(App)
})
