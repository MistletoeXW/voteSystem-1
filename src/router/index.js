import Vue from 'vue'
import Router from 'vue-router'
import Login from 'pages/login/login'
import SelectBranchVoter from 'pages/selectBranch/selectBranchvoter'
import SelectBranchCount from 'pages/selectBranch/selectBranchcount'
import SelectBranchCount2 from 'pages/selectBranch/selectBranchcount2'
import SelectBranchControl from 'pages/selectBranch/selectBranchcontrol'
import SelectBranchControl2 from 'pages/selectBranch/SelectBranchcontrol2'
import SelectBranchControl3 from 'pages/selectBranch/selectBranchcontrol3'
import SelectBranchControl4 from 'pages/selectBranch/selectBranchcontrol4'
// import SelectBranch from 'pages/selectBranch/selectBranch'
// import Vote from 'pages/vote/vote'
import control from '@/pages/directory/control.vue'
import scontrol from '@/pages/specifics/control.vue'
import count from '@/pages/directory/count.vue'
import vote from '@/pages/directory/vote.vue'
import svote from '@/pages/specifics/vote.vue'
import scount from '@/pages/specifics/count.vue'
import offNetwork from '@/pages/directory/offNetwork.vue'
import soffNetwork from '@/pages/specifics/offNetwork.vue'

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {name: 'login'}
    }, {
      path: '/login',
      name: 'login',
      component:resolve => require(['@/pages/login/login'], resolve),
    }, {
      path: '/logout',
      name: 'logout',
      beforeEnter(to, from, next) {
        localStorage.clear();
        next({name: 'login'})
      }
    }, {
      path: '/selectBranchControl',
      name: 'selectBranchcontrol',
      component:resolve => require(['@/pages/selectBranch/selectBranchcontrol'], resolve),
      children:[
        {
          path:'control',
          name:'controlentirety',
          component:control
        },{
          path:"count",
          name:'countentirety',
          component:resolve => require(['@/pages/directory/count.vue'], resolve),
     
        },{
          path:"vote",
          name:'voteentirety',
          component:resolve => require(['@/pages/directory/vote.vue'], resolve),
        },{
          path:'offNetwork',
          name:'offNetworkentirety',
          component:resolve => require(['@/pages/directory/offNetwork.vue'], resolve),
        },{
          path: 'specifics/control',
          name: 'scontrol',
          component:resolve => require(['@/pages/specifics/control.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },{
          path: 'specifics/count',
          name: 'scount',
          // component: scount,
          component:resolve => require(['@/pages/specifics/count.vue'], resolve),
         
          meta: {
            requiresAuth: true
          }
        },{
          path: 'specifics/vote',
          name: 'svote',
          component:resolve => require(['@/pages/specifics/vote.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },{
          path:'specifics/offNetwork',
          name:'soffNetwork',
          component:resolve => require(['@/pages/specifics/offNetwork.vue'], resolve),
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/selectBranchControl2',
      name: 'selectBranchcontrol2',
      // component: SelectBranchControl2, 
      component:resolve => require(['@/pages/selectBranch/SelectBranchcontrol2'], resolve),
   
      children:[
        {
          path:'control',
          name:'controlentirety',
          component:resolve => require(['@/pages/directory/control.vue'], resolve),
   
        },{
          path:"count",
          name:'countentirety',
          // component:count
          component:resolve => require(['@/pages/directory/count.vue'], resolve),
   
        },{
          path:'offNetwork',
          name:'offNetworkentirety',
          // component:offNetwork
          component:resolve => require(['@/pages/directory/offNetwork.vue'], resolve),
   
        },
        {
          path: 'specifics/control',
          name: 'scontrol',
          // component: scontrol,
          component:resolve => require(['@/pages/specifics/control.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },{
          path: 'specifics/count',
          name: 'scount',
          // component: scount,
          component:resolve => require(['@/pages/specifics/count.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },{
          path:'specifics/offNetwork',
          name:'soffNetwork',
          // component:soffNetwork,
          component:resolve => require(['@/pages/specifics/offNetwork.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/selectBranchControl3',
      name: 'selectBranchcontrol3',
      // component: SelectBranchControl3, 
      component:resolve => require(['@/pages/selectBranch/selectBranchcontrol3'], resolve),
   
      children:[
        {
          path:'control',
          name:'controlentirety',
          component:resolve => require(['@/pages/directory/control.vue'], resolve),
   
        },{
          path:"vote",
          name:'voteentirety',
          // component:vote
          component:resolve => require(['@/pages/directory/vote.vue'], resolve),
   
        }, {
          path: 'specifics/control',
          name: 'scontrol',
          // component: scontrol,
          component:resolve => require(['@/pages/specifics/control.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },{
          path: 'specifics/vote',
          name: 'svote',
          // component: svote,
          component:resolve => require(['@/pages/specifics/vote.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/selectBranchControl4',
      name: 'selectBranchcontrol4',
      // component: SelectBranchControl4, 
      component:resolve => require(['@/pages/selectBranch/selectBranchcontrol4'], resolve),
   
      children:[
        {
          path:'control',
          name:'controlentirety',
          component:resolve => require(['@/pages/directory/control.vue'], resolve),
   
        }, {
          path: 'specifics/control',
          name: 'scontrol',
          // component: scontrol,
          component:resolve => require(['@/pages/specifics/control.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/selectBranchVoter',
      name: 'selectBranchvote',
      // component: SelectBranchVoter,
      component:resolve => require(['@/pages/selectBranch/selectBranchvoter'], resolve),
   
      children:[
        {
          path:"vote",
          name:'voteentirety',
          // component:vote
          component:resolve => require(['@/pages/directory/vote.vue'], resolve),
   
        }, {
          path: 'specifics/vote',
          name: 'svoteentirety',
          // component: svote,
          component:resolve => require(['@/pages/specifics/vote.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },  {
      path: '/selectBranchCount',
      name: 'selectBranchcount',
      // component: SelectBranchCount,
      component:resolve => require(['@/pages/selectBranch/selectBranchcount'], resolve),
   
      children:[
       {
          path:"count",
          name:'countentirety',
          component:resolve => require(['@/pages/directory/count.vue'], resolve),
   
        },{
          path:"vote",
          name:'voteentirety',
          // component:vote
          component:resolve => require(['@/pages/directory/vote.vue'], resolve),
   
        },{
          path:'offNetwork',
          name:'offNetworkentirety',
          // component:offNetwork
          component:resolve => require(['@/pages/directory/offNetwork.vue'], resolve),
   
        }, {
          path: 'specifics/count',
          name: 'scount',
          // component: scount,
          component:resolve => require(['@/pages/specifics/count.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },{
          path: 'specifics/vote',
          name: 'svote',
          // component: svote,
          component:resolve => require(['@/pages/specifics/vote.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },{
          path:'specifics/offNetwork',
          name:'soffNetwork',
          // component:soffNetwork,
          component:resolve => require(['@/pages/specifics/offNetwork.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    },  
    {
      path: '/selectBranchCount2',
      name: 'selectBranchcount2',
      // component: SelectBranchCount2,
      component:resolve => require(['@/pages/selectBranch/selectBranchcount2'], resolve),
   
      children:[
       {
          path:"count",
          name:'countentirety',
          component:resolve => require(['@/pages/directory/count.vue'], resolve),
   
        },{
          path:'offNetwork',
          name:'offNetworkentirety',
          // component:offNetwork
          component:resolve => require(['@/pages/directory/offNetwork.vue'], resolve),
   
        },
        {
          path: 'specifics/count',
          name: 'scount',
          // component: scount,
          component:resolve => require(['@/pages/specifics/count.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },{
          path:'specifics/offNetwork',
          name:'soffNetwork',
          // component:soffNetwork,
          component:resolve => require(['@/pages/specifics/offNetwork.vue'], resolve),
   
          meta: {
            requiresAuth: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      }
    }, 
   
  ]
})



export default router
