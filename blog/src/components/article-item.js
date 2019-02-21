import React from 'react';

export default function ArticleItem(props) {
  const { left, content } = props;
  return (
    <article className="container v-space">
      <div className="columns">
        <div className="column is-half">
          <div className="media">
            <figure className="media-left">{left}</figure>
            <div className="media-content">
              <div className="content">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
