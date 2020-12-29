<template>
    <Layout>
        <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <span>{{userInfo.name}}</span>
                <el-button @click="$router.go(-1)" style="float: right; padding: 3px 0" type="text" icon="el-icon-d-arrow-left">返回</el-button>
            </div>
            <el-row>
                <el-col :span="9" style="padding: 0px 10px 20px 0px">
                    <img :src="GRIDSOME_API_URL + userInfo.followUrl.url" style="width: 50px;border-radius:5px;">
                    <div style="padding: 10px">
                        <font style="font-size: 26px;line-height: 40px;font-weight: 600">{{userInfo.name}}
                            <br>
                        </font>
                        <font style="font-size: 14px;line-height: 20px;color:#606266;" v-if="userInfo.address">
                            <i class="el-icon-location-outline"></i>&nbsp;&nbsp;{{userInfo.address}}
                            <br>
                            <a :href="userInfo.url" target="_blank">{{userInfo.url}}</a>
                        </font>
                    </div>

                </el-col>
                <el-col :span="15" style="padding: 0px 20px 20px 10px">
                    <div style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 10px;font-size: 16px;
                    color: #6a737d;" v-if="userInfo.description">
                        {{userInfo.description}}
                    </div>
                    <div style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 30px;text-align: center;
                    font-size: 30px;color:#dddddd" v-else>
                        <b>◔ ‸◔？没有简介</b>
                    </div>
                </el-col>
            </el-row>

        </el-card>
    </Layout>
</template>
<page-query>
    query($id: ID!){
        strapiFollow(id: $id){
            id
            name
            url
            description
            address
            followUrl{
                url
            }
        }
    }
</page-query>
<script>
    export default {
        name: 'detail',
        computed: {
            userInfo(){
                return this.$page.strapiFollow;
            }
        }
    }
</script>
