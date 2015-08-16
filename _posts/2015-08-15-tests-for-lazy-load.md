---
layout: post
title: Tests For Lazy Load
categories: Test
tags: test lazy-load
---
Recently, working on a table plugin and it has some cases for `lazy load`. In order to promise the plugin quality, we have to write lots of tests. So I summed up a mode to test the `lazy load` cases.

It based on [RSVP](https://github.com/tildeio/rsvp.js).

{% highlight javascript %}
import RSVP from 'rsvp';

// init defers
var LazyLoad = function(count) {
  this.index = 0;
  this.defers = Array.apply(null, Array(count)).map(RSVP.defer);
}

LazyLoad.prototype.next = function() {
  return this.defers[this.index++];
}

LazyLoad.prototype.promises = function(deferIndexes) {
  if (deferIndexes instanceof Array) {
    return deferIndexes.map(function(deferIndex) {
      return this.defers[deferIndex].promise;
    });
  }
  return this.defers.map(function(defer) {
    return defer.promise;
  });
}

LazyLoad.prototype.ready = function(callback, deferIndexes) {
  var promises = this.promises(deferIndexes);
  return RSVP.all(promises).then(callback);
}
{% endhighlight %}

###Usage

{% highlight javascript %}
import LazyLoad from 'lazy-load';

module('Lazy load', {
    subject: function(defers){
        return LazyObject.create({
            loadBy: function (){
                defers.next().resolve()
            }
        });
    }
})

test('lazy load ', function(assert){
    // init
    var lazyLoad = new LazyLoad(4);
    var lazyObject = this.subject(lazyLoad);

    // do some thing to trigger loading.
    lazyObject.triggerLoading();

    lazyLoad.ready(function(){
        // assert your conditions after first loading.
        assert.ok(lazyObject.length, 10);

        // trigger second loading if you need
        lazyObject.triggerLoading();
    }, [0]);

    lazyLoad.ready(function (){
        assert.ok(lazyObject.length, 30)
    }, [1, 2])

    // assert and return if all data loaded
    return lazyLoad.ready(function(){
        assert.ok(lazyObject.length, 40);
    });
})

{% endhighlight %}
