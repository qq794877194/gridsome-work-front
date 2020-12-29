<template>
    <div>
        <el-card shadow="never">
            <el-menu :default-active="active" @select="jump">
                <el-menu-item v-for="item in menus" :key="item.id" :index="item.id">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </el-menu>
        </el-card>
    </div>
</template>

<static-query>
    query{
        allStrapiMenu{
            edges{
                node{
                    id
                    name
                    icon
                    path
                }
            }
        }
    }
</static-query>
<script>
    export default {
        data() {
            return {
                active: "",
                parentUrl: "",
            }
        },
        mounted(){
            const curPath = this.$route.path.split('/')[1];
          this.active = (this.menus.findIndex(menu => menu.path.includes(curPath)) + 1) + '';
        },
        methods: {
          jump(id){
              const path = this.menus.find(menu => menu.id === id);
              this.$router.push(path.path);
          }
        },
        computed: {
            menus(){
                return this.$static.allStrapiMenu.edges.map(edge => edge.node).reverse();
            }
        }
    }
</script>
