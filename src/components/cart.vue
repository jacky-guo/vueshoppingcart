<template>
    <div class="cart">
        <div class="container">
            <div class="cart">
                <div class="checkout-title">
                    <span>购物车</span>
                </div>
                <!-- table -->
                <div class="item-list-wrap">
                    <div class="cart-item">
                        <div class="cart-item-head">
                            <ul>
                                <li>商品信息</li>
                                <li>商品金额</li>
                                <li>商品数量</li>
                                <li>总金额</li>
                                <li>编辑</li>
                            </ul>
                        </div>
                        <ul class="cart-item-list">
                            <li v-for="(item,index) in productList">
                                <div class="cart-tab-1">
                                    <div class="cart-item-check">
                                        <a href="javascript:void 0" class="item-check-btn" :class="{'check':item.checked}" @click="selectedProduct(item)">
                                            <svg class="icon icon-ok">
                                                <use xlink:href="#icon-ok"></use>
                                            </svg>
                                        </a>
                                    </div>
                                    <div class="cart-item-pic">
                                        <img :src="item.productImage" alt="烟">
                                    </div>
                                    <div class="cart-item-title">
                                        <div class="item-name" v-text="item.productName"></div>
                                    </div>
                                    <div class="item-include">
                                        <dl>
                                            <dt>赠送:</dt>
                                            <dd v-for="part in item.parts" v-text="part.partsName"></dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="cart-tab-2">
                                    <div class="item-price" v-text="formatMoney(item.productPrice)">
                                    </div>
                                </div>
                                <div class="cart-tab-3">
                                    <div class="item-quantity">
                                        <div class="select-self select-self-open">
                                            <div class="quantity">
                                                <a href="javascript:void 0" @click="changeQuentity(item,-1)">-</a>
                                                <input type="text" value="0" disabled v-model="item.productQuantity">
                                                <a href="javascript:void 0" @click="changeQuentity(item,1)">+</a>
                                            </div>
                                        </div>
                                        <div class="item-stock">有货</div>
                                    </div>
                                </div>
                                <div class="cart-tab-4">
                                    <div class="item-price-total" v-text="formatMoney(item.productPrice * item.productQuantity)">
                                    </div>
                                </div>
                                <div class="cart-tab-5">
                                    <div class="cart-item-operation">
                                        <a href="javascript:void 0" class="item-edit-btn" @click="delConfirm(item)">
                                            <svg class="icon icon-del">
                                                <use xlink:href="#icon-del"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- footer -->
                <div class="cart-foot-wrap">
                    <div class="cart-foot-l">
                        <div class="item-all-check">
                            <a href="javascript:void 0">
                                <span class="item-check-btn" :class="{'check':checkAllFlag}" @click="selectAll(true)">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"></use></svg>
                    </span>
                                <span>全选</span>
                            </a>
                        </div>
                        <div class="item-all-del">
                            <a href="javascript:void 0" class="item-del-btn" @click="selectAll(false)">
                                <span>取消全选</span>
                            </a>
                        </div>
                    </div>
                    <div class="cart-foot-r">
                        <div class="item-total">
                            Item total:<span class="total-price" v-text="formatMoney(totalMoney2)"></span>
                        </div>
                        <div class="next-btn-wrap">
                            <a href="javascrit:;" class="btn btn--red" style="width: 200px">
                            <router-link to="/address">结账</router-link>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'cart',
    mounted: function() {
        this.$nextTick(function() {
            this.cartView();
        });
    },
    data() {
        return {
            msg: 'hello',
            productList: [],
            checkAllFlag: false,
            totalMoney2: 0,
            delFlag: false,
            curProduct: ''
        }
    },
    filters: {
        // formatMoney: function (value) {
        //   return "¥ " + value.toFixed(2);
        // }
    },
    props: ['delFlagState'],
    events: {
        'delFlagChange': function(items) {
            console.log(items)
        }
    },
    watch: {
        productList: {
            handler: function(val, oldVal) {
                this.calTotalPrice();
            },
            deep: true
        },
        delFlag: {
            handler: function(val, oldVal) {
                this.$emit('child-tell-me-somethings', this.delFlag);
            },
            deep: true
        },
        delFlagState: {
            handler: function(val, oldVal) {
                this.delFlag = val
            },
            deep: true
        }
    },
    methods: {
        cartView: function() {
            axios.get('static/data/cartData.json')
                .then(response => {
                    this.productList = response.data.result.list
                    this.totalMoney = response.data.result.totalMoney

                })
                .catch(error => {
                    console.log(error);
                })
                // var _this = this;
                // this.$http.get("../static/data/cartData.json", {"id": 123}).then(function(res) {
                //   _this.productList = res.data.result.list;
                //   _this.totalMoney =  res.data.result.totalMoney;
                // });
        },
        formatMoney: function(value) {
            return "¥ " + value.toFixed(2) + "元";
        },
        changeQuentity: function(product, way) {
            if (way > 0) {
                product.productQuantity++
            } else {
                product.productQuantity--
                    if (product.productQuantity < 1)
                        product.productQuantity = 1
            }

        },
        selectedProduct: function(item) {
            if (typeof item.checked == 'undefined') {
                // Vue.set(item,"checked",true);
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
        },
        selectAll: function(flag) {
            this.checkAllFlag = flag;
            this.productList.forEach((item, index) => {
                if (typeof item.checked == 'undefined') {
                    this.$set(item, "checked", this.checkAllFlag);
                } else
                    item.checked = this.checkAllFlag;
            })
        },
        calTotalPrice: function() {
            this.totalMoney2 = 0
            this.productList.forEach(item => {
                if (item.checked) {
                    this.totalMoney2 += item.productPrice * item.productQuantity
                }
            })
        },
        delConfirm: function(item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function() {
            let index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index, 1);
            this.delFlag = false;
        }
    }
}
</script>
<style>
.quantity input {
    width: 40px;
    padding: 5px 10px;
    text-align: center;
}
</style>
