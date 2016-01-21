---
layout: post
title:  Node Read Stream
categories: node
---
## Events

- Event: `data`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Emitted when chunk of data is ready.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data will then be passed as soon as it is available
if the stream is not paused.

{% highlight javascript %}
readStream.on('data', (chunk) => {
  // the chunk is partial data. it's a buffer or string.
  //... do something
});
{% endhighlight %}


- Event: `close`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Emitted when the stream and any of its underlying
resources (a file descriptor, for example) have been closed. The event indicates
that no more events will be emitted, and no further computation will occur.

{% highlight javascript %}
readStream.on('close', () => {
  //...do something
});
{% endhighlight %}

- Event: `error`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Emitted when a chunk of data can not be read from
the stream.

{% highlight javascript %}
readStream.on('error', () => {
  //...do something
});
{% endhighlight %}

- Event: `end`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Emitted when all the data is loaded and there is
no more data.

{% highlight javascript %}
readStream.on('end', () => {
  //...do something
});
{% endhighlight %}

- Event: `readable`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Emitted when a chunk of data can be read from the stream

{% highlight javascript %}
readStream.on('readable', () => {
  let chunk = readStream.read();
  //...do something
});
{% endhighlight %}

### **Diff**: `data` vs `readable`

1. **Listener arguments is different.**
  _`data` has an string or buffer argument. `readable` has none._

2. **`data` is quicker than `readable`.**
  _Read a 90M file, `data` spends 80 ms and `readable` spends 90 ms
  (Run 10 times and get the average)._

3. **`data` listener can make `readable` listener useless.**

{% highlight javascript %}

let readStream = fs.createReadStream(filePath);
readStream.on('data', (chunk) => {
  console.log('data', chunk);
});
readStream.on('readable', () => {
  console.log('readable', readStream.read());
});
// data xxxx
// ...
// data xxxx
// readable null
{% endhighlight %}
