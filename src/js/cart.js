new Vue({
    el: '#app',
    data: {
        shopListArr:[],
        isSelectAll:false,
        totalPrice:0,
        isDelatePanelHide:true,
        currenrDelShop:{}
    },
    methods:{
        getLocalData(){
            //发送get请求
            this.$http.get('src/data/cart.json').then(response=>{
                const res=response.body;
                if(res){
                    this.shopListArr=res.allShops.shopList;
                }
                
            },function(){
                console.log('请求失败处理');
            });
        },
        singerShopCalculate(str,shop){
            if(str=='1'){//加
                shop.shopNumber+=1
            }else{
                if(shop.shopNumber<=1){
                    shop.shopNumber==1
                }else{
                    shop.shopNumber-=1
                }
            }
            this.totalPriceCalculate()
        },
        // 全选
        selectAll(flag){
            this.isSelectAll=!flag;
            this.shopListArr.forEach((element,index) => {
                if(typeof element.checked === 'undefined'){
                    this.$set(element,'checked',!flag)
                }else{
                    element.checked=!flag
                }
            });
            this.totalPriceCalculate()
        },
        // 判断是否全选
        hasSelectAll(){
            this.shopListArr.forEach((element,index) => {
                if(!element.checked){
                    this.isSelectAll=!element.checked;
                }
            })
            this.isSelectAll=!this.isSelectAll
        },
        // 点击单选框
        selectSinger(shop){
            if(typeof shop.checked === 'undefined'){
                this.$set(shop,'checked',true)
            }else{
                shop.checked=!shop.checked
            }
            this.totalPriceCalculate()
            this.hasSelectAll()
        },
        // 计算总价
        totalPriceCalculate(){
            let totalPrice=0
            this.shopListArr.forEach((element,index) => {
                if(element.checked){
                    totalPrice+=element.shopPrice*element.shopNumber
                }
            });
            this.totalPrice=totalPrice
        },
        // 点击垃圾箱按钮
        clickTrash(shop){
            this.isDelatePanelHide=false
            this.currenrDelShop=shop
        },
        // 点击确定删除按钮
        delateShop(){
            this.isDelatePanelHide=true
            const index=this.shopListArr.indexOf(this.currenrDelShop)
            this.shopListArr.splice(index,1)
            this.totalPriceCalculate()
        }
    },
    // 组件加载完毕，请求网络数据，业务处理
    mounted(){
        this.getLocalData()
    },
    // 过滤金额
    filters: {
        moneyFormat(money){
            if(money){
                return '￥'+ money.toFixed(2)
            }
        }
    }
})