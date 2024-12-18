import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/feedback.css';

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert('Veuillez donner une note avant de soumettre.');
      return;
    }

    console.log({ rating, comment });

    setSubmitted(true);
    setRating(0);
    setComment('');
    setIsOpen(false);
  };

  return (
    <div>
      {/* Bouton pour ouvrir le popup */}
      <div className="feedback-btn" onClick={() => setIsOpen(true)}>
        Commentaires
      </div>

      {/* Popup de feedback */}
      {isOpen && (
        <div className="feedback-modal">
          <div className="feedback-modal-content">
            {/* Icône de fermeture */}
            <button
              type="button"
              className="feedback-modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h5 className="modal-title mb-3">Donnez votre avis</h5>
            {submitted && <p className="text-success">Merci pour votre feedback !</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Note :</label>
                <input
                  type="range"
                  className="form-range"
                  id="rating"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
                <div className="feedback-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`badge ${rating >= star ? 'bg-warning' : 'bg-secondary'}`}>
                      {star}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Commentaire :</label>
                <textarea
                  id="comment"
                  className="form-control feedback-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Écrivez votre commentaire ici..."
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-2">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;