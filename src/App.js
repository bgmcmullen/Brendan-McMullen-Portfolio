import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  preStyle = { whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0, paddingTop: 0, paddingBottom: 0, };

  blogsInfo = [{
    title: "Validating a Palindrome - A Deceptively Simple Task",
    author: "Brendan McMullen",
    date: "August 27, 2024",
    description: (<><p>Determining whether a string is a valid palindrome is one of the most common questions a beginner coder may be asked to demonstrate their understanding of programming. This is a deceptively simple question that can be solved with very few lines of code. However, there are multiple solutions to this problem, and understanding the differences between them is a great way to begin to understand how our code works and how we can maximize its efficiency.</p>
      <p>
        Here is a simple solution in JavaScript:
      </p>
      <pre style={this.preStyle}>function isValidPalindrome(string) {"{"}</pre>
      <pre style={this.preStyle}>     // Split the string into an array, reverse the array, and join the reversed array back into a string</pre>
      <pre style={this.preStyle}>     const reversedString = string.split('').reverse().join('');</pre>
      <pre style={this.preStyle}>     // Return true/false (are the original string and reversed string the same?)</pre>
      <pre style={this.preStyle}>     return string === reversedString;</pre>
      <pre style={this.preStyle}>{"}"}</pre>
      <p>
        This works and is a completely valid way to solve the problem. But can we find an even better solution? This solution has two disadvantages: it uses more memory than necessary and takes more time than it has to.
      </p>
      <p>
        Take a look at the line of code where we reversed the string. We are creating a new constant variable 'reversedString', which will have the same length as the original string. That might not seem like a big problem, but imagine if we are trying to test a string with one million characters. 'reversedString' would also be a string of one million characters, taking up a huge amount of additional memory. In technical terms, this function has O(n) space complexity, meaning the amount of additional memory it requires is proportional to the length of the string it is given.
      </p>
      <p>
        The other problem is time. Splitting the string into an array requires JavaScript to iterate over the entire string. Reversing the array requires another iteration, and then joining it back into a string requires a third iteration. That simple-looking line of code requires JavaScript to do a lot of work under the hood, and that takes time. Note that JavaScript does not have a 'string.reverse()' method that would allow us to do this in one step.
      </p>
      <p>
        Luckily, this problem can be solved more efficiently with a two-pointer approach. Here is what that looks like:
      </p>
      <pre style={this.preStyle}>function isValidPalindrome(string) {"{"}</pre>
      <pre style={this.preStyle}>     let left = 0;</pre>
      <pre style={this.preStyle}>     let right = string.length - 1;</pre>
      <pre style={this.preStyle}>     while (left {"<"} right) {"{"}</pre>
      <pre style={this.preStyle}>          if (string[left] !== string[right]) {"{"}</pre>
      <pre style={this.preStyle}>               return false;</pre>
      <pre style={this.preStyle}>          {"}"}</pre>
      <pre style={this.preStyle}>          left++;</pre>
      <pre style={this.preStyle}>          right--;</pre>
      <pre style={this.preStyle}>     {"}"}</pre>
      <pre style={this.preStyle}>     return true;</pre>
      <pre style={this.preStyle}>{"}"}</pre>
      <p>This function works by comparing the first and last characters of the string. Then it compares the second and second-to-last, and so on, until it reaches the middle of the string. If the characters are not the same, the string cannot be a palindrome, so it returns false. Otherwise, the pointers step inward. If the two pointers reach the middle of the string, the loop stops, and the function returns true. Note that in strings with an odd number of characters, the function will not check the character in the middle, since we know the middle character is equal to itself and we don’t care what it is.</p>
      <p>This function will not require any additional memory even if the string is extremely long, so it has O(1) space complexity. It still must iterate through the string and will take longer to validate a longer palindrome, giving it O(n) time complexity. However, it is still much more efficient than the previous function. It only has to iterate once—the while loop will continue a maximum number of times equivalent to only half the length of the string (rounding down)—and if the two pointers are not equivalent, the function stops right there. We don’t need to keep going through the string if we already know it is not a palindrome.</p>
      <p>In conclusion, the first solution works just fine for short strings, but for a very long string, the two-pointer technique is a better choice. Understanding the time and space complexity of a simple function like this is the first step toward optimizing solutions to much more complex problems.</p>
    </>)

  }];

  applyPickedLanguage = (pickedLanguage, oppositeLangIconId) => {
    this.swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`;
    this.loadResumeFromPath(resumePath);
  }

  swapCurrentlyActiveLanguage = (oppositeLangIconId) => {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute("filter", "brightness(40%)");
    document
      .getElementById(pickedLangIconId)
      .setAttribute("filter", "brightness(40%)");
  }

  componentDidMount = () => {
    this.loadSharedData();
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
  }

  loadResumeFromPath = (path) => {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  loadSharedData = () => {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data }, () => document.title = `${this.state.sharedData.basic_info.name}`);
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      },
    });
  }

  render() {
    return (
      <Router>
        <Header sharedData={this.state.sharedData.basic_info} />
        <Routes>
          <Route 
            exact path="/" 
            element={<Home
              resumeData={this.state.resumeData}
              sharedData={this.state.sharedData}
            />}>
          </Route>
          <Route 
            path="/about" 
            element={<About
              resumeBasicInfo={this.state.resumeData.basic_info}
              sharedBasicInfo={this.state.sharedData.basic_info}
            />}>
          </Route>
        </Routes>
        <Footer 
          sharedBasicInfo={this.state.sharedData.basic_info}
          applyPickedLanguage={this.applyPickedLanguage} 
        />  
      </Router>
    );
  }
}

export default App;
