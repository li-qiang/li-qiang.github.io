---
layout: post
title: Ruby Hook Methods
categories: ruby
tags: hook
---
## inherited

> Defined in parent class and it has to be class's method.

> When subclass inherit the parent class, the `inherited` will be called with the subclass.

{% highlight ruby %}

class Person
  def self.inherited(subclass)
    puts "class #{self} was inherited by #{subclass}"
  end
end

class Student < Person
  puts "executing class body"
end

# => class Person was inherited by Student
#    executing class body

{% endhighlight %}

## included

> Defined in a module and it has to be the module's method.

> When someone class or module include the module, the `included` will be called with the someone class or module.

{% highlight ruby %}

module School
  def self.included(myClass)
    puts "module #{self} is included by #{myClass}"
  end
end

class Student
  include School
end

# => module School is included by Student

{% endhighlight %}
