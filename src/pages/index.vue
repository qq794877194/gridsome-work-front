<template>
    <Layout>
        <el-card shadow="never" style="min-height: 400px">
            <div slot="header">
                <el-row>
                    <el-col :span="24">
                        <span>{{blog.title}}</span>
                    </el-col>
                </el-row>
            </div>
            <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
                发布 {{$util.utcToLocal(blog.created_at)}}
                <br> 更新 {{$util.utcToLocal(blog.updated_at)}}
            </div>
            <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
                <pre style="font-family: '微软雅黑'">{{blog.description}}</pre>
            </div>
            <div v-html="md(blog.content)" class="markdown-body" style="padding-top: 20px"></div>
        </el-card>
    </Layout>
</template>
<page-query>
    query{
        allStrapiBlog{
            edges{
                node{
                    id
                    title
                    summary
                    content
                    created_at
                    updated_at
                }
            }
        }
    }
</page-query>
<script>
    import markdownIt from 'markdown-it';
    const mdFn = new markdownIt();
    export default {
        name: "blogDetail",
        computed: {
            blog() {
                return this.$page.allStrapiBlog.edges[0].node;
            }
        },
        mounted() {

        },
        methods: {
            more() {
                this.$router.go(-1);
            },
            md(text){
                text = text.replace(/\(\/uploads\//g,`(${this.GRIDSOME_API_URL}/uploads/`);
                return mdFn.render(text);
            }
        }
    }
</script>
