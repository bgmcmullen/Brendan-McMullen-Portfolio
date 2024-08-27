import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import Blog from "./components/Blog";

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
    };
  }

  blogsInfo = [{
    title: "Validating a Palindrome - A deceptively simple task",
    author: "Brendan McMullen",
    date: "August 27, 2024",
    description: ["Determine whether a string is a valid palindrome is what one common question a beginner coder may be asked to demonstrate to show an a basic understanding of coding and logical reason. This is a deceptively simple question that can be solved with  very few lines of code.",
      "However, there are multiple solutions to this problem and understanding the differences between then is a great to begin to understand how our code works and how me can maximize its efficiency.",
      "Here is a simple solution in JavaScript", "-----------------------------------------------",
      "function isValidPalindrome(string)  {",
      "// split the string into an array - reverse the array – join reverse array back into a string",
      "   	const reversedString =  string.split(‘’).reverse().join(‘’);",
    	"   	return string === reversedString;",
      "-----------------------------------------------",
      ]
      
  },
  {
    title: "My Second Blog Post",
    author: "Brendan McMullen",
    date: "August 27, 2024",
    description: ["Determine whether a string is a valid palindrome is what one common question a beginner coder may be asked to demonstrate to show an a basic understanding of coding and logical reason. This is a deceptively simple question that can be solved with  very few lines of code.", "However there are multiple solutions to this problem and understanding the differences between then is a great to begin to understand how our code works and how me can maximize its efficient. Show a growth mindset While it is true"]
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
          <Route 
            path="/coding-blog" 
            element={<Blog
              blogsInfo={this.blogsInfo}
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
