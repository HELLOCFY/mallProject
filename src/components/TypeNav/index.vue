<template>
  <!-- {{categoryList}} -->
  <div class="type-nav">
    <div class="container">
      <div
        @mouseleave="leaveShow"
        @mouseenter="enterShow"
      >
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div
            class="sort"
            v-show="show"
          >
            <div
              class="all-sort-list2"
              @click="goSearch"
            >
              <div
                class="item"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeIndex(index)"
                :class="{cur:index==currentIndex}"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{display:index==currentIndex?'block':'none'}"
                >
                  <div
                    class="subitem"
                    v-for="(c2,index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em
                          v-for="(c3,index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "@/../node_modules/lodash/throttle";
export default {
  name: "TypeNav",
  components: {},
  props: {},
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  watch: {},
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //throttle为防抖函数，防抖：当多次请求频繁发送时，只执行最后一条请求
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    //跳转到查询界面
    goSearch(envent) {
      let element = envent.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //整理路由跳转参数
        //路由跳转的参数this.$router.push({name:"xxx",query||params:{}})
        let location = { name: "search" };
        let query = { catagoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        // location.query = query;
        // this.$router.push(location);
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    //设置页面的显示与隐藏
    enterShow() {
      this.show = true;
    },
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
  created() {},
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>

<style lang="less" scoped>
//设置新加入的滚动条的样式
::-webkit-scrollbar {
  width: 7px;
  background-color: #ccc;
}

/* 滚动槽 */
::-webkit-scrollbar-track:increment {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  background: #aaa;
}

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      //overflow: hidden;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            height: 460px;
            //overflow: hidden;
            overflow-y: auto;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .sort-enter {
      height: 0px;
      opacity: 0;
    }
    .sort-enter-to {
      height: 461px;
      opacity: 1;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    .sort-leave {
      height: 461px;
      opacity: 1;
    }
    .sort-leave-to {
      height: 0px;
      opacity: 0;
    }
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>