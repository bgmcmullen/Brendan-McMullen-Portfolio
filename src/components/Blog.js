import React, { Component } from "react";

class Blog extends Component {
  render() {
    const { blogsInfo } = this.props;

    if (!blogsInfo) {
      return <div>Loading...</div>;
    }

    return (<>
      <h3 style={{margin: "10px", marginLeft: "20px", marginRight: "20px"}}>Through this blog, I’m sharing the coding problems I've tackled and the experiences I've had while learning to program. I hope to offer valuable tips and encouragement to those who are also navigating the path to becoming a developer. Please note that while I aim to provide helpful insights, this blog is not a substitute for official resources or formal education.</h3>

      {blogsInfo.map(blog => {
        return (
          <section id="blog">
            <div className="col-md-12">
              <div className="row center mx-auto mb-5">
                <div className="col-md-8 center" style={{ width: "100%" }}>
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
                        <p>{blog.description}</p>
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
      }
    </>

    );
  }
}

export default Blog;
