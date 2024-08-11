
let o = {
    Name: "Navneet Vishwakarma",
    Class: "5 Btech B02",
  };
  let intervalId;
  function hello() {
    const element = document.getElementById("mine");
    intervalId = setInterval(() => {
      element.innerHTML = html;
    }, 1000);
    const outputButton = document.getElementById("output-button");
    outputButton.style.display = "none";
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close Output";
    closeButton.onclick = closeOutput;
    document.body.appendChild(closeButton);
  }
  function closeOutput() {
    const element = document.getElementById("mine");
    element.innerHTML = "";
    clearInterval(intervalId);
    const closeButton = document.querySelector("button:last-child");
    closeButton.remove();
    const outputButton = document.getElementById("output-button");
    outputButton.style.display = "block";
    outputButton.style.visibility = "visible";
  }
  let html = `
  <pre>
    <code>
      <h1>Output : </h1>
Initial string: Hello, World!
Size: 13
Capacity: 15
Is empty: No
After resize: Hello
After shrink_to_fit - Capacity: 5
First character: H
Last character: o
Character at index 1: e
After appending: Hello, C++!
After insertion: Hello there, C++!
After erasing: Hello, C++!
After replacing: Hello, everyone!
After clearing: Is empty? Yes
Comparing str and other: Not equal
Substring: Hello
Find 'World': Found at position 7
Find last 'l': Found at position 3
Find first vowel: Found at position 1
Find last vowel: Found at position 4
Find first not of 'Hello, ': Found at position 7
Find last not of 'World!': Found at position 4
Number to string: 123
String to number: 456
Iterating over string: H e l l o ,   W o r l d !
Reverse iterating: ! d l r o W   , o l l e H
C-String: Hello, World!
After swap, str: Hello, C++!, other: Hello, World!
Regex search: Match found
After regex replace: XX, XX!
String from stringstream: Stream with number: 42

    </code>
</pre>
    `;

