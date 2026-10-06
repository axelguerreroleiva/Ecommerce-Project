import { useState } from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const formatPrice = (n) =>
  `$ ${new Intl.NumberFormat('es-AR').format(n)}`;

export default function Card({ product, canWish, isWished, onToggleWish }) {
  const { id, name, price, category, image } = product;
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = image && !imgFailed;

  return (
    <li className="card">
      {showImg ? (
        <img
          className="card__img"
          src={image}
          alt={name}
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="card__img card__img--empty" role="img" aria-label={name}>
          IMG
        </div>
      )}

      <div className="card__body">
        <p className="card__cat">{category}</p>
        <h3 className="card__name">{name}</h3>
        <p className="card__price">{formatPrice(price)}</p>

        <div className="card__actions">
          <Link className="btn" to={`/product/${id}`}>
            Ver detalle
          </Link>

          {canWish && (
            <button
              type="button"
              className="fav"
              aria-pressed={isWished}
              aria-label={isWished ? `Quitar ${name} de deseos` : `Agregar ${name} a deseos`}
              onClick={() => onToggleWish(id)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M12 21s-7-4.6-9.3-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.3 6c-2.3 4.4-9.3 9-9.3 9z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </li>
  );
}