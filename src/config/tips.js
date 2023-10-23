import { ElMessage } from 'element-plus'

//
const tips = class {
    constructor(message, type='success') {
        this.message = message
        this.type = type
    }
    mess_age() {
        ElMessage({
            message: this.message,
            type: this.type,
            duration: 2000
        })
    }
}


export default tips