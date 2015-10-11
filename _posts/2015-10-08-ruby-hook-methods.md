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

  def name
    p 'My name is Qlee'
  end
end

class Student < Person
  puts "executing class body"
end

# => class Person was inherited by Student
#    executing class body

Student.new.name # => My name is Qlee

{% endhighlight %}



## included

> Defined in a module and it has to be the module's method.

> When someone class or module include the module, the `included` will be called with the someone class or module.

{% highlight ruby %}

module School
  def self.included(myClass)
    puts "module #{self} is included by #{myClass}"
  end

  def name
    p 'My name is Qlee'
  end
end

class Student
  include School
end

# => module School is included by Student

Student.new.name # => My name is Qlee

{% endhighlight %}



## extended

> Defined in a module and it has to be the module's method.

> When someone class or module extend the module, the `extended` will be called with the someone class or module.

{% highlight ruby %}

module SuperMan
  def self.extended(myClass)
    puts "module #{self} is extended by #{myClass}"
  end

  def super_man
    p 'I am super man'
  end
end

class Person
  extend School
end

# => module SuperMan is extended by Person

Person.super_man # => I am super man

{% endhighlight %}


## prepended

> Defined in a module and it has to be the module's method.

> When someone class or module prepend the module, the `prepended` will be called with the someone class or module.

{% highlight ruby %}

module Person
  def self.prepended(myClass)
    puts "module #{self} is prepended by #{myClass}"
  end

  def name
    p 'I am a person'
  end
end

class Student
  prepend Person

  def name
    p 'I am a student'
  end
end

# => module Person is prepended by Student

Student.new.name # => I am a person

{% endhighlight %}

## method_missing

> When run a method which not in the object, the `method_missing` will be called with the method name.

{% highlight ruby %}

class Person
  def name
    p 'I am a person'
  end

  def method_missing(method_name)
    p "call missing method with #{method_name}"
  end
end

Person.new.name # =>  I am a person

Person.new.age # =>  call missing method with age

{% endhighlight %}
