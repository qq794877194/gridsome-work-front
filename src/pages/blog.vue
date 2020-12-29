<template>
    <Layout>
        <div v-if="blogs&&blogs.length>0">
            <el-card shadow="hover" v-for="(item,index) in blogs" :key="'p'+index" style="margin-bottom: 20px">
                <div slot="header">
                    <el-row>
                        <el-col :span="16">
                            <span>
                                <g-link :to="'/blog/detail/' + item.id">
                                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{item.title}}
                                </g-link>
                            </span>
                        </el-col>
                        <el-col :span="8">
                            <div style="text-align: right;">
                                <el-button @click="$share('/user/blog/details/'+item.id)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                    最近更新 {{item.updated_at}}
                </div>
                <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
                    {{item.summary}}
                </div>
            </el-card>
            <div style="text-align: center">
                <el-pagination @current-change="pageChange" background layout="prev, pager, next" :current-page.sync="pageInfo.currentPage" :page-size="pageInfo.perPage"
                               :total="pageInfo.totalItems">
                </el-pagination>
            </div>

        </div>

        <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!blogs||!blogs.length">
            <font style="font-size: 30px;color:#dddddd ">
                <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
            </font>
        </el-card>
    </Layout>
</template>
<page-query>
    query($page: Int){
        allStrapiBlog(perPage: 2, page: $page) @paginate{
            pageInfo {
                currentPage
                totalItems
                perPage
            }
            edges{
                node{
                    id
                    title
                    summary
                    updated_at
                }
            }
        }
    }
</page-query>
<script>
    export default {
        name: 'blog',
        data() {
            return {
                searchKey: ''
            }
        },
        created(){

        },
        computed: {
            blogs(){
                return this.$page.allStrapiBlog.edges.map(edge => {
                    edge.node.updated_at = this.$util.utcToLocal(edge.node.updated_at);
                    return edge.node;
                });
            },
            pageInfo(){

                return this.$page.allStrapiBlog.pageInfo;
            }
        },
        watch: {
            '$route' (nv) {
                this.$page.allStrapiBlog.pageInfo.currentPage = nv.params.page || 1;
            }
        },
        methods: {
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
