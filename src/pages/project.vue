<template>
    <Layout>
        <div v-if="projects&&projects.length>0">
            <el-card shadow="hover" v-for="(item,index) in projects" :key="'pro'+index" style="margin-bottom: 20px" v-if="!item.hide">
                <div slot="header">
                    <el-row>
                        <el-col :span="16">
                            <span>
                                <g-link :to="'/project/detail/' + item.id">
                                    <i class="el-icon-service"></i>&nbsp;&nbsp; {{item.title}}
                                </g-link>
                            </span>
                        </el-col>
                        <el-col :span="8">
                            <div style="text-align: right;">
                                <el-button style="padding: 3px 0" type="text" icon="el-icon-back">
                                    <a :href="item.url" target="_blank">前往GitHub</a>
                                </el-button>
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
                <div style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px">
                    <el-row>
                        <el-col :span="16" style="padding-top: 5px">
                            <el-tooltip effect="dark" :content="'star '+item.star" placement="bottom">
                                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
                            </el-tooltip>
                            {{item.star}}
                            <el-tooltip effect="dark" :content="'watch '+item.watch" placement="bottom">
                                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                            </el-tooltip>
                            {{item.watch}}
                            <el-tooltip effect="dark" :content="'fork '+item.fork" placement="bottom">
                                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                            </el-tooltip>
                            {{item.fork}}
                        </el-col>
                        <el-col :span="8" style="text-align: right;">
                            <el-tag size="small" type="danger" class="mr" v-if="item.license">{{item.license}}</el-tag>
                            <el-tag size="small" type="success" class="mr" v-for="lang in item.languages" :key="lang.title">{{lang.title}}</el-tag>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
            <div style="text-align: center">
                <el-pagination @current-change="pageChange" background layout="prev, pager, next" :current-page.sync="pageInfo.currentPage" :page-size="pageInfo.perPage"
                               :total="pageInfo.totalItems">
                </el-pagination>
            </div>
        </div>

        <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!projects||projects.length==0">
            <font style="font-size: 30px;color:#dddddd ">
                <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
            </font>
        </el-card>
    </Layout>
</template>
<page-query>
    query($page: Int){
        allStrapiProject(perPage: 2, page: $page) @paginate{
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
                    license
                    url
                    star
                    watch
                    fork
                    languages{
                        title
                    }
                }
            }
        }
    }
</page-query>
<script>
    export default {
        name: 'project',
        watch: {
            '$route' (nv) {
                this.$page.allStrapiProject.pageInfo.currentPage = nv.params.page || 1;
            }
        },
        computed: {
            pageInfo(){
                return this.$page.allStrapiProject.pageInfo;
            },
            projects(){
                return this.$page.allStrapiProject.edges.map(edge => {
                    edge.node.updated_at = this.$util.utcToLocal(edge.node.updated_at);
                    return edge.node;
                });
            },
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
<style>
    .mr{
        margin-right: 8px;
    }
</style>
