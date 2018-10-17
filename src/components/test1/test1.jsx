// 引入React库
import React, {Component} from 'react'

// 显示多个样式类名
//import cx from 'classnames'
// 当前组件样式
import styles from './test1.less'
// 这里的css moudels 配置不成功，导致打印出来的 styles 为 {} ,读取不到类名 暂时找不到原因
// 选项卡组件
class Test1 extends Component{
  // 构造函数
  constructor(props, context) {
    super(props, context)
    this.state = {
      name:'jim'
    }
  }

  //准备：即将被重新渲染，状态未变化
  componentWillMount() {
    console.log('打印',styles.tabContainer)
  }

  // 已加载组件，收到新属性时调用
  componentWillReceiveProps(nextProps) {
  

  }

  // 已插入真实DOM
  componentDidMount() {
  
  }
  // 渲染函数
  render(ReactElement, DOMElement, callback) {
    return (
      <div className='name'>
        {this.state.name}
        <span className='text'>asdasdas</span>
      </div>
    )
  }

}
export default Test1