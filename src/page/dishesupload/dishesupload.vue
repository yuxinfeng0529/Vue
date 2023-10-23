<template>
    <div class="eat-container">
        <div class="eat-add">
            <h3>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/dishes' }">菜品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>添加菜品</el-breadcrumb-item>
                </el-breadcrumb>
            </h3>
            <div class="eat-con">

                <div style="text-align: left;">
                    <h4>菜品类目</h4>
                    <el-select v-model="catevalue" placeholder="请选择类目" clearable>
                        <el-option v-for="item in cate" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div>
                    <h4>菜品名称</h4>
                    <el-input v-model="name" placeholder="请输入菜品名称" clearable />
                </div>
                <div>
                    <h4>菜品价格</h4>
                    <div class="eat-price">
                        <el-input type="number" v-model="unitprice" placeholder="请输入菜品价格" clearable />
                        <el-select v-model="compunit" placeholder="请选择单位" clearable style="margin:0px 20px;">
                            <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-input v-if="compunit == '自定义单位'" v-model="input" placeholder="请输入自定义单位" />
                        <el-button v-if="compunit == '自定义单位'" type="success">添加自定义单位</el-button>
                    </div>

                </div>

                <div style="text-align: left;">
                    <h4>菜品图片</h4>
                    <el-upload v-model:file-list="fileList" action="" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <!-- 展开大图 -->
                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </div>
                <div style="margin-top: 30px;">
                    <el-button type="success">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Plus } from '@element-plus/icons-vue'
export default {
    components: {
        Plus
    },
    setup() {

        const res = reactive({
            catevalue: "",
            cate: [],
            name: "",
            unitprice: "",
            unitquan: "",
            unit: [],
            dialogVisible: false,
            dialogImageUrl: ''
        })

        return {
            ...toRefs(res)
        }
    }
}
</script>

<style scoped>
.eat-add {
    max-width: 800px;
}

.eat-add h4 {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
}

.eat-price {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.eat-con {
    margin-left: 300px;
}
</style>