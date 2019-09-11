 let Vue
 class Router {
 	static install (_Vue){
 		console.log(_Vue)
 		Vue = _Vue
 		Vue.mixin({
 			beforeCreate(){
        // Vue.prototype.$kkbrouter = '来了小老弟，我是路由'
        console.log('beforeCreate')
        if(this.$options.router){
          // 这是入口
        // 启动路由
          console.log('$options',this.$options)
          Vue.prototype.$krouter = this.$options.router

          this.$options.router.init()
          console.log(typeof this.$options.router.init)
          // 有时候路由需要动态跳转
          // this.$router.push('/about')
        }
        // this.init()
      }
 		})
 	}
 	constructor(options){
 		console.log('options',options)
 		this.$options = options
    this.routeMap = {}
    // 使用Vue的响应式机制，路由切换的时候，做一些响应
    this.app = new Vue({
      data:{
        // 默认根目录
        current:'/'
      }
    })
 	}
 	init (){
 		console.log('dsd')
 		// 1. 监听hashchange事件
    this.bindEvents()
 		this.initComponent()
    this.createRouteMap()


     let fromArr = [
       {
         money: 200,
         id: 'a1'
       },
       {
          money: -100,
          id: 'a2'
        },
        {
          money: -150,
          id: 'a3'
        },{
          money: 80,
          id: 'a4'
        },
        {
          money: -30,
          id: 'a5'
        },{
          money: -90,
          id: 'a6'
        },
        {
          money: -80,
          id: 'a7'
        }
     ]
     let fromArr2 = [
      {
        money: -200,
        id: 'a1'
      },
      {
         money: -100,
         id: 'a2'
       },
       {
         money: -150,
         id: 'a3'
       },{
         money: -80,
         id: 'a4'
       },
       {
         money: -30,
         id: 'a5'
       },{
         money: -90,
         id: 'a6'
       },
       {
         money: -80,
         id: 'a7'
       }
    ]
    let fromArr3 = [
      {
        money: 30,
        id: 'a1'
      },
      {
         money: -100,
         id: 'a2'
       },
       {
         money: -150,
         id: 'a3'
       },{
         money: 80,
         id: 'a4'
       },
       {
         money: -30,
         id: 'a5'
       },{
         money: -90,
         id: 'a6'
       },
       {
         money: -80,
         id: 'a7'
       }
    ]
    // let arr = this.getRightMoney(fromArr2,330)
    // console.log('getRightMoney',arr)
   }
   getRightMoney(fromArr, nowPrice){
    //  正数合成一个item
    let moneyArr = []
    // 正数数组
    let positiveArr = []
    // 负数数组
    let negativeArr = []
    // 返回的数组
    let returnObj = []
    // 区分正数和负数
    fromArr.forEach(item => {
      if(item.money>=0){
        positiveArr.push(item)
      } else {
        negativeArr.push(item)
      }
    })
    console.log(positiveArr, negativeArr)
    // 正数合成一个item
    if(positiveArr.length>0){
      moneyArr[0] = {money: 0, itemObj: []}
      positiveArr.forEach(item => {
        moneyArr[0].money += item.money
        moneyArr[0].itemObj.push(item)
      })
    }
    
    // 给返回值赋值
    if(moneyArr.length>0){
      returnObj = {
        money: moneyArr[0].money,
        itemObj: moneyArr[0].itemObj
      }
    } else {
      returnObj = {
        money: 0,
        itemObj: []
      }
    }
    if(negativeArr.length>0){
      //  对数组进行排序，从小到大
      negativeArr.sort(function(a,b){
        if(a.money>=b.money){
          return 1
        } else {
          return -1
        }
      })
      negativeArr.forEach((item)=>{
        if((item.money+returnObj.money+nowPrice)>=0){
          let arr = []
          arr = JSON.parse(JSON.stringify(returnObj.itemObj))
          arr.push(item)
          returnObj = {
            money: item.money+returnObj.money,
            itemObj: arr
          }
        }
      })
    }
    console.log('returnObj',returnObj,fromArr,nowPrice)
    moneyArr = null
    positiveArr = null
    negativeArr = null
    return returnObj
  }
  getRightMoney2(fromArr, nowPrice){
    fromArr.sort(function(a,b){
      if(a.money>=b.money){
        return -1
      } else {
        return 1
      }
    })
    console.log(fromArr)
    let positiveArr = []
    let negativeArr = []
    fromArr.forEach(item => {
      if(item.money>=0){
        positiveArr.push(item)
      } else {
        negativeArr.push(item)
      }
    })
    console.log(positiveArr, negativeArr)
    let moneyArr = []
    if(positiveArr.length>0){
      moneyArr[0] = {money: 0, itemObj: []}
      positiveArr.forEach(item => {
        moneyArr[0].money += item.money
        moneyArr[0].itemObj.push(item)
      })
      // moneyArr.push()
    }
    
    console.log(moneyArr)
    let moneyNegativeArr = []
    let returnObj = []
    if(moneyArr.length>0){
      returnObj = {
        money: moneyArr[0].money,
        itemObj: moneyArr[0].itemObj
      }
    } else {
      returnObj = {
        money: 0,
        itemObj: []
      }
    }
    if(negativeArr.length>0){
      negativeArr.sort(function(a,b){
        if(a.money>=b.money){
          return 1
        } else {
          return -1
        }
      })
      negativeArr.forEach((item,index)=>{
        if((item.money+returnObj.money+nowPrice)>=0){
          let arr = []
          arr = JSON.parse(JSON.stringify(returnObj.itemObj))
          arr.push(item)
          returnObj = {
            money: item.money+returnObj.money,
            itemObj: arr
          }
        }
        // let moneyArr2 = []
        // negativeArr.slice(index).reduce((accumulator, currentValue) => {
        //   let arr = []
        //   arr = JSON.parse(JSON.stringify(accumulator.itemObj))
        //   arr.push(currentValue)
        //   moneyArr2.push({
        //     money: accumulator.money+currentValue.money,
        //     itemObj: arr
        //   })
        //   let obj = JSON.parse(JSON.stringify(accumulator))
        //   obj.money = accumulator.money+currentValue.money
        //   obj.itemObj = arr
        //   return obj
        // },moneyArr[0])
        // moneyArr2.sort(function(a,b){
        //   if(a.money>=b.money){
        //     return 1
        //   } else {
        //     return -1
        //   }
        // })
        // moneyNegativeArr = moneyNegativeArr.concat(moneyArr2)
      })
      console.log('negativeArr',negativeArr)
      console.log('moneyNegativeArr',moneyNegativeArr)
      console.log('returnObj' , returnObj)
    
    }
    
    // if(moneyNegativeArr.length>0){
    //   moneyNegativeArr.some(item => {
    //     if((nowPrice+item.money)>=0){
    //       returnArr2 = item
    //       return true
    //     } else{
    //     }
    //   })
    //   if(returnArr2.length<=0){
    //     if(moneyArr.length>0){
    //       returnArr2 = moneyArr[0]
    //     } else {
    //       returnArr2 = []
    //     }
    //   }
    // }
    // let arr1 = fromArr.filter(item => {
    //   return item.money>=0
    // })
    
    console.log('returnObj',returnObj,fromArr,moneyNegativeArr,nowPrice)
    
    // return returnArr
  }
 	initComponent (){
 		console.log('initComponent')
 		Vue.component('router-view',{
 			render:h=>{
        const component = this.routeMap[this.app.current].component
        // 使用h新建一个虚拟dom
        return h(component)
      }
     })
     Vue.component('router-link',{
      // props:['to'],
      props:{
        to:String
      },
      render(h){
        // h == createElement
        // h三个参数，
        // 组件名
        // 参数
        // 子元素
        console.log('slots', this.$slots)
        return h('a',{
          attrs:{
            href:'#'+this.to
          },
        },
        [ this.$slots.default ]
        )
      }
      // import vue/dist/vue.js
      // template最终也是转换成render来执行
      // 需要compile
      // template:"<a :href='to'><slot></slot></a>"
    })
 	}
 	createRouteMap(){
    this.$options.routes.forEach(item=>{
      this.routeMap[item.path] = item
    })
  }
  bindEvents(){
    console.log('绑定事件')
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
    window.addEventListener('load', this.onHashChange.bind(this), false)
  }
  getHash(){
    return window.location.hash.slice(1) || '/'
  }
  push(url){
    // hash模式直接复制
    window.location.hash = url
    // history模式 使用pushState
  }
  getFrom(e){
    let from ,to
    if(e.newURL){
      // 这是一个hashchange
      from = e.oldURL.split('#')[1]
      to = e.newURL.split('#')[1]
    }else{
      // 这是一个第一次加载触发的
      from = ''
      to = this.getHash()
    }
    return { from, to }
  }
  onHashChange(e){
    console.log(e)
    // 路由跳转马上开始
    // console.log('路由准备跳转')
    // 获取当前的哈希值
    let hash = this.getHash()
    console.log(window.location.hash)
    console.log(hash)
    let router = this.routeMap[hash]
    let {from, to} = this.getFrom(e)
    // // 修改this.app.current 借用了vue的响应式机制
    // // console.log('hash变了')
    console.log(this.app)
    if(router.beforeEnter){
      // 有生命周期
      router.beforeEnter(from, to, ()=>{
        this.app.current = hash
      })
    }else{
      this.app.current = hash
    }
    
  }
 }

 export default Router