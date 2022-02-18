<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑 带有X结构的最下面-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li
              class="with-x"
              v-if="searchParams.categoryName"
            >{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li
              class="with-x"
              v-if="searchParams.keyword"
            >{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li
              class="with-x"
              v-if="searchParams.trademark"
            >{{searchParams.trademark.split(":")[1]}}<i @click="removeTradeMark">×</i></li>
            <!-- 售卖属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue,index) in searchParams.props"
              :key="index"
            >{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件实现子传父 -->
        <SearchSelector
          @trademarkInfo="trademarkInfo"
          @attrInfo="attrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span
                      class="iconfont"
                      :class="{'icon-angle-up':isAsc,'icon-angle-up-copy':!isAsc}"
                      v-show="isOne"
                    ></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span
                      class="iconfont"
                      :class="{'icon-angle-up':isAsc,'icon-angle-up-copy':!isAsc}"
                      v-show="isTwo"
                    ></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good,index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a
                      href="item.html"
                      target="_blank"
                    ><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a
                      href="javascript:void(0);"
                      class="sui-btn btn-bordered"
                    >收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters } from "vuex";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },
  //在挂载完成之前执行一次
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //mounted只执行一次
  mounted() {
    //在发请求之前要将searchParams参数的值发生变换
    this.getData();
  },
  data() {
    return {
      searchParams: {
        category1Id: "", //一级分类id
        category2Id: "", //二级分类id
        category3Id: "", //三级分类id
        categoryName: "", //分类的名字
        keyword: "", //搜索框的关键字
        order: "1:desc", //排序的顺序，升序和降序（初始值：综合降序 1：desc）
        pageNo: 1, //分页器当前的页面
        pageSize: 10, //每一页展示数据的个数
        props: [], //平台售卖属性的参数
        trademark: "", //品牌
      },
    };
  },
  computed: {
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
  },
  methods: {
    //把向服务器发请求封装为一个函数
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    //删除分类名字
    removeCategoryName() {
      //当参数为可有可无的时候，如果将字段设置为undefined的时候字段不会发送给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //this.getData();
      //地址栏需要改变
      this.$router.push({ name: "search", params: this.$route.params });
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      //this.getData();
      this.$bus.$emit("clear");
      this.$route.params.keyword = undefined;
      //改变地址栏
      this.$router.push({ name: "search", query: this.$route.query });
    },
    //自定义事件的回调
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    //删除品牌信息
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //手机平台属性的函数，自定义事件
    attrInfo(attr, attrValue) {
      //整理参数格式
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      // this.searchParams.props.push(props);
      // this.searchParams.props = Array.from(new Set(this.searchParams.props));
      //此处为一个优化，当数组中存在props时不再继续发送请求
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    //删除售卖属性
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      //再次发送请求
      this.getData();
    },
    //排序的操作
    //flag为形参判断用户点击的是综合还是价格
    changeOrder(flag){
      let originOrder=this.searchParams.order;
      let originFlag=originOrder.split(":")[0];
      let originSort=originOrder.split(":")[1];
      if(flag==originFlag){
        originSort=="asc"?this.searchParams.order = flag+":"+"desc": this.searchParams.order=flag+":"+"asc";
        this.getData();
      }
      if(flag!=originFlag){
        originFlag=="1"?this.searchParams.order="2"+":"+"desc":this.searchParams.order="1"+":"+"desc";
      }
      this.getData();
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>