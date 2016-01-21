---
layout: post
title: data&nbsp;  VS  &nbsp;readable
categories: node
tags: ReadStream
---
## **Events**

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

- Event: `readable`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Emitted when a chunk of data can be read from the stream.

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
3. **`readable` can be controlled but `data` can't.**
  _When a chunk of data is ready, it emits a readable event. If don't read the
  chunk data, it will not emit the readable listener again._

4. **`data` listener can make `readable` listener useless.**

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

## **Summary**

- `data`
  If you want the speed is faster. add a `data` listener.
<br>
<br>
- `readable`
  If you want control the speed, add a `readable` listener.
<br>
<br>
- Don't add `readable` listener when the stream has `data` listener.
