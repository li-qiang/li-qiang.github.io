---
layout: post
title:  Lambda vs Proc vs Block
date:   2015-03-30 23:42:02
categories: ruby
---
## Lambda vs Proc

####1. 关键字&nbsp;**`Return`**####
a.  **Lambda** Return **不结束**执行方法。
b.  **Proc** Return **结束**执行方法。
{% highlight ruby %}
class A
  def lambda_test
    p = lambda { return 1 }
    p.call
    2
  end

  def proc_test
    p = Proc.new { return 1 }
    p.call
    2
  end
end

# 调用方法

a = A.new # 实例化一个A的对象

a.lambda_test # => 返回 2，全部执行完毕后返回

a.proc_test # => 返回 1，Proc调用时返回

{% endhighlight %}

####2. **参数**的传递####

a. **Lambda**要求参数的个数必须与定义的相同
b. **Proc**对参数的个数没有要求

{% highlight ruby %}

l = lambda {|x| (x || 0) + 1}

l.call(4) # => 返回 5
l.call    # => 抛出 ArgumentError 错误

p = Proc.new {|x| (x || 0) + 1}

p.call(4) # => 返回 5
p.call    # => 返回 1
{% endhighlight %}
- - -
<br/>
## Lambda vs Block ##

####1. **对象**####
a. Block**不是对象**
b. lambda**是对象**
{% highlight ruby %}
b = { puts "Hello World"}   # syntax error
l = lambda { puts "Hello World"}   # 返回 lambda
{% endhighlight %}

####2. **参数**####
a. 参数中最多只能有**一个Block**
b. 参数中可以有**多个Proc或Lambda**
{% highlight ruby %}
class A
  def run(a,b,&c)
    a.call
    b.call
    c.call
  end
end

a = A.new

l1 = lambda { p 'lambda 1'}
l2 = lambda { p 'lambda 2'}

a.run(l1,l2){ p 'block' } # => 分行输出 "lambda 1"、"lambda 2"、"block"

p1 = Proc.new { p 'proc 1' }
p2 = Proc.new { p 'proc 2' }

a.run(p1,p2){ p 'block' } # => 分行输出 "proc 1"、"proc 2"、"block"

# 还真不知道怎么调用两个block

{% endhighlight %}

####3. Lambda对参数个数有要求，**Block对参数个数没有要求** ####

{% highlight ruby %}
class A
  def block_test(&block)
    block.call(1, 2, 3)
  end
end

a = A.new

a.block_test{|x, y| x + y } # => 返回 3
{% endhighlight %}

- - -
<br>

## Proc vs Block ##

####1. **对象**####
a. **Block不是对象**
b. **Proc是对象**
