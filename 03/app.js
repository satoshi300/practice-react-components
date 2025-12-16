import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class Article extends React.Component {
    state = {
        comments: [],
        content: '',
    }
    contentChange = e => {
        this.setState({
            content: e.target.value,
        })
     }

    submitHandler = e => {
        e.preventDefault();
        const { content } = this.state;
        
        this.addContent(`${content}`);
        this.setState({
            content: '',
        })
    }
    addContent(content) {
        this.setState({
            comments: [this.state.comments, content],
        })
    }
    render() {
        const { title, body } = this.props;
        const { content } = this.state;

        return (
            <article>
                <h1>{title}</h1>
                <p>{body}</p>
                <section>
                    <form onSubmit={this.submitHandler}>
                        <div>
                            <label>
                                <textarea
                                    style={{ "minWidth": "300px", "minHeight": "120px" }}
                                    name="content" value={content} onChange={this.contentChange}
                                />
                            </label>
                        </div>
                        <div><input type="submit" value="dodaj komentarz" /></div>
                    </form>
                    <ul>
                        <li>{this.state.comments}</li>
                        {/* tutaj komentarze jako <li/>, ps. tak wygląda komentarz do kodu w JSX */}
                    </ul>
                </section>
            </article >
        )
    }
}

root.render(
    <Article
        title="Programowanie jest super!"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo ipsum, eleifend vel quam eget, lobortis posuere arcu. In vitae eros in nisi sodales aliquam..."
    />
);
