// 引入React库
import React, {Component} from 'react'

// 显示多个样式类名
import cx from 'classnames'
// 当前组件样式
import styles from './index.less'

// 选项卡组件
class Tabs extends Component{
  // 构造函数
  constructor(props, context) {
    super(props, context)
    this.state = {
      currentTabKey: '',
      onTabClick: null,
      tab_panes: []
    }
  }

  //准备：即将被重新渲染，状态未变化
  componentWillMount() {
  }

  // 已加载组件，收到新属性时调用
  componentWillReceiveProps(nextProps) {
    // 初始化选项卡
    this.initTabs(nextProps)
  }

  // 已插入真实DOM
  componentDidMount() {
    // 初始化选项卡
    this.initTabs(this.props)
  }

  // 获得当前活动选项卡
  getActiveKey(tab_panes, props){
    // 当前活动选项卡
    let activeKey = ''
    // 不传入活动选项卡，则默认第一个
    if(!props.activeKey){
      activeKey = tab_panes[0].key
    }else{
      activeKey = props.activeKey
    }
    return activeKey
  }

  // 获取选项卡数组
  getTabArr(props){
    // 叶子节点
    let children = props.children
    // 选项卡数组
    let tabArr =  []
    // 叶子节点为空，则报错提示
    if(0 === children.length){
      throw new Error('Tabs need TabPane children Element')
    }

    // 遍历叶子节点，初始化选项卡列表
    children.map((c, i) => {
      tabArr.push({key: c.key, title: c.props.title})
    })
    return tabArr
  }

  // 初始化Tabs选项卡
  initTabs(props){
    let self = this
    // 选项卡列表
    let tab_panes = self.state.tab_panes

    // 如果已渲染过，则不继续渲染
    if(0 !== tab_panes.length){
      self.setState({
        currentTabKey: self.getActiveKey(tab_panes, props),
        onTabClick: props.onTabClick
      })
      return false
    }
    // 设置选项卡列表和当前选中卡片到状态机
    self.setState({
      currentTabKey: self.getActiveKey(props.children, props),
      tab_panes: self.getTabArr(props),
      onTabClick: props.onTabClick
    })
  }

  // 选项卡被点击
  onTabClick(e, activeKey){
    let self = this
    // 阻止事件冒泡
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation()
    self.setState({ currentTabKey: activeKey}, () => {
      if(!!self.state.onTabClick){
        self.state.onTabClick(activeKey)
      }
    })
    return false
  }

  // 渲染函数
  render(ReactElement, DOMElement, callback) {
    return (
      <div>
        <div className={styles.tabContainer}>
          <div className={styles.tabListContainer}>
            <div ref='tabDomList' className={styles.tabList}>
              <ul>
                {
                  this.state.tab_panes && this.state.tab_panes.map((pan, i) => {
                    return (
                      <li key={'nav_' + i} onClick={ e => { this.onTabClick(e, pan.key) }} className={cx(styles.tabItems, '' + this.state.currentTabKey === '' + pan.key? styles.active: '')}>
                        <a className={styles.link} href="javascript:;">
                          <span className={styles.title}> {pan.title} </span>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>

        <div name='tabContainer' className={styles.container}>
          {
            React.Children.map(this.props.children, (child, i) => {
              if('' + child.key === '' + this.state.currentTabKey){
                return React.cloneElement(child)
              }
            })
          }
        </div>
      </div>
    )
  }

}

class TabPane extends Component{
  // 构造函数
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  //准备：即将被重新渲染，状态未变化
  componentWillMount() {
  }

  // 已加载组件，收到新属性时调用
  componentWillReceiveProps(nextProps) {

  }

  // 已插入真实DOM
  componentDidMount() {
  }

  // 渲染函数
  render(ReactElement, DOMElement, callback) {
    return React.cloneElement(this.props.children)
  }
}

Tabs.TabPane = TabPane

export default Tabs