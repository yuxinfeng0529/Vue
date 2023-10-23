//将axios进行封装，里面有get和post请求方法，我们封装这些方法之后，就可以调用这些方法
import axios from 'axios'
import instance from './header.js'
//传参数过来
const request=class{
	//构造函数,url请求的地址，arg是值
	constructor(url,arg){
		//实例属性，可以在get方法和post方法里面调用this.url和this.arg
		this.url=url
		this.arg=arg
	}
	//post请求
	modepost(){
		//post里写请求成功或者失败的结果
		return new Promise ((resolve,reject)=>{
			instance.post((this.url),this.arg)
			.then(res=>{
				resolve(res)
			})
			.catch(err=>{
				reject(err)
			})
		})
		
	}
	//get请求
	modeget(){
		//get里写请求成功或者失败的结果
		return new Promise ((resolve,reject)=>{
			instance.get((this.url))
			.then(res=>{
				resolve(res)
			})
			.catch(err=>{
				reject(err)
			})
		})
	}
}

export default request