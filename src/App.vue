<template>
  <div id="app">
    <v-header :seller="jsonData.seller"></v-header>
    <goods :seat="jsonData.seller.seat" :goods="jsonData.goods" :seller="jsonData.seller"></goods>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue'
  import goods from 'components/goods/goods'

  const ERR_OK = 0

  export default {
    data() {
      return {
        "jsonData": {
          "seller": {
            /*商家名称*/
            "name": "有一家快餐店(总店)",
            /*商家公告*/
            "bulletin": "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，" +
            "由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，" +
            "发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
            /*商家图片*/
            "avatar": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
            /*优惠 如果没有优惠则这条字段不返回！(为了防止返回的时空数组！)*/
            "supports": [
              {
                "type": 0,
                "description": "在线支付满28减5"
              },
              {
                "type": 1,
                "description": "VC无限橙果汁全场8折"
              }
            ],
            /*座位号*/
            "seat": "29C"
          },
          "goods": [
            /*此段表示食物所属类型*/
            {
              /*食物类型*/
              "name": "热销榜",
              /*优惠活动，为-1则表示没有活动 默认为-1 此处与seller的supports里面的type对应*/
              "type": -1,
              /*订单页面的备注*/
              "remark": "无",
              "foods": [
                {
                  /*食物ID*/
                  "id": 1,
                  /*食物名称*/
                  "name": "皮蛋瘦肉粥",
                  /*食物分量价格 必须为升序(因为数据是拿的数组[0]) point表示是否选择 0表示不选择*/
                  "weight": [
                    {
                      /*点击状态 有默认值*/
                      "point": true,
                      /*分量*/
                      "size": "小份",
                      /*价格*/
                      "price": 10,
                      /*食物活动之前价格*/
                      "oldPrice": 12
                    },
                    {
                      "point": false,
                      "size": "中份",
                      "price": 15,
                      /*食物活动之前价格*/
                      "oldPrice": 17
                    },
                    {
                      "point": false,
                      "size": "大份",
                      "price": 20,
                      /*食物活动之前价格*/
                      "oldPrice": 22
                    }
                  ],
                  /*选择之后的价格*/
                  "price": 0,
                  /*食物描述*/
                  "description": "咸粥",
                  /*食物购买数量 默认为0*/
                  "count": 0,
                  /*食物销售数量*/
                  "sellCount": 229,
                  /*食物味道(辣味，甜味)*/
                  "taste": {
                    /*食物味道类型 无则设置为0*/
                    "type": "咸味",
                    /*食物味道程度*/
                    "extents": [
                      {
                        /*点击状态 有默认值*/
                        "point": false,
                        "extent": "淡",
                      },
                      {
                        "point": true,
                        "extent": "合适",
                      },
                      {
                        "point": false,
                        "extent": "咸",
                      }
                    ]
                  },
                  /*加臊子*/
                  "matchs": [
                    {
                      /*点击状态 有默认值*/
                      "point": false,
                      /*臊子名字*/
                      "name": "牛肉",
                      /*臊子价格*/
                      "price": 5,
                      /*食物活动之前价格*/
                      "oldPrice": 6
                    },
                    {
                      "point": false,
                      /*臊子名字*/
                      "name": "排骨",
                      /*臊子价格*/
                      "price": 4,
                      /*食物活动之前价格*/
                      "oldPrice": 5
                    },
                    {
                      "point": false,
                      /*臊子名字*/
                      "name": "羊肉",
                      /*臊子价格*/
                      "price": 10,
                      /*食物活动之前价格*/
                      "oldPrice": 11
                    }
                  ],
                  /*打包*/
                  "package": {
                    /*打不打包 默认为不打包*/
                    "type": false,
                    /*打包价格*/
                    "price": 1
                  },
                  /*食物图标*/
                  "icon": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
                }
              ]
            },
          ],
        },
      }
    },
    components: {
      'v-header': header,
      goods
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
