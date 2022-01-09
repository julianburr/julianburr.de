---
title: Virtual lists and rendering in React
description: How to make rendering long lists more performant
date: 2020-05-08
tags: js, react, perf
---

While working on some side projects using React and Electron, I was implementing a "logs" screen, which was supposed to show the output of processes I was running through Node JS. This meant that the list of log entries was often very long, containing sometimes thousands of items.

You've likely experienced this before yourself, but in case you haven't, rendering so many DOM elements is REALLY slow, especially when trying to scroll through them.

The most common solution to that is "virtual rendering", which tries to reduce the amount of DOM nodes by only rendering the ones visible and essentially faking the rest. So I took the opportunity to have another look at some virtual list libraries for React.

## The concept of virtual lists

As mentioned above, the main idea behind vritual lists (or virtual rendering in general) is to only actually render the DOM elements that are currently visible and fill the rest with blank placeholders. As the user scrolls, the placeholders are then replaced with the actual content.

There are a lot of libraries out there to help with this, in React probably the most commonly used one is [`react-virtualized`](https://github.com/bvaughn/react-virtualized) by [Brian Vaughn](https://twitter.com/brian_d_vaughn). It's not only used by a lot of app developers as part of their stack, but also by a lot of other library developers to enhance their dropdowns, drag and drop libraries, etc.

## The problem with dynamic content and how to get around it

The concept of actually implementing a virtual list renderer is pretty straight forward, as long as you deal with fixed widths/heights of the elements in your list. If they are all the same size, all the virtual renderer needs to do is to multiply that size by the number of items e.g. above the current scroll position to determine the size of the placeholder.

However, in most real life applications, we don't have that luxary. Items can vary in size, depending on content, screen width, etc.

The only real way (at least at the time when I played with this, afaik) is to calculate the actual heights of each item on the fly. This might sound expensive, but it's actually still cheaper then rendering them all in the background (since for the measurement you can re-use a single DOM element, rather than adding thousands of DOM elements) and the cost is only on the first render (and on any screen resize event, but you can throttle that).

In my case, having a hidden DOM element that mimicked the style of the actual final line item helped me work around the "dynamic size" issues. Every time a new log output would come in, I'd just use that hidden element to measure it's size and then add the content including that meta information to the list.

Very simplified and probably not very efficient example, but you get the idea 😅

```jsx
function Example ({items}) {
  const hiddenRef = useRef();
  const [ enhancedItems, setEnhancedItems ] = useState([]);

  function enhanceItem (item, index) {
    // Just to make sure we only measure each item once
    if (enhancedItems[index]) {
      return enhancedItems[index];
    }

    hiddenRef.current.innerHTML = item.content;
    return {
      content: item.content,
      height: hiddenRef.current.scrollHeight
    }
  }

  useLayoutEffect(() => {
    setEnhancedItems(items.map(enhanceItem));
  }, [items]);

  useEffect(() => {
    // Listen to window resize event and re-calc the list
    // ...
  }, []);

  return (
    <>
      <HiddenItem ref={hiddenRef} />

      <List
        items={enhancedItems}
        rowHeight={{index}) => enhancedItems[index].height}
        rowRenderer={({index}) => (
          <Item content={enhancedItems[index].content} />
        )}
        overscanRowCount={3}
      />
    </>
  );
}
```

## Good reads

- https://github.com/bvaughn/react-virtualized
- https://css-tricks.com/rendering-lists-using-react-virtualized/
- https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3/
