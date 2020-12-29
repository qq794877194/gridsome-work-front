<template>
    <Layout>
        <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
            <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
                <el-tab-pane :label="'粉丝 '+ fansCount" name="/social/fans/" style="padding: 5px">
                    <div v-if="fansList.length">
                        <el-row style="min-height: 200px; ">
                            <el-col :span="8" v-for="(item,index) in fansList" :key="item.id" style="padding: 10px">
                                <el-card shadow="hover" style="font-size: 13px;color: #606266;line-height: 20px">
                                    <i class="el-icon-star-off"></i>&emsp;
                                    <a @click="$router.push(`/social/fans/detail/${item.id}`)" style=" text-decoration:none;cursor:pointer">{{item.name}}</a>
                                    <br>
                                    <i class="el-icon-message"></i>&emsp;
                                    <a :href="item.url" target="_blank" style=" text-decoration:none;cursor:pointer">TA的主页</a>
                                    <br>
                                    <img :src="GRIDSOME_API_URL + item.avatar.url" style="width: 50px;border-radius:5px;margin-top: 5px">
                                </el-card>
                            </el-col>
                        </el-row>
                        <div style="text-align: center;margin-top: 10px">
                            <el-pagination @current-change="pageChange" background layout="prev, pager, next" :current-page.sync="pageInfo.currentPage"
                                           :page-size="pageInfo.perPage" :total="fansCount">
                            </el-pagination>
                        </div>
                    </div>
                    <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-else>
                        <font style="font-size: 30px;color:#dddddd ">
                            <b>(￢_￢) 没有一个粉丝</b>
                        </font>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="'关注 '+ followCount" name="/social/follow/" style="padding: 5px">
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </Layout>
</template>
<page-query>
    query($page: Int){
        allStrapiFollow{
            totalCount
        }
        allStrapiFans(perPage: 2, page: $page) @paginate{
            totalCount
            pageInfo{
                perPage
                currentPage
            }
            edges{
                node{
                    id
                    name
                    url
                    description
                    address
                    avatar{
                        url
                    }
                }
            }
        }
    }
</page-query>
<script>
    export default {
        name: "fans",
        data(){
            return {
                activeTab: "/social/fans/",
            }
        },
        computed: {
            followCount(){
                return this.$page.allStrapiFollow.totalCount;
            },
            fansCount(){
                return this.$page.allStrapiFans.totalCount;
            },
            fansList() {
                return this.$page.allStrapiFans.edges.map(edge => edge.node);
            },
            pageInfo(){
                return this.$page.allStrapiFans.pageInfo;
            }
        },
        watch: {
          '$route' (nv) {
              this.$page.allStrapiFans.pageInfo.currentPage = nv.params.page || 1;
          }
        },
        methods: {
            onSelect() {
                if(!this.$route.path.includes(this.activeTab)){
                    this.$router.replace(this.activeTab);
                }
            },
            pageChange(page){
                page = page === 1 ? '' : page;
                let url  = this.$route.path;
                if(this.$route.params.page){
                    url = url.replace(this.$route.params.page,page);
                }else{
                    url += page;
                }
                this.$router.push(url);

            }
        }
    }
</script>
