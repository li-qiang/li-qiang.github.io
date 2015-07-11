---
layout: post
title: ContainerView in Ember
categories: Ember
---
>  A `ContainerView` is an `Ember.View` subclass that implements `Ember.MutableArray`
>  allowing programmatic **management of its child views**.    
- - -  
  
&nbsp;&nbsp;&nbsp;&nbsp;ContainerView inherit Ember.View and MutableArray.The MutableArray defines the API for modifying **array-like** objects.Is ContainerView array-like? Yes, its item is child view. ALl methods which looks like to operate array, are used to operate 
its `childViews`. Such as `clear`, `objectAt`, `removeObject`, `pushObject`...
<br>
<br>
- - -
#### How `ContainerView` inherit `MutableArray` methods?

`PushObject` and `UnshiftObject` use `insertAt`.

`RemoveObject` and `insertAt` use `replace`.

Fetch object by `objectAt`. 

So ConatinerView only needs to redefine `objectAt` and 
`replace`. And if you want to use MutableArray in ember, you need to rewrite the `replace` and `objectAt`.
<br>
<br>
- - -
#### Properties

`childViews`: child views list. But setting childViews is deprecated in ContainerView.

`objectAt`: get child view by index. 


   



