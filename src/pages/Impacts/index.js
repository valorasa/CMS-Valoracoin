import axiosInstance from "../../setup/axios";
import { useState, useEffect } from "react";
import { Button, Table, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash, FiPlus } from "react-icons/fi";
import NavigationBar from "../../shared/components/NavigationBar";

const ImpactPage = () => {
  const [typeWastes, setTypeWastes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTypeWastes() {
    setLoading(true);
    const response = await axiosInstance.get("/impacts");
    setTypeWastes(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getTypeWastes();
  }, []);

  const handleDelete = async (index, id) => {
    setTypeWastes(typeWastes.filter((v, i) => i !== index));
    await axiosInstance.delete(`/typewaste/${id}`);
  };
  return (
    <>
      <NavigationBar />
      <main className="container">
        <div className="d-flex justify-content-between my-3">
          <h1> Impactos </h1>
          <Link to="new">
            <Button>
              Adicionar <FiPlus />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="spinner-border text-primary mx-auto" role="status" />
        ) : typeWastes.length === 0 ? (
          <p>Novo impacto</p>
        ) : (
          <Table striped bordered hover className="mb-3">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {typeWastes.map((e, index) => (
                <tr key={index}>
                  <td>{e.name}</td>

                  <td>
                    <ButtonGroup className="d-flex justify-content-evenly">
                      <Link to={`edit/${e.id}`}>
                        <Button className="mx-1">
                          <FiEdit2 />
                        </Button>
                      </Link>
                      <Link to="#">
                        <Button
                          className="mx-1"
                          onClick={(event) => handleDelete(index, e.id)}
                        >
                          <FiTrash />
                        </Button>
                      </Link>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </main>
    </>
  );
};

export default ImpactPage;
