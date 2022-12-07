import axios from "axios";
import React from "react";
import { useState } from "react";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const dateFormater = date => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = {
      author: article.author,
      // est-ce que quelqu'un a taper ds editContent, si jamais oui on passe editContent, si non, article.content
      content: editContent ? editContent : article.content,
      date: article.date,
    };
    axios
      .put("http://localhost:3004/articles/" + article.id, data)
      .then(() => setIsEditing(false));
  };

  return (
    <div className="article">
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>posté le {dateFormater(article.date)}</em>
      </div>
      {isEditing ? (
        <textarea
          defaultValue={article.content}
          onChange={e => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p>{editContent ? editContent : article.content}</p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button onClick={() => handleEdit()}> Valider </button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button>Supprimer</button>
      </div>
    </div>
  );
};

export default Article;
