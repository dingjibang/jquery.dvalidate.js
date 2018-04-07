# jquery.dvalidate.js
自用的超简单表单验证框架，零配置不写js不污染页面样式直接就是lou
<br>
在线示例：[http://www.rpsg.team/dvalidate/](http://www.rpsg-team.com/dvalidate/)

# 使用方法
1.引入js

2.在需要验证的表单加入属性“validate”

    <form validate>
        <!--your field here-->
    </form>

3.在需要验证的控件加入属性“check”（可以多个验证一起进行，多个则用空格隔开）

    empty：不为空判断
    number：必须是数字判断
    max: 不能超过多少字符，需要手动新增一个字段max=length，具体看test.html
    min: 不能小于多少字符，和max相同，看下test.html就秒懂了
    email: 格式必须是邮箱
    character: 格式必须是数字/字母，不能输入中文或者字符



如：

    <input type="text" check="number empty"/>
    
则代表验证该文本框不为空且必须是数字的格式


# 更多示例请查看页面test.html
