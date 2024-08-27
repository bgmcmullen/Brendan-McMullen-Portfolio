import React, { Component } from "react";

class Blog extends Component {
  render() {
    const { blogsInfo } = this.props;

    if (!blogsInfo) {
      return <div>Loading...</div>;
    }

    return (
      blogsInfo.map(blog => {
        return (
          <section id="blog">
            <div className="col-md-12">
              <h1 style={{ color: "black" }}>
                <span>{blog.title}</span>
              </h1>
              <div className="row center mx-auto mb-5">
                <div className="col-md-8 center">
                  <div className="col-md-10">
                    <div className="card">
                      <div className="card-header">
                        <span
                          className="iconify"
                          data-icon="emojione:red-circle"
                          data-inline="false"
                        ></span>{" "}
                        &nbsp;{" "}
                        <span
                          className="iconify"
                          data-icon="twemoji:yellow-circle"
                          data-inline="false"
                        ></span>{" "}
                        &nbsp;{" "}
                        <span
                          className="iconify"
                          data-icon="twemoji:green-circle"
                          data-inline="false"
                        ></span>
                      </div>
                      <div
                        className="card-body font-trebuchet text-justify ml-3 mr-3"
                        style={{
                          height: "auto",
                          fontSize: "132%",
                          lineHeight: "200%",
                        }}
                      >
                        <h2>{blog.title}</h2>
                        <p>
                          <strong>Author:</strong> {blog.author}
                        </p>
                        <p>
                          <strong>Date:</strong> {blog.date}
                        </p>
                        <p>{blog.description.map((line, i) => {
                          return (<p key={i}>{line}</p>)
                        }
                        )}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }
      )
    );
  }
}

export default Blog;
