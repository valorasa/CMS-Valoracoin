import { useState, useEffect } from "react";
import axiosInstance from "../../setup/axios";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../../shared/components/NavigationBar";
import { Alert, Form, Button, Row } from "react-bootstrap";

const ImpactForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState();
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [questionPhrase, setQuestionPhrase] =useState();

  async function findImpact() {
    if (!!params.id) {
      setLoading(true);
      const response = await axiosInstance.get(`/impacts/${params.id}`);
      const impact = response.data;
      setName(impact.name);
      setImageUrl(impact.imageUrl);
      setQuestionPhrase(impact.questionPhrase);
      setLoading(false);
    }
  }

  useEffect(() => {
    findImpact();
  });

  async function saveImpact() {
    setLoading(true);
    const requestBody = {
      name,
    };

    try {
      !!params.id
        ? await axiosInstance.put(`impacts/${params.id}`, requestBody)
        : await axiosInstance.post("typewaste", requestBody);
      setAlert({
        success: true,
        message: "Salvo com sucesso",
      });
      navigate("../", { replace: true });
    } catch (e) {
      setAlert({
        success: false,
        message: "Erro de validação dos dados, confirme as entradas",
      });
    }
    setLoading(false);
  }
  return (
    <>
      <NavigationBar />
      <main className="container">
        {!!alert ? (
          <Alert
            variant={alert.success ? "success" : "danger"}
            className="my-3"
            dismissible
            onClose={() => setAlert()}
          >
            {alert.message}
          </Alert>
        ) : null}
        <div className="d-flex justify-content-between my-3">
          <h1>
            {" "}
            {!!params.id ? "Editar impacto" : "Novo Impacto"}
          </h1>
        </div>
        {loading ? (
          <div className="spinner-border text-primary mx-auto" role="status" />
        ) : (
          <Form>
            <Form.Group className="mb-3 ">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                placeholder="Nome"
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>URL da imagem</Form.Label>
              <Form.Control
                placeholder="URL da imagem"
                defaultValue={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Pergunta</Form.Label>
              <Form.Control
                placeholder="Pergunta"
                defaultValue={questionPhrase}
                onChange={(event) => setQuestionPhrase(event.target.value)}
                required
              />
            </Form.Group>
            <Row>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  saveImpact();
                }}
              >
                Salvar
              </Button>
            </Row>
          </Form>
        )}
      </main>
    </>
  );
};

export default ImpactForm;
