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
                        <el-select v-model="compvalue" placeholder="请选择单位" clearable style="width: 400px;">
                            <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-input v-if="compvalue == '自定义单位'" v-model="unit" placeholder="请输入自定义单位" />
                        <el-button v-if="compvalue == '自定义单位'" type="success" @click="addunit"
                            :loading="addload">添加自定义单位</el-button>
                    </div>

                </div>

                <div style="text-align: left;">
                    <h4>菜品图片</h4>
                    <el-upload :action="img_url" list-type="picture-card" accept=" .jpg, .jpeg, .png, .webp, .jfif"
                        :on-preview="onpreview" :on-remove="onremove" :on-success="onsuccess" :on-error="onerror"
                        :file-list="goodsimage" :before-upload="beforeupload" limit:1>
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
                    <el-button type="success" @click="getCom" :loading="setload">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { goodsData } from '@/store/index.js'// 引入goodsData
export default {
    components: {
        Plus
    },
    setup() {
        const store = goodsData()
        const router = useRouter()
        const { proxy } = getCurrentInstance()
        const img_url = proxy.$urls.m().uploadres//获取图片的url
        const oper_data = reactive({
            catevalue: "",// 选中的类目
            cate: [],// 类目列表
            name: "",// 输入菜品名称
            unit: "",// 自定义单位
            unitprice: "",// 输入的菜品价格 
            compvalue: "",// 选中的单位
            company: [],// 单位列表
            dialogVisible: false,// 是否展开大图
            dialogImageUrl: '',// 展开大图的地址
            id: '',
            goodsimage: [],// 默认上传文件
            addload: false,// 添加自定义菜单的loading
            setload: false// 添加提交按钮的loading
        })
        // 点击文件列表中已经上传的文件时的钩子
        function onpreview(file) {
            oper_data.dialogVisible = true
            oper_data.dialogImageUrl = toRaw(file).url
            console.log(file)
        }
        // 文件列表移除文件的钩子
        function onremove(file, filelist) {
            oper_data.goodsimage = []
        }
        // 上传成功的钩子
        function onsuccess(res, file, filelist) {
            oper_data.goodsimage.push({ url: res.data, uid: file.uid })
        }
        // 上传失败的钩子
        function onerror(err, file, filelist) {

        }
        // 上传之前的钩子
        function beforeupload(file) {

        }

        onMounted(() => {
            getDishes()
        })

        // 获取类目和单位的数据，并在页面渲染
        async function getDishes() {
            try {
                const CATE = await new proxy.$request(proxy.$urls.m().obtaincate).modeget()
                const UNIT = await new proxy.$request(proxy.$urls.m().obtainunit).modeget()
                const res = await Promise.all([CATE, UNIT])
                oper_data.cate = res[0].data.data
                oper_data.company = res[1].data.data
                oper_data.company.push({ label: "自定义单位", unid: "6699", value: "自定义单位", _id: "6699" })
            } catch (e) {

            }
        }

        // 添加自定义单位
        async function addunit() {
            oper_data.addload = true
            try {
                const res = await new proxy.$request(proxy.$urls.m().dishunit, { unit: oper_data.unit }).modepost()
                if (res.status != 200) {
                    new proxy.$tips(res.data.msg, 'warning').mess_age()
                } else {
                    new proxy.$tips(res.data.msg, 'warning').mess_age()
                    oper_data.unit = ''
                    oper_data.company = ''
                    getDishes()
                }
                oper_data.addload = false
            } catch (e) {
                new proxy.$tips('服务器错误', 'warning').mess_age()
                oper_data.addload = false
            }

        }

        // 提交菜品数据
        async function getCom() {
            const { id, catevalue, name, unitprice, compvalue, goodsimage } = oper_data
            const obj = {
                id,
                category: oper_data.catevalue,
                name,
                unitprice,
                unit: oper_data.compvalue,
                image: oper_data.goodsimage
            }
            oper_data.setload = true
            try {
                const URL = id == '' ? proxy.$urls.m().putdishes : proxy.$urls.m().editdishes
                const res = await new proxy.$request(URL, obj).modepost()
                if (res.status != 200) {
                    new proxy.$tips(res.data.msg, 'warning').mess_age()
                } else {
                    new proxy.$tips(res.data.msg, 'warning').mess_age()
                    router.push({ name: 'dishes' })
                }
                oper_data.setload = false
            } catch (e) {
                oper_data.setload = false
                new proxy.$tips('服务器错误', 'warning').mess_age()
            }
        }

        // 获取编辑菜品传过来的数据
        const edit_data = store.stoGoods// 获取仓库的数据
        if (edit_data) {
            const value = JSON.parse(edit_data)// 转换成对象 
            const { category, name, unitprice, unit, image, _id } = value // 解构
            oper_data.catevalue = category,
                oper_data.name = name,
                oper_data.unitprice = JSON.stringify(unitprice),
                oper_data.unit = unit,
                oper_data.goodsimage = image,
                oper_data.id = _id
        }


        return {
            ...toRefs(oper_data),
            onpreview,
            onremove,
            onsuccess,
            onerror,
            beforeupload,
            img_url,
            addunit,
            getCom
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
}

.eat-con {
    margin-left: 300px;
}
</style>