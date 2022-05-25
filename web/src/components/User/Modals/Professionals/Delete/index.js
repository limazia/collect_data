import React, { useState } from "react";
import { toast } from "react-toastify";

import api from "~/services/api";

import { Spinner } from "~/components";

function DeleteProfessionals({ data }) {
  const id = data[0];
  const name = data[1];
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (id) {
      try {
        setLoading(true);

        const { data } = await api.delete(`/api/professionals/delete/${id}`);
        const { error, message } = data;

        if (message) {
          toast.success(message);

          window.$("#deleteProfessionals").modal("hide");

          const event = new CustomEvent("refresh-professionals");
          window.dispatchEvent(event);
        } else {
          toast.error(error);
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Faltando {id}");
    }
  }

  return (
    <div className="modal fade" id="deleteProfessionals" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content modal-settings">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12 text-center">
                <h5 className="edit-option">Excluir profissional</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="text-center">
                  <p>
                    Tem certeza de que deseja excluir "<b>{name}</b>"?
                  </p>
                  <p>Você não pode desfazer esta ação.</p>
                </div>
                <div className="alert alert-danger alert-border" role="alert">
                  <b>Aviso</b>
                  <p className="mt-2 mb-0">
                    Ao excluir o cliente, você excluirá <b>8 arquivos</b>{" "}
                    relacionados ao cliente
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-cancel btn-block"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-delete btn-block"
                  onClick={() => handleSubmit(id)}
                >
                  {loading ? (
                    <Spinner type="grow" />
                  ) : (
                    <i className="fas fa-trash-alt"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteProfessionals;