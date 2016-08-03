# jquery.dvalidate.js
自用的超简单表单验证框架

# 使用方法
1.引入js

2.在需要验证的表单加入属性“validate”

3.在需要验证的控件加入属性“check”，check目前支持两种模式（多个用空格隔开）

--empty：不为空判断

--number：必须是数字判断

如：

    <input type="text" check="number empty"/>

更多示例请查看页面test.html
