<template>
    <Layout >
        <el-card shadow="never" style="min-height: 400px">
            <div slot="header">
                <el-row>
                    <el-col :span="12">
                        <span>{{project.title}}</span>
                    </el-col>
                    <el-col :span="12">
                        <div style="text-align: right;">
                            <el-button style="padding: 3px 0" type="text" icon="el-icon-back">
                                <a :href="project.url" target="_blank">前往GitHub</a>
                            </el-button>
                            <el-button @click="more" style="padding: 3px 0" type="text" icon="el-icon-d-arrow-left">返回</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                发布 {{$util.utcToLocal(project.created_at)}}
                <br> 更新 {{$util.utcToLocal(project.updated_at)}}
            </div>
            <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 20px 0px 0px 0px">
                {{project.summary}}
            </div>
            <div style="font-size: 1.1rem;color: #303133;padding: 15px 0px 15px 0px;border-bottom: 1px solid #E4E7ED;">
                <el-row>
                    <el-col :span="16"  style="padding-top: 5px">
                        <el-tooltip effect="dark" :content="'star '+ project.star" placement="bottom">
                            <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
                        </el-tooltip>
                        {{project.star}}
                        <el-tooltip effect="dark" :content="'watch '+ project.watch" placement="bottom">
                            <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                        </el-tooltip>
                        {{project.watch}}
                        <el-tooltip effect="dark" :content="'fork '+ project.fork" placement="bottom">
                            <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                        </el-tooltip>
                        {{project.fork}}
                    </el-col>
                    <el-col :span="8" style="text-align: right">
                        <el-tag size="small" type="danger" class="mr" v-if="project.license">{{project.license}}</el-tag>
                        <el-tag size="small" type="success" class="mr" v-for="lang in project.languages" :key="lang.title">{{lang.title}}</el-tag>
                    </el-col>
                </el-row>
            </div>
            <div v-html="md(project.content)" v-if="project.content" class="markdown-body" style="padding-top: 20px"></div>
            <div v-if="!project.content" style="padding: 20px 0px 20px 0px;text-align: center">
                <font style="font-size: 30px;color:#dddddd ">
                    <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
                </font>
            </div>
        </el-card>
    </Layout>
</template>
<page-query>
    query($id: ID!){
        strapiProject(id: $id){
            id
            title
            summary
            updated_at
            created_at
            content
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
</page-query>
<script>
    import markdownIt from 'markdown-it';
    const mdFn = new markdownIt({linkify: true});
    export default {
        name: "projectDetail",

        computed: {
           project(){
               console.log(this.$page);
               return this.$page.strapiProject;
           }
        },

        methods: {
            more() {
                this.$router.go(-1)
            },
            md(text){
                text = text.replace(/\(\/uploads\//g,`(${this.GRIDSOME_API_URL}/uploads/`);
                return mdFn.render(text);
            }
        }
    }
</script>
<style>
    .mr{
        margin-right: 8px;
    }
</style>
