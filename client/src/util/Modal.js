import "../styles/modal.css";
import { useEffect } from "react";

function Modal({ handleClose, show, title, subtitle, onSubmit, children }) {
  useEffect(() => {
    const closeOnEscapeKeyDown = (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        handleClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      id={"myModal" + subtitle.split(" ").join("-")}
      className={`modal ${show ? " display-block" : "display-none"}`}
      // tabIndex="-1"
      onClick={handleClose}
    >
      <div className="modal-dialog">
        <div
          className="modal-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="div-btn-close">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-header display-block">
            <h5 className="modal-title">{title}</h5>
            <div className="modal-title regular-font font-weight-bold">
              {subtitle}
            </div>
          </div>
          <div className="modal-body">
            <div
              className="content"
              id={"content" + subtitle.split(" ").join("-")}
            >
              {children}
            </div>
          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col-50">
                <button
                  type="button"
                  className="btn btn-secondary modal-button"
                  data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
              <div className="col-50">
                <button
                  id="add-to-cart"
                  type="button"
                  className="btn btn-primary modal-button"
                  onClick={onSubmit}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
