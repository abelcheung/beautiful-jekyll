---
layout: post
title: Test markdown
subtitle: Each post also has a subtitle
tags: [test]
comments: true
---

You can write regular [markdown](http://markdowntutorial.com/) here and Jekyll will automatically convert it to a nice webpage.  I strongly encourage you to [take 5 minutes to learn how to write in markdown](http://markdowntutorial.com/) - it'll teach you how to transform regular text into bold/italics/headings/tables/etc.

**Here is some bold text**

## Here is a secondary heading

How about a yummy crepe?

![Crepe](https://s3-media3.fl.yelpcdn.com/bphoto/cQ1Yoa75m2yUFFbY2xwuqw/348s.jpg)

Here's a code chunk:

~~~
var foo = function(x) {
  return(x + 5);
}
foo(3)
~~~

And here is the same code with syntax highlighting:

```javascript
var foo = function(x) {
  return(x + 5);
}
foo(3)
```

And here is the same code yet again but with line numbers:

{% highlight javascript linenos %}
var foo = function(x) {
  return(x + 5);
}
foo(3)
{% endhighlight %}

## Callout Boxes
You can add notification, warning and error boxes like this:

### Info

{: .callout .callout-info}
**Info:** This is a callout box.

### Success

{: .callout .callout-success}
**Success:** This is a callout box.

### Warning

{: .callout .callout-warning}
**Warning:** This is a callout box.

### Error

{: .callout .callout-danger}
**Error:** This is a callout box.
